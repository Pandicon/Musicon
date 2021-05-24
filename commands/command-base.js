const { prefix: globalPrefix } = require('../config.json');
const guildPrefixes = {};
const Discord = require('discord.js');
const basic = require("../util/basic.js");
const { missingPermsColorEmbed, cooldownColorEmbed } = require("@conf/colors.json");
const cooldowns = new Set();

const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ];

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`);
    }
  }
}

module.exports = (client, commandOptions, distube) => {
  let {
    commands,
    expectedArgs = '',
    permissionError = 'You do not have permission to run this command.',
    minArgs = 0,
    maxArgs = null,
    cooldown = null,
    isGlobalCooldown = true,
    permissions = [],
    requiredRoles = [],
    callback,
    botPermissions = [],
    botPermissionsError = "I don't have enough permissions to execute this command. Please grant me the administrator permissions if you want to avoid this issue in the future.",
  } = commandOptions;

  // Ensure the command and aliases are in an array
  if (typeof commands === 'string') {
    commands = [commands];
  }

  console.log(`Registering command "${commands[0]}"`);

  // Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }

  if (botPermissions.length) {
    if (typeof botPermissions === 'string') {
      botPermissions = [botPermissions];
    }

    validatePermissions(botPermissions);
  }

  // Listen for messages
  client.on('message', async(message) => {
    if(message.channel.type == "dm") return;
    if(message.author.bot) return;
    const { member, content, guild } = message;
    const prefix = guildPrefixes[guild.id] || globalPrefix;

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`;

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        // A command has been ran

        // Ensure the bot can send messages
        if (!message.guild.me.hasPermission("SEND_MESSAGES")) {
          const dm = await message.author.createDM();
          try {
            dm.send(`I wasn't able to execute your command in the \`${message.guild.name}\` server because I am missing the send messages permissions.`);
          } catch(error) {
            console.error(error);
          }
          return;
        }

        if(cooldown) {
          if(isGlobalCooldown) {
            if(cooldowns.has(`${message.author.id}-${commands[0]}`)) {
              const embed = new Discord.MessageEmbed()
                .setColor(cooldownColorEmbed)
                .setAuthor(
                  message.member.nickname || message.author.username,
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setDescription(`Woah, slow it down, this command has a ${await basic.timeToText(cooldown)} cooldown.`)
              return message.channel.send(embed);
            }
          } else {
            if(cooldowns.has(`${message.author.id}-${message.guild.id}-${commands[0]}`)) {
              const embed = new Discord.MessageEmbed()
                .setColor(cooldownColorEmbed)
                .setAuthor(
                  message.member.nickname || message.author.username,
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setDescription(`Woah, slow it down, this command has a ${await basic.timeToText(cooldown)} cooldown.`)
              return message.channel.send(embed);
            }
          }
        }

        // Ensure the user has the required permissions
        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            const embed = new Discord.MessageEmbed()
              .setColor(missingPermsColorEmbed)
              .setAuthor(
                message.member.nickname || message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setDescription(permissionError)
            return message.channel.send(embed);
          }
        }

        for (const permission of botPermissions) {
          if (!message.guild.me.hasPermission(permission)) {
            const embed = new Discord.MessageEmbed()
              .setColor(missingPermsColorEmbed)
              .setAuthor(
                message.member.nickname || message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setDescription(botPermissionsError)
            return message.channel.send(embed);
          }
        }

        // Ensure the user has the required roles
        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          )

          if (!role || !member.roles.cache.has(role.id)) {
            const embed = new Discord.MessageEmbed()
              .setColor(missingPermsColorEmbed)
              .setAuthor(
                message.member.nickname || message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setDescription(`You must have the "${requiredRole}" role to use this command.`)
            return message.channel.send(embed);
          }
        }

        // Split on any number of spaces
        const arguments = content.split(/[ ]+/);

        // Remove the command which is the first index
        arguments.shift();

        // Ensure we have the correct number of arguments
        if (
          arguments.length < minArgs ||
          (maxArgs !== null && arguments.length > maxArgs)
        ) {
          let argsText = expectedArgs;
          let expectedArgsTemp = expectedArgs;
          if(typeof expectedArgsTemp == 'string') expectedArgsTemp = [expectedArgsTemp];
          expectedArgsTemp = expectedArgsTemp[0];
          let freq = basic.countFreq("<alias>", expectedArgsTemp);
          if(freq < 2) argsText = `\`${prefix}${alias} ${expectedArgs}\``
          else {
            argsText = "one of the following options:\n\`\`\`";
            argsText += expectedArgsTemp.replace(/<alias>/g, `${prefix}${alias}`);
            argsText += `\`\`\``;
          }
          const embed = new Discord.MessageEmbed()
            .setColor(missingPermsColorEmbed)
            .setAuthor(
              message.member.nickname || message.author.username,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(`Incorrect syntax! Use ${argsText}`)
          return message.channel.send(embed);
        }

        // Handle the custom command code
        callback(message, arguments, arguments.join(' '), client, distube);
        if(cooldown) {
          let key = `${message.author.id}-${commands[0]}`;
          if(isGlobalCooldown) {
            cooldowns.add(key);
          } else {
            key = `${message.author.id}-${message.guild.id}-${commands[0]}`;
            cooldowns.add(key);
          }
          setTimeout(() => {
            cooldowns.delete(key);
          }, cooldown);
        }

        return;
      }
    }
  })
}

module.exports.updateCache = (guildId, newPrefix) => {
  guildPrefixes[guildId] = newPrefix;
}

module.exports.loadPrefixes = async (client) => {
  for (const guild of client.guilds.cache) {
    const guildID = guild[1].id;

    const result = null; //await commandPrefixSchema.findOne({ _id: guildID});
    if(result) {
      guildPrefixes[guildID] = result.prefix;
    } else {
      guildPrefixes[guildID] = globalPrefix;
    }
  }

  console.log(guildPrefixes);
}

module.exports.getGuildPrefix = (guildID) => {
  const prefix = guildPrefixes[guildID] || globalPrefix;
  return prefix;
}
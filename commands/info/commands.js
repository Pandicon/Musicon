const loadCommands = require('@commands/load-commands.js');
const commandBase = require('@commands/command-base');
const Discord = require("discord.js");
const {
  success
} = require("@conf/colors.json")
const {
  creatorLink,
  embedFooterDividing
} = require("@root/info.json")

module.exports = {
  commands: ['commands', 'commandslist', 'c', 'help'],
  category: 'info',
  expectedArgs: [],
  permissionError: "",
  minArgs: 0,
  maxArgs: null,
  cooldown: null, //null or time in milliseconds
  isGlobalCooldown: true,
  permissions: [],
  requiredRoles: [],
  botPermissions: [],
  botPermissionError: "",
  description: "Shows the list of commands in the bot",
  callback: async (message, arguments, text, client) => {
    var totalCommands = 0;
    const {
      guild,
      member
    } = message;
    const guildID = guild.id;
    const prefix = await commandBase.getGuildPrefix(guildID);
    const commands = loadCommands();

    var infoCommands = '';
    var musicCommands = '';
    var missingPermsExplanation = '';

    for (var i = 0; i < commands.length; i++) {
      totalCommands++;
      const command = commands[i];
      var aliases = command.commands;
      if (typeof (aliases) === "string") {
        aliases = [aliases];
      }
      var text = `\`${prefix}${aliases[0]}\``;
      let permissions = command.permissions;
      const category = command.category;
      var isMissingAnyPerms = false;

      if (permissions) {
        var hasPermissions = true;
        var hasPerms = true;
        if (typeof (permissions) === "string") {
          permissions = [permissions];
        }

        for (const permission of permissions) {
          if (!member.permissions.has(permission)) {
            hasPerms = false;
            break;
          }
        }
        if (!hasPerms) {
          text += ` (-)`;
          hasPermissions = hasPerms;
          isMissingAnyPerms = true;
        }
        if (isMissingAnyPerms) {
          missingPermsExplanation = ` ${embedFooterDividing} You don't have enough permissions in this server to use the commands with - next to them`;
        }
        if (i < commands.length - 1) {
          var a = i + 1;
          if (command.category == commands[a].category) {
            text += ', ';
          }
        }
        if (category == 'info') {
          infoCommands += text;
        } else if (category == 'music') {
          musicCommands += text;
        }

        if (!hasPermissions) {
          continue;
        }
      }
    }

    const commandsListEmbed = new Discord.MessageEmbed()
      .setColor(success)
      .setAuthor(
        message.member.nickname || message.author.username,
        message.author.displayAvatarURL({
          dynamic: true
        })
      )
      .setTitle('Commands list for this bot')
      .addFields({
        name: 'Info:',
        value: infoCommands
      }, {
        name: 'Music:',
        value: musicCommands
      })
      .setFooter(`Total of ${totalCommands} command${totalCommands == 1 ? "" : "s"} ${embedFooterDividing} Bot made by ${creatorLink}${missingPermsExplanation}`)

    message.channel.send(commandsListEmbed);
  }
}
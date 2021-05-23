const {
    success,
    warning,
    error
} = require("@conf/colors.json")
const Discord = require('discord.js');

module.exports = {
    commands: ['autoplay', "ap"],
    category: 'music',
    expectedArgs: ["<alias> <toggle>"],
    permissionError: "you can not interact with songs if you don't have permissions to speak in a voice channel.",
    minArgs: 0,
    maxArgs: null,
    cooldown: null, //null or time in milliseconds
    isGlobalCooldown: true,
    permissions: ["SPEAK"],
    requiredRoles: [],
    botPermissions: [],
    botPermissionError: "",
    description: "Toggles the autoplay feature (playing related videos once the queue ends)",
    exampleUse: "",
    callback: (message, args, text, client, distube) => {
        if (!message.member.voice.channel) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setAuthor(
                        message.member.nickname || message.author.username,
                        message.author.displayAvatarURL({
                            dynamic: true
                        })
                    )
                    .setColor(error)
                    .setDescription(`You must be in a voice channel to toggle autoplay.`)
                    .setFooter(client.user.tag, client.user.displayAvatarURL({
                        dynamic: true
                    }))
            )
        }
        if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setAuthor(
                        message.member.nickname || message.author.username,
                        message.author.displayAvatarURL({
                            dynamic: true
                        })
                    )
                    .setColor(error)
                    .setDescription(`You must be in the same voice channel as me to toggle the autoplay.`)
                    .setFooter(client.user.tag, client.user.displayAvatarURL({
                        dynamic: true
                    }))
            )
        }
        if(!distube.isPlaying(message)) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setAuthor(
                        message.member.nickname || message.author.username,
                        message.author.displayAvatarURL({
                            dynamic: true
                        })
                    )
                    .setColor(error)
                    .setDescription(`Can't toggle autoplay if I'm not playing any songs.`)
                    .setFooter(client.user.tag, client.user.displayAvatarURL({
                        dynamic: true
                    }))
            )
        }
        let mode = distube.toggleAutoplay(message);
        if(args[0]) {
            let toggle = args[0].toLowerCase();
            if(/(off)|(disable)/i.test(toggle) && mode) {
                mode = distube.toggleAutoplay(message);
            } else if(/(on)|(enable)/i.test(toggle) && !mode) {
                mode = distube.toggleAutoplay(message);
            }
        }

        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }
}
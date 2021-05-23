const Discord = require('discord.js');
const skip = require("@commands/music/skip.js")
const {
    error: errorColor
} = require("@conf/colors.json")

module.exports = distube => {
    distube.on("error", (message, e) => {
        console.error(e)
        message.channel.send(
            new Discord.MessageEmbed()
                .setAuthor(
                    message.member.nickname || message.author.username,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setColor(errorColor)
                .setTitle("An error encountered")
                .setDescription(e)
                .setFooter(message.guild.me.user.tag, message.guild.me.user.displayAvatarURL({
                    dynamic: true
                }))
        );
    });
}
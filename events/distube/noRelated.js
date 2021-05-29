const Discord = require('discord.js');
const skip = require("@commands/music/skip.js")
const {
    warning
} = require("@conf/colors.json")

module.exports = distube => {
    distube.on("noRelated", message => {
        const embed = new Discord.MessageEmbed()
        .setColor(warning)
        .setAuthor(
            message.guild.me.user.tag,
            message.guild.me.user.displayAvatarURL({
                dynamic: true
            })
        )
        .setDescription("Can't find related videos to play. Stop playing music.")
        message.channel.send(embed);
    })
}
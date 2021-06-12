const Discord = require('discord.js');
const {
    warning
} = require("@conf/colors.json")

module.exports = distube => {
    distube.on("searchCancel", (message) => {
        const embed = new Discord.MessageEmbed()
            .setColor(warning)
            .setAuthor(
                message.guild.me.user.tag,
                message.guild.me.user.displayAvatarURL({
                    dynamic: true
                })
            )
            .setDescription("Searching canceled.")
        message.channel.send(embed);
    })
}
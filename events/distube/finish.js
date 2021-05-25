const Discord = require('discord.js');
const {
    warning
} = require("@conf/colors.json")

module.exports = distube => {
    distube.on("finish", async message => {
        const embed = new Discord.MessageEmbed()
        .setColor(warning)
        .setAuthor(
            message.guild.me.user.tag,
            message.guild.me.user.displayAvatarURL({
                dynamic: true
            })
        )
        .setDescription("No more songs in queue.")
        message.channel.send(embed);
    })
}
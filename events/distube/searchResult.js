const Discord = require('discord.js');
const skip = require("@commands/music/skip.js")
const {
    addToQueue
} = require("@conf/colors.json")

// DisTubeOptions.searchSongs = true
module.exports = distube => {
    distube.on("searchResult", (message, result) => {
        let i = 0;
        const embed = new Discord.MessageEmbed()
            .setColor(addToQueue)
            .setAuthor(
                message.guild.me.user.tag,
                message.guild.me.user.displayAvatarURL({
                    dynamic: true
                })
            )
            .setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
        message.channel.send(embed);
    })
}
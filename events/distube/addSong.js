const Discord = require('discord.js');
const skip = require("@commands/music/skip.js")
const {
    playSong: playSongColor
} = require("@conf/colors.json")

module.exports = distube => {
    distube.on("addSong", async(message, queue, song) => {
        const embed = new Discord.MessageEmbed()
        .setColor(playSongColor)
        .setAuthor(
            (await message.guild.members.fetch(song.user.id)).nickname || song.user.username,
            song.user.displayAvatarURL({
                dynamic: true
            })
        )
        .setThumbnail(song.thumbnail.url)
        .setDescription(`Added [${song.name}](${song.url}) to the queue.`)
        .addFields({
            name: "Requested by",
            value: `${song.user}`,
            inline: true
        }, {
            name: "Duration",
            value: `${song.formattedDuration}`,
            inline: true
        })
        .setFooter(`Published by ${song.info.videoDetails.ownerChannelName}, currently has ${parseInt(song.info.videoDetails.viewCount).toLocaleString()} view${song.info.videoDetails.viewCount == 1 ? "" : "s"}`)
        message.channel.send(embed);
    })
    /*message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by \`${song.user.tag}\``
    )*/
}
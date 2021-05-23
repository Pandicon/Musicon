const Discord = require('discord.js');
const skip = require("@commands/music/skip.js")
const {
    playSong: playSongColor
} = require("@conf/colors.json")

module.exports = distube => {
    distube.on("playSong", async (message, queue, song) => {
        const embed = new Discord.MessageEmbed()
            .setColor(playSongColor)
            .setAuthor(
                (await message.guild.members.fetch(song.user.id)).nickname || song.user.username,
                song.user.displayAvatarURL({
                    dynamic: true
                })
            )
            .setThumbnail(song.thumbnail)
            .setTitle(":notes: Playing :notes:")
            .setDescription(`[${song.name}](${song.url})`)
            .addFields({
                name: "Requested by",
                value: `${song.user}`,
                inline: true
            }, {
                name: "Duration",
                value: `${song.formattedDuration}`,
                inline: true
            }, {
                name: "Queue",
                value: `${queue.songs.length} song${queue.songs.length == 1 ? "" : "s"} - ${queue.formattedDuration}`,
                inline: true
            }, {
                name: "Volume",
                value: `${queue.volume}%`,
                inline: true
            }, {
                name: "Loop",
                value: `${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}`,
                inline: true
            }, {
                name: "Autoplay",
                value: `${queue.autoplay ? "On" : "Off"}`,
                inline: true
            }, {
                name: "Bitrate",
                value: `${message.guild.me.voice.channel.bitrate/1000}kbps`,
                inline: true
            })
            .setFooter(`Published by ${song.info.videoDetails.ownerChannelName}, currently has ${parseInt(song.info.videoDetails.viewCount).toLocaleString()} view${song.info.videoDetails.viewCount == 1 ? "" : "s"}`)
        message.channel.send(embed);
        skip.resetVotes(message.guild.id);
    })
}
const Discord = require('discord.js');
const skip = require("@commands/music/skip.js")
const {
    playSong: playSongColor
} = require("@conf/colors.json")

module.exports = distube => {
    distube.on("playList", async(message, queue, playlist, song) => {
        const playlistEmbed = new Discord.MessageEmbed()
            .setColor(playSongColor)
            .setAuthor(
                (await message.guild.members.fetch(song.user.id)).nickname || song.user.username,
                song.user.displayAvatarURL({
                    dynamic: true
                })
            )
            .setThumbnail(playlist.thumbnail.url)
            .setTitle(":notes: Playing :notes:")
            .setDescription(`[${playlist.name}](${playlist.url}) playlist`)
            .addFields(
                {
                    name: "Requested by",
                    value: `${playlist.user}`,
                    inline: true
                }, {
                    name: "Songs",
                    value: `${playlist.songs.length} song${playlist.songs.length == 1 ? "" : "s"}`,
                    inline: true
                }, {
                    name: "Length",
                    value: playlist.formattedDuration,
                    inline: true
                }
            )
            const songEmbed = new Discord.MessageEmbed()
            .setColor(playSongColor)
            .setAuthor(
                (await message.guild.members.fetch(song.user.id)).nickname || song.user.username,
                song.user.displayAvatarURL({
                    dynamic: true
                })
            )
            .setThumbnail(playlist.thumbnail.url)
            .setTitle(":notes: Playing :notes:")
            .setDescription(`[${song.name}](${song.url}) (from the [${playlist.name}](${playlist.url}) playlist)`)
            .addFields(
                {
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
                }
            )
            .setFooter(`Published by ${song.info.videoDetails.ownerChannelName}, currently has ${parseInt(song.info.videoDetails.viewCount).toLocaleString()} view${song.info.videoDetails.viewCount == 1 ? "" : "s"}`)
        message.channel.send(playlistEmbed);
        skip.resetVotes(message.guild.id);
        message.channel.send(songEmbed);
    })
}
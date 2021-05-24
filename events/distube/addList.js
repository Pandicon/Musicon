const Discord = require('discord.js');
const skip = require("@commands/music/skip.js")
const {
    playSong: playSongColor
} = require("@conf/colors.json")

module.exports = distube => {
    distube.on("addList", async(message, queue, playlist) => {
        const embed = new Discord.MessageEmbed()
        .setColor(playSongColor)
        .setAuthor(
            (await message.guild.members.fetch(playlist.user.id)).nickname || playlist.user.username,
            playlist.user.displayAvatarURL({
                dynamic: true
            })
        )
        .setThumbnail(playlist.thumbnail.url)
        .setDescription(`Added the [${playlist.name}](${playlist.url}) playlist to queue.`)
        .addFields({
            name: "Requested by",
            value: `${playlist.user}`,
            inline: true
        }, {
            name: "Duration",
            value: `${playlist.formattedDuration}`,
            inline: true
        }, {
            name: "Length",
            value: `${playlist.songs.length} song${playlist.songs.length == 1 ? "" : "s"}`,
            inline: true
        })
        message.channel.send(embed);
    })
}
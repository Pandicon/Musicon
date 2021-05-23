const Discord = require('discord.js');
const skip = require("@commands/music/skip.js")
const {
    playSong: playSongColor
} = require("@conf/colors.json")

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

module.exports = distube => {
    distube.on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by \`${song.user.tag}\``
    ))
}
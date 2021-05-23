const Discord = require('discord.js');
const skip = require("@commands/music/skip.js")
const {
    playSong: playSongColor
} = require("@conf/colors.json")

module.exports = distube => {
    distube.on("noRelated", message => message.channel.send(
        "Can't find related video to play. Stop playing music."
    ))
}
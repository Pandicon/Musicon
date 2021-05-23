const Discord = require('discord.js');
const skip = require("@commands/music/skip.js")
const {
    playSong: playSongColor
} = require("@conf/colors.json")

module.exports = distube => {
    distube.on("finish", message => message.channel.send(
        "No more songs in queue"
    ))
}
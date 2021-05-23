const Discord = require('discord.js');
const skip = require("@commands/music/skip.js")
const {
    playSong: playSongColor
} = require("@conf/colors.json")

module.exports = distube => {
    distube.on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });
}
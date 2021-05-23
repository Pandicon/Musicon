module.exports = {
    commands: ['autoplay', "ap"],
    category: 'music',
    expectedArgs: ["<alias>"],
    permissionError: "you can not interact with songs if you don't have permissions to speak in a voice channel.",
    minArgs: 1,
    maxArgs: null,
    cooldown: null, //null or time in milliseconds
    isGlobalCooldown: true,
    permissions: ["SPEAK"],
    requiredRoles: [],
    botPermissions: [],
    botPermissionError: [],
    description: "Toggles the autoplay feature (playing related videos once the queue ends)",
    exampleUse: "",
    callback: (message, args, text, client, distube) => {
        if (!message.member.voice.channel) return message.reply(`you must be in a voice channel to toggle the autoplay.`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`you must be in the same voice channel as me to toggle the autoplay.`);
        let mode = distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }
}
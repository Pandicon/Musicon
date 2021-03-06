module.exports = {
    commands: ["resume", "r"],
    category: "music",
    expectedArgs: ["<alias>"],
    permissionError: "you can not interact with songs if you don't have permissions to speak in a voice channel.",
    minArgs: 0,
    maxArgs: null,
    cooldown: null, //null or time in milliseconds
    isGlobalCooldown: true,
    permissions: ["SPEAK"],
    requiredRoles: [],
    botPermissions: [],
    botPermissionError: "",
    description: "Resumes the current song",
    exampleUse: "",
    callback: (message, args, text, client, distube) => {
        if (!message.member.voice.channel) return message.reply(`you must be in a voice channel to interact with songs.`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`you must be in the same voice channel as me to interact with songs.`);
        if (!distube.isPaused(message)) return message.reply("the song isn't paused.");
        distube.resume(message);
        return message.reply("successfully resumed the song.");
    }
}
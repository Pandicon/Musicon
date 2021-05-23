module.exports = {
    commands: ["play", "p"],
    category: "music",
    expectedArgs: ["<alias> <song name>\n<alias> <song link>\n<alias> <playlist link>"],
    permissionError: "you can not play songs if you don't have permissions to speak in a voice channel.",
    minArgs: 1,
    maxArgs: null,
    cooldown: null, //null or time in milliseconds
    isGlobalCooldown: true,
    permissions: ["SPEAK"],
    requiredRoles: [],
    botPermissions: [],
    botPermissionError: "",
    description: "Plays a song",
    exampleUse: "",
    callback: (message, args, text, client, distube) => {
        if (!message.member.voice.channel) return message.reply(`you must be in a voice channel to play songs.`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`you must be in the same voice channel as me to play songs.`);
        distube.play(message, args.join(" "));
    }
}
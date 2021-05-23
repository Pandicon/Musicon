const votes = {} //{ guildID: [userID, userID2...] }
const neededVotesGuild = {} // { guildID: neededVotes }
const Discord = require('discord.js');
const {
    success,
    warning,
    error
} = require("@conf/colors.json")

module.exports = {
    commands: ["skip", "s"],
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
    botPermissionError: [],
    description: "Votes to skip the current song",
    exampleUse: "",
    callback: async(message, args, text, client, distube) => {
        if(!distube.isPlaying(message)) return message.reply(`no song is currently being played.`)
        if(!message.member.voice.channel) return message.reply(`you must be in a voice channel to vote to skip songs.`);
        if(message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`you must be in the same voice channel as me to vote to skip songs.`);
        const guildID = message.guild.id;
        const authorID = message.author.id;
        const membersInChannel = message.member.voice.channel.members.size-1;
        if(membersInChannel == 1) neededVotesGuild[guildID] = 1;
        else if(membersInChannel < 5) neededVotesGuild[guildID] = 2;
        else neededVotesGuild[guildID] = Math.floor(Math.sqrt(membersInChannel));
        if(!votes[guildID]) votes[guildID] = [];
        if(votes[guildID].includes(authorID)) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(
                    message.guild.me.nickname || client.user.username,
                    client.user.displayAvatarURL({ dynamic: true })
                )
                .setColor(error)
                .setDescription(`You already voted to skip this song.`)
            
            message.channel.send(embed);
            return
        }
        votes[guildID].push(authorID);
        votes[guildID] = votes[guildID].filter(id => message.member.voice.channel.members.has(id));
        const currentVotes = votes[guildID].length;
        if(currentVotes >= neededVotesGuild[guildID]) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(
                    message.guild.me.nickname || client.user.username,
                    client.user.displayAvatarURL({ dynamic: true })
                )
                .setColor(success)
                .setDescription(`Successfully skipped the song!`)
            
            message.channel.send(embed);
            distube.skip(message);
            return
        } else {
            const embed = new Discord.MessageEmbed()
                .setAuthor(
                    message.guild.me.nickname || client.user.username,
                    client.user.displayAvatarURL({ dynamic: true })
                )
                .setColor(warning)
                .setDescription(`Successfully voted to skip the song! ${currentVotes} out of ${neededVotesGuild[guildID]} ${neededVotesGuild[guildID] > 1 ? "people" : "person"} needed to skip the song already voted.`)
            
            message.channel.send(embed);
            return
        }
    }
}

module.exports.resetVotes = guildID => {
    delete votes[guildID];
    delete neededVotesGuild[guildID];
}
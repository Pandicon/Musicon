const Discord = require("discord.js")
const {
    defaultColor
} = require("@conf/colors.json")

async function handleQueue(distube, message, page, oldMessage) {
    let queue = distube.getQueue(message);
    if (!page || isNaN(page) || page < 1) page = 1;
    let embedText = "No songs are in the queue";
    let maxPage = 1;
    const embed = new Discord.MessageEmbed()
    if (queue) {
        maxPage = Math.ceil(queue.songs.length / 10);
        if (page > maxPage) page = maxPage;
        embedText = "";
        let max = page * 10 - 1;
        let min = (page - 1) * 10;
        embedText += `**Songs:** ${queue.songs.length} song${queue.songs.length == 1 ? "" : "s"}\n**Length:** ${queue.formattedDuration}\n**Current time:** ${queue.formattedCurrentTime}\n\n`;
        for (let i = min; i <= max; i++) {
            let song = queue.songs[i];
            if (!song) break;
            embedText += `**${i+1}.** [${song.name}](${song.url}) - \`${song.formattedDuration}\`\n`;
        }
        embed.setFooter(`Page ${page} out of ${maxPage}`)
    }

    embed.setAuthor(
            message.member.nickname || message.author.username,
            message.author.displayAvatarURL({
                dynamic: true
            })
        )
        .setColor(defaultColor)
        .setDescription(embedText)

    let mes;
    if (oldMessage) {
        oldMessage.reactions.removeAll();
        mes = await oldMessage.edit(embed);
    } else {
        mes = await message.channel.send(embed);
    }
    if (queue) {
        if (page > 1) mes.react("⏮️").catch(e => console.log(e));
        if (page < maxPage) mes.react("⏭️").catch(e => console.log(e));

        const filter = (reaction, user) => {
            return (reaction.emoji.name === "⏮️" || reaction.emoji.name === "⏭️") && !user.bot;
        };

        const collector = mes.createReactionCollector(filter, {
            time: 60000
        });

        collector.on('collect', (reaction, user) => {
            if (reaction.emoji.name === "⏮️") collector.stop("previous");
            else if (reaction.emoji.name === "⏭️") collector.stop("next");
            collector.checkEnd();
        });

        collector.on('end', (collected, reason) => {
            queue = distube.getQueue(message);
            if (reason == "previous") {
                page -= 1;
                if (queue && page > 0) handleQueue(distube, message, page, mes);
                return
            } else if (reason == "next") {
                page += 1;
                if (queue && Math.ceil(queue.songs.length / 10) >= page) handleQueue(distube, message, page, mes);
                return
            } else {
                if (mes.reactions.cache.has("⏮️")) {
                    mes.reactions.resolve("⏮️").users.remove(message.guild.me.id).catch(e => console.log(e));
                }
                if (mes.reactions.cache.has("⏭️")) {
                    mes.reactions.resolve("⏭️").users.remove(message.guild.me.id).catch(e => console.log(e));
                }
            }
        });
    }
}

module.exports = {
    commands: ["queue", "q"],
    category: "music",
    expectedArgs: ["<alias> <page>"],
    permissionError: "",
    minArgs: 0,
    maxArgs: null,
    cooldown: null, //null or time in milliseconds
    isGlobalCooldown: true,
    permissions: [],
    requiredRoles: [],
    botPermissions: [],
    botPermissionError: [],
    description: "Returns the current queue",
    exampleUse: "",
    callback: (message, args, text, client, distube) => {
        let queue = distube.getQueue(message);
        let page = parseInt(args[0]);
        if (!page || isNaN(page) || page < 1) page = 1;
        handleQueue(distube, message, page);
    }
}
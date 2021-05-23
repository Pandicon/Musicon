const Discord = require('discord.js')
const { creatorLink, botAddLink, botAddLinkTopGG, embedFooterDividing } = require('@root/info.json')

module.exports = {
    commands: ['inviteme', 'addme', 'invite'],
    category: 'info',
    expectedArgs: [],
    permissionError: [],
    minArgs: 0,
    maxArgs: null,
    cooldown: null, //null or time in milliseconds
    isGlobalCooldown: true,
    permissions: [],
    requiredRoles: [],
    botPermissions: [],
    botPermissionError: [],
    description: "Sends you the links you can use to invite the bot to your server",
    callback: (message, args, text, client) => {
        const guildsSize = client.guilds.cache.size
        const embed = new Discord.MessageEmbed()

        .setTitle('Add me to your server!')
        .setColor(message.member.displayHexColor)
        .setDescription(`**Direct link:**\nYou can click [here](${botAddLink}) to add me to your server directly, without going on any other website\n**Top.gg link:**\nYou can go to my [top.gg](${botAddLinkTopGG}) [page](${botAddLinkTopGG}) and add me from there too`)
        .setFooter(`Bot made by ${creatorLink} ${embedFooterDividing} Currently in ${guildsSize} server${guildsSize == 1 ? "" : "s"}`)
        
        message.channel.send(embed)
        console.log(botAddLinkTopGG)
    }
}
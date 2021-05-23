module.exports = {
    commands: ['ping'],
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
    botPermissionError: "",
    description: "Shows the bot and API ping",
    exampleUse: "**Command:** <prefix>ping\n**Example response:** **Bot latency:** 205ms, **API latency:** 162ms",
    callback: (message, args, text, client) => {
        message.reply('calculating the ping...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit(`**Bot latency:** ${ping}ms, **API latency:** ${client.ws.ping}ms`)
        })
    }
}
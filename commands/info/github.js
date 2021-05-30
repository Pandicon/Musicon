const {
    MessageButton
} = require('discord-buttons');
const {
    githubAccount
} = require("@root/info.json")

module.exports = {
    commands: ['github'],
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
    description: "",
    exampleUse: "**Command:** <prefix>ping\n**Example response:** **Bot latency:** 205ms, **API latency:** 162ms",
    callback: async(message, args, text, client) => {
        const button = new MessageButton()
            .setStyle('url')
            .setLabel('Check out my GitHub account!')
            .setURL(githubAccount)

        await message.channel.send("Click the button below to see my GitHub account.", {button: button});
    }
}
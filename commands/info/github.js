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
    description: "Creates a button that will redirect users to your github page when clicked.",
    callback: async(message, args, text, client) => {
        const button = new MessageButton()
            .setStyle('url')
            .setLabel('Check out my GitHub account!')
            .setURL(githubAccount)

        await message.channel.send("Click the button below to see my GitHub account.", {button: button});
    }
}
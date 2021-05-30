const {
    sourceCodeLink,
    creators
} = require("@root/info.json")
const {
    MessageEmbed
} = require("discord.js")
const {
    defaultColor
} = require("@conf/colors.json")
const {
    version
} = require("@root/config.json")
const basic = require("@util/basic.js")

module.exports = {
    commands: ["botinfo", "info"],
    category: 'info',
    expectedArgs: [],
    permissionError: [],
    minArgs: 0,
    maxArgs: null,
    cooldown: null,
    isGlobalCooldown: true,
    permissions: [],
    requiredRoles: [],
    botPermissions: [],
    botPermissionError: "",
    description: "Sends an embed with some bot information",
    callback: async (message, args, text, client) => {
        const embed = new MessageEmbed()
            .setAuthor(client.user.tag, client.user.avatarURL({
                dynamic: true
            }))
            .setColor(defaultColor)
            .addFields({
                name: "Bot tag",
                value: client.user.tag
            }, {
                name: `Creator${creators.length == 1 ? "" : "s"}`,
                value: creators.join("\n")
            }, {
                name: "Version",
                value: version
            }, {
                name: "Server count",
                value: client.guilds.cache.size
            }, {
                name: "Time since last restart",
                value: (await basic.timeToText(Math.floor(process.uptime() * 1000)))
            }, {
                name: "Source code",
                value: sourceCodeLink
            })

        message.channel.send(embed);
    }
}
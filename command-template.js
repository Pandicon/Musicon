module.exports = {
    commands: [""], //all command aliases, whatever is put into the array will be an alias for the command, for example "play" and "p"
    category: "", //command category, used for the commands command
    expectedArgs: "", //what to tell the user when they fail to provide all the arguments, tells them how to use the command
    permissionError: "", //what to respond with when the user doesn't have all permissions
    minArgs: 0, //minimum number of arguments to provide
    maxArgs: null, //maximum number of arguments to provide
    cooldown: null, //cooldown, null or time in milliseconds
    isGlobalCooldown: true, //whether or not the cooldown is global - if set to false the cooldown will be guild specific
    permissions: [], //required permissions for running the command (user)
    requiredRoles: [], //required roles for running the command (user) - use this to check for roles with a specific name, for example "DJ"
    botPermissions: [], //required permissions for running the command (bot)
    botPermissionError: "", //what to respond with when the bot doesn't have all needed permissions
    description: "", //description of the command
    exampleUse: "", //example use of the command
    callback: (message, args, text, client) => {
        //your code to run
    }
}
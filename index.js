process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
    // Application specific logging, throwing an error, or other logic here
});

process.on("uncaughtException", (err, origin) => {
    console.log(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

require("module-alias/register");

const Discord = require("discord.js");
const client = new Discord.Client();

const Distube = require("distube");
const distube = new Distube(client, {
    searchSongs: true,
    emitNewSongOnly: true
});
require('discord-buttons')(client);
const dotenv = require('dotenv');
dotenv.config();

const config = require("./config.json");

const prefix = config.prefix;

const commandBase = require("@commands/command-base");
const loadCommands = require("@commands/load-commands.js");
const loadEvents = require("@events/load-events.js")
const topGgApiToken = process.env.TOPGGAPITOKEN;
const token = process.env.BOT_TOKEN;

const Topgg = require(`@top-gg/sdk`);
const api = new Topgg.Api(topGgApiToken);

const {
    playSong
} = require("@conf/colors.json")

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

client.once("ready", async () => {
    var startTime = new Date();
    var startTimeUnix = startTime.getTime();
    console.log("Musicon is online!");
    console.log(
        "Current time: " +
        startTime.toLocaleDateString() +
        " " +
        startTime.toLocaleTimeString() +
        " " +
        startTimeUnix
    );
    const guildsSize = client.guilds.cache.size;
    client.user.setActivity(
        `for ${prefix}help | Currently in ${guildsSize} server${guildsSize == 1 ? "" : "s"}`, {
            type: "WATCHING"
        }
    );
});

client.on("ready", async () => {
    commandBase.loadPrefixes(client);
    loadCommands(client, distube);
    loadEvents(client, distube);
    setInterval(() => {
        const guildsSize = client.guilds.cache.size;
        client.user.setActivity(
            `for ${prefix}help | Currently in ${guildsSize} server${guildsSize == 1 ? "" : "s"}`, {
                type: "WATCHING"
            }
        );
    }, 60000);

    //Only use this if you have your top gg api token
    /*setInterval(async () => {
        await api.postStats({
            serverCount: client.guilds.cache.size,
        });
    }, 300000);*/
});

client.login(token);
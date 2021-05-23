const fs = require('fs');
const path = require('path');
const commandBase = require('@commands/command-base');

module.exports = (client, distube) => {
    const commands = []
  
    const readCommands = (dir) => {
      const files = fs.readdirSync(path.join(__dirname, dir))
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
          readCommands(path.join(dir, file))
        } else if (file !== 'load-events.js') {
          const option = require(path.join(__dirname, dir, file))
          if(dir == "distube" && distube) {
            option(distube)
          } else if(dir == "discord" && client) {
            option(client)
          }
        }
      }
    }
    
    readCommands('.')

    return commands
}
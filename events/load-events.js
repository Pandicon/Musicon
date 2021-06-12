const fs = require('fs');
const path = require('path');

module.exports = (client, distube) => {
    const commands = []
  
    const readEvents = (dir) => {
      const files = fs.readdirSync(path.join(__dirname, dir))
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
          readEvents(path.join(dir, file))
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
    
    readEvents('.')

    return commands
}
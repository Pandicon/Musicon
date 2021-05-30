# Musicon
This bot is a project for my Computer Science classes. It is a music bot for discord that lets you play songs and lists of songs in voice channels. I will continue improving the project as the due dates will progress :D

## Running the bot yourself
1. Install node.js and npm if they are not installed already. [node.js installer](https://nodejs.org/en/)
2. Clone this repository using `git clone https://github.com/Pandicon/Musicon.git`.
    - You can also fork this repository
3. You can then either `cd` into the repository folder, or navigate to it in file manager and run the `cmd.bat` file. That will open up the windows console already "cded" into the folder.
4. Install all the dependencies using `npm i` or `yarn`
5. Change the values in the `config.json` and `info.json` files and then rename `.env-template` to `.env` and fill in the values
6. Then you can run the bot using `node index.js`
7. Generate your invite link on the [discord developers](https://discord.com/developers) OAuth2 page, check scope `bot` and give it the `Administrator` permission to avoid any potential issues.

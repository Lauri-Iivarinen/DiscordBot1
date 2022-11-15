//slashcommand
const {SlashCommandBuilder} = require('discord.js');

//export komento nodessa
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    //vastaus
    async execute(e) {
        await e.reply('Pong!')
    }
}
//slashcommand
const {SlashCommandBuilder} = require('discord.js');

//export komento nodessa
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong! and something')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),
    //vastaus
    async execute(e) {
        const msg = e.options.getString('input')
        await e.reply('Pong! and ' + msg)
    }
}
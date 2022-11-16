//slashcommand
const {SlashCommandBuilder} = require('discord.js');

//export komento nodessa
module.exports = {
    data: new SlashCommandBuilder()
        .setName('split')
        .setDescription('Splits groups in voicechannel')
        .addIntegerOption(option =>
            option.setName('input')
                .setDescription('Number of divided groups')
                .setRequired(true)),
    //Divide groups --TODO
    async execute(e) {
        const value = e.options.getInteger('input')
        await e.reply('Splitting ' + value)
    }
}
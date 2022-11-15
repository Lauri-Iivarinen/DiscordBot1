const {SlashCommandBuilder} = require('discord.js')

module.exports={
    data: new SlashCommandBuilder()
            .setName('roll')
            .setDescription('Rolls an integer between 1-100'),
        async execute(e){
            let value = Math.round(Math.random() * 99) + 1;
            await e.reply(e.user.username + ' rolled: **' + value + '**')
        }
}
const {SlashCommandBuilder} = require('discord.js')
const {giphyAPI} = require('../config.json')


module.exports = {
    data: new SlashCommandBuilder()
            .setName('cat')
            .setDescription('Get funny GIF of a cat'),
            async execute(e){
                try{
                    //fetch url for a cat gif
                    const connection = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=' + giphyAPI)
                    const json = await connection.json()
                    const index = Math.round(Math.random() * (json.data.length-1))
                    const url = json.data[index].url
                    e.reply(url)
                }catch(error){
                    e.reply('Not aivailable at the moment')
                }
            }
}
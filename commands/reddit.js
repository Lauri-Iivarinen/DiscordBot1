const {SlashCommandBuilder} = require('discord.js')



module.exports = {
    data: new SlashCommandBuilder()
            .setName('cursed')
            .setDescription('Some comments may have been better left un-typed'),
            async execute(e){
                try{
                    //fetch url for a cat gif
                    const connection = await fetch('https://www.reddit.com/r/cursedcomments.json')
                    const json = await connection.json()
                    const index = Math.round(Math.random() * (json.data.children.length - 2) + 1)
                    const image = json.data.children[index].data.url
                    e.reply(image)
                }catch(error){
                    e.reply('Not aivailable at the moment')
                }
            }
}
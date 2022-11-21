//slashcommand
const {SlashCommandBuilder,ChannelType,VoiceState} = require('discord.js');

//export to use in main
module.exports = {
    data: new SlashCommandBuilder()
        .setName('split')
        .setDescription('Splits groups in voicechannel')
        .addIntegerOption(option =>
            option.setName('amount')
                .setMinValue(1)
                .setMaxValue(5)
                .setDescription('Number of created groups')
                .setRequired(true)),
    async execute(msg) {
        /*---------------------------
        Splits all members of the command callers (user) voice channel
        and randomly divides them into smaller subgroups
        after which all subgroups are moved into their assigned channels
        ----------------------------*/


        //amount of groups to be created
        const value = msg.options.getInteger('amount')     

        //arrays for doing the split and executing setChannel
        const channelsArray = [] //all voicechannels
        const mix = [] //end result of randomized members
        const assigned = [] //subgroups that will be assigned to channels
        let userInVoice = false //is user currently in voice chat
        let channel = {} //voice channel where user is currently
        const memberArray = [] //all members in users channel

        //Save all voice channels into array
        msg.guild.channels.cache.map(cha =>{ //cha shor for channel
            //type 2 means voice chat
            if (cha.type === 2) channelsArray.push(cha)
            //assign the correct voice channel based on users current channel
            if (cha.type === 2 && cha.members.has(msg.user.id)){
                userInVoice = true //user is in voicechat
                channel = cha //sets the voice channel where you pull your members
            }
        })

        //check if user is in voice
        if (!userInVoice){
            msg.reply("You are not in the voice channel")
            return
        }

         //Add members to memberArray
         channel.members.map(member=>{
            memberArray.push(member)
        })

        //Return if amount of groups is greater than the amount of voice channels
        if(value > channelsArray.length){
            msg.reply("You have too few voice channels, create more!")
            return
        }

        //Randomize the memberArray order, save to mix and clear from memberArray
        while (memberArray.length > 0){
            let index = Math.round(Math.random() * (memberArray.length - 1))
            mix.push(memberArray[index])
            memberArray.splice(index,1)
        }
        
        //calculate amount of members to be assigned in 1 channel
        let amountPerArray = Math.ceil(mix.length/value)

        //create subgroups and add to assigned
        while (mix.length > 0){
            assigned.push(mix.slice(0,amountPerArray))
            mix.splice(0,amountPerArray)
        }

        //Move all members to their assigned channels
        //TODO / develop -> only move to channels that dont have currently members
        //or ignore set channels
        let channelIndex = 0 //changing the channel for each subgroup
        //subgroups
        assigned.forEach(array => {
            //members in subgroup
            array.forEach(member =>{
                member.voice.setChannel(channelsArray[channelIndex].id)
                console.log('Moved ' + member.user.username + ' to ' + 
                    channelsArray[channelIndex].name)
            })
            channelIndex++
        });

        //Successfully assigned all users
        await msg.reply("Split successfull")

    }
}
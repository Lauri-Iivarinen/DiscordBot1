//All of this setup is pasted code from setup guide https://discordjs.guide/#before-you-begin

const fs = require('node:fs');
const path = require('node:path');
const { clientId, guildId, token } = require('./config.json');

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection,} = require('discord.js');
const { config } = require('node:process');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildVoiceStates] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});



client.commands = new Collection();

//paste from setup guide
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on('voiceStateUpdate',(oldState,newState) =>{
	/*
	console.log("-------------------------------OLD STATE-------------------")
	console.log(oldState)
	console.log("-------------------------------NEW STATE-------------------")
	console.log(newState)
	*/
})

//Paste for reading commands and executing them
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);


	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	//TODO clean
	try {
		await command.execute(interaction)
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//paste ends


//Last line in program!!
client.login(token);
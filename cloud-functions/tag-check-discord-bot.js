const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS] });
require('dotenv').config()
const tagCheckChannel = "730464994558214195"
const cdata = {
	color: 0xd0d303,
	title: 'Correct Format!!',
	description: 'Please go ahead for registration',

	footer: {
		text: 'F2WxAssistant',
	}
};

const incdata = {
	color: 0xd0d303,
	title: 'Incorrect Format!!',
	description: 'Please provide required number of tags',

	footer: {
		text: 'F2WxAssistant',
	}
};

const requiredMentions =4;

bot.on("messageCreate", async message => {
    //Check if author is a bot or the message was sent in dms and return
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    if(message.channelId === tagCheckChannel){
        if(message.mentions.users.size >= requiredMentions){
            message.react('✅')
            .then(console.log("sucess"))
            .catch(console.error);
            message.reply({ embeds: [cdata] })
            .then(() => console.log(`Replied to message ""`))
            .catch(console.error);
      
        }
        else{
            message.react('❌')
            .then(console.log("rejected "))
            .catch(console.error);
            message.reply({ embeds: [incdata] })
            .then(msg => {
                setTimeout(() => msg.delete(), 7000)
              })
            .catch(console.error);
        }
       
       
    }
  

  

});



bot.login(process.env.token);

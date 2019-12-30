const secrets = require("./secrets.js")
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})
client.on('message', msg => {
  if (msg.content.toLowerCase().includes('bonsai') && msg.author.username != "BonsaiBro") {
      
    const channel = client.channels.find('name', msg.channel.name)
    //msg.reply('BONSAI!!!!');
    if(msg.author.username.toLowerCase() == "hube"){        
        channel.send('Ted Hubish is a fraud')
    }
    else{
        channel.send('BONSAI!!')
    }
  }
})

client.login(secrets.token);
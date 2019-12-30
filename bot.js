const secrets = require("./secrets.js")
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
  if (msg.content.toLowerCase().includes('bonsai')) {
    msg.reply('BONSAI!');
  }
});

client.login(secrets.token);
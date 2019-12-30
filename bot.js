const secrets = require("./secrets.js")
const Discord = require('discord.js');
const client = new Discord.Client();
let anger = 0

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})
client.on('message', msg => {
  const channel = client.channels.find('name', msg.channel.name)
  if (msg.content.toLowerCase().includes('bonsai') && msg.author.username != "BonsaiBro") {
    if(msg.author.username.toLowerCase() == "hube"){    
      if(anger == 0){channel.send('Haha oh Ted... you speak my word? How cute.')}
      else if(anger < 2){channel.send("Ted... how about you leave me be. I'm busy.")}
      else if(anger < 4){channel.send("TED. I SAID TO LEAVE ME ALONE.")}
      else {channel.send("I'M GOING TO SLAUGHTER YOU, TED!!")}
      anger++    
    }
    else{
      if(anger <= 5){
        channel.send('BONSAI! :)')
        anger = anger-1
      }
      else{
        channel.send("I'M TOO MAD FOR THIS RIGHT NOW!! I GOTTA CHILL!! AAAAAAUGH!!")
      }
    }
  }
  else if ((msg.content.toLowerCase().includes('bοnѕai') || 
            msg.content.toLowerCase().includes('bonѕаі') || 
            msg.content.toLowerCase().includes('bo​nsai') || 
            msg.content.toLowerCase().includes('bons‌‌ai')) 
            && msg.author.username != "BonsaiBro") {
    if(anger == 0){channel.send('Clever trick. Trying to keep me from saying my word? He he. :)')}
    else if(anger <= 2){channel.send("How about you know it off, pal?")}
    else if(anger <= 4){channel.send("YOU'RE TRYING TO KEEP MY WORD FROM ME??")}
    else {channel.send("I'M GOIN' APE! I'M RAGIN'!! LET ME SPEAK MY WORD!!!!")}
    anger++
  }
  else if ((msg.content.toLowerCase().includes('relax, my bro') || msg.content.toLowerCase().includes('relax my bro')) && msg.author.username != "BonsaiBro") {
    if(anger < 2){
      channel.send("lol i'm not even mad bro.")
    }
    else{channel.send('Sorry i got heated, bro. i just love to speak my word so gosh darn much... :)')}
    anger = 0
  }
  else if (msg.content.toLowerCase().includes('know it off') && msg.author.username != "BonsaiBro") {
    if(anger < 5){
    channel.send("hey bro, you bullying my typo? that's a yikes from me, bro.")
    anger += 2
    }
    else{
      channel.send("YOU TYPO SHAMING ME, BRO??? I'M PISSED AS IS!!")
    }
  }

})

client.login(secrets.token);
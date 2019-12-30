const secrets = require("./secrets.js")
const Discord = require('discord.js');
const client = new Discord.Client();
let anger = 0
let hentai = 0

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})
client.on('message', msg => {
const channel = client.channels.find('name', msg.channel.name)

//if bonsai is spoken
if (msg.content.toLowerCase().includes('bonsai') && msg.author.username != "BonsaiBro") {
  //check for Ted
  if(msg.author.username.toLowerCase() == "hube"){    
    if(anger <= 0){channel.send("haha oh ted... you speak my word? that's funny.")}
    else if(anger == 1){channel.send("ted... how about you leave me be. I'm busy.")}
    else if(anger == 2){channel.send("buzz off ted!")}
    else if(anger == 3){channel.send("don't say my word ted. don't!")}
    else if(anger == 4){channel.send("TED. I SAID TO LEAVE ME ALONE.")}
    else {channel.send("I'M GOING TO SLAUGHTER YOU, TED!!")}
    anger++    
  } 
  //check for name
  else if(msg.content.toLowerCase().includes('bonsai bro') && msg.author.username != "BonsaiBro") {
    if(anger < 5){
      channel.send("that's the name bro, don't wear it out lol. :)")
    }
    else{
      channel.send("DON'T EVEN SAY MY NAME, BRO. I'M PISSED!")
    }
  } 
  //check anger
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

//check for fake bonsais
else if ((msg.content.toLowerCase().includes('bοnѕai') || 
          msg.content.toLowerCase().includes('bonѕаі') || 
          msg.content.toLowerCase().includes('bo​nsai') || 
          msg.content.toLowerCase().includes('bons‌‌ai')) 
          && msg.author.username != "BonsaiBro") {
  if(anger <= 0){channel.send('clever trick. trying to keep me from saying my word? He he. :)')}
  else if(anger == 1){channel.send("haha very funny bro. c'mon let me say it... my word!")}
  else if(anger == 2){channel.send("how about you know it off, bro?")}
  else if(anger == 3){channel.send("YOU THINK YOU'RE FUNNY?? YOU THINK THIS IS A JOKE, JERRY SEINFELD??")}
  else if(anger == 4){channel.send("YOU'RE TRYING TO KEEP MY WORD FROM ME??")}
  else {channel.send("I'M GOIN' APE! I'M RAGIN'!! LET ME SPEAK MY WORD!!!!")}
  anger++
}

//told to relax
else if ((msg.content.toLowerCase().includes('relax, my bro') || msg.content.toLowerCase().includes('relax my bro')) && msg.author.username != "BonsaiBro") {
  if(anger < 2){
    channel.send("lol i'm not even mad bro. :)")
  }
  else{channel.send("sorry i got heated, bro. now i'm chill tho. :)")}
  anger = 0
}

//mocking typos
else if (msg.content.toLowerCase().includes('know it off') && msg.author.username != "BonsaiBro") {
  if(anger < 5){
  channel.send("hey bro, you bullying my typo? that's a yikes from me, bro.")
  anger += 2
  }
  else{
    channel.send("YOU TYPO SHAMING ME, BRO??? I'M PISSED AS IS!!")
  }
}

//mention of hentai
else if  (msg.content.toLowerCase().includes('hentai') && msg.author.username != "BonsaiBro") {
  if(hentai % 5 == 0){
    if(hentai % 10 == 0){
      channel.send("we talkin' hentai??")
      anger = anger-1
    }
    else{
      channel.send("bro, i love it when we talk hentai in here. :)")
      anger = 0
    }
  }
  hentai++
}

  //statcheck
else if  (msg.content.toLowerCase().includes("bro u ok") && msg.author.username != "BonsaiBro") {
channel.send(
`anger lvl: ${anger}
hentai interest: ${hentai}`
)}
})

client.login(secrets.token);
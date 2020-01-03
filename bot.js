const secrets = require("./secrets.js")
const bonsaiBot = require('./save/save.json')
const input = require("./input.js")
const respo = require("./responses.js")
const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');

///////////////////////////////////////////////////////////////
//temporary conditions
//////////////////////////////////////////////////////////////////
let lastPing = 0
let lastPinger = ""
let emojiSeek = false
let jokeSeek = false
let stumbling = false
let apologyCount = 0

///////////////////////////////////////////////////////////////
//functions
//////////////////////////////////////////////////////////////////
function saveProg(){
  fs.writeFile("./save/save.json", JSON.stringify(bonsaiBot), function(err) {
      if (err) {
          console.log(err);
      }
  });
}

function getRandom(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function increaseStat(statName,chng){
  if(bonsaiBot.stats[statName].amt < bonsaiBot.stats[statName].max){
    if(bonsaiBot.stats[statName].amt + chng < bonsaiBot.stats[statName].max){
    bonsaiBot.stats[statName].amt = bonsaiBot.stats[statName].amt + chng
    }
    else{
      bonsaiBot.stats[statName].amt = bonsaiBot.stats[statName].max
    }
  }
}

function decreaseStat(statName,chng){
  if(bonsaiBot.stats[statName].amt > 0){
    bonsaiBot.stats[statName].amt = bonsaiBot.stats[statName].amt - chng
  }
}

function resetStat(statName){
  bonsaiBot.stats[statName].amt = bonsaiBot.stats[statName].default
}

function increaseFriend(friend,amt,lastChannel){
  let buddy = bonsaiBot.friends.find(o => o.name == friend)
  buddy.friendLvl = buddy.friendLvl + amt
  if(bonsaiBot.currentBF != getBestFriend()){
    bonsaiBot.currentBF = getBestFriend().toLowerCase()
    lastChannel.send(`${bonsaiBot.currentBF} bro i really admire you. you got a favorite emoji?`)
    emojiSeek = true
  }
  if(bonsaiBot.currentEnemy != getEnemy()){
    lastChannel.send(`getting to know ${friend} has made me realize how unbonsai ${getEnemy().toLowerCase()} is ${bonsaiBot.emoji}`)
    bonsaiBot.currentEnemy = getEnemy().toLowerCase()
  }
}

function decreaseFriend(friend,amt,lastChannel){
  let buddy = bonsaiBot.friends.find(o => o.name == friend)
  buddy.friendLvl = buddy.friendLvl - amt
  if(buddy.friendLvl < -50){
    lastChannel.send(`${friend}... i've been thinking... this whole grudge holding thing isn't very bonsai. i've decided to put the past behind us lol ${bonsaiBot.emoji}`)
    buddy.friendLvl = 5
  }
  if(bonsaiBot.currentEnemy != getEnemy()){
    lastChannel.send(`btw ${getEnemy().toLowerCase()} does not give me very bonsai vibes iykwim ${bonsaiBot.emoji}`)
    bonsaiBot.currentEnemy = getEnemy().toLowerCase()
  }
  if(bonsaiBot.currentBF != getBestFriend()){
    lastChannel.send(`maybe this whole bff thing with ${bonsaiBot.currentBF} was just a phase. ${getBestFriend().toLowerCase()} is looking really bonsai right now. what emoji do you like the most, ${getBestFriend().toLowerCase()}?`)
    bonsaiBot.currentBF = getBestFriend().toLowerCase()
    emojiSeek = true
  }
}

function getBestFriend(){
  let sortedFriends = bonsaiBot.friends.sort((a, b) => (a.friendLvl < b.friendLvl) ? 1 : -1)
  return sortedFriends[0].name
}

function getEnemy(){
  let sortedFriends = bonsaiBot.friends.sort((a, b) => (a.friendLvl > b.friendLvl) ? 1 : -1)
  return sortedFriends[0].name
}

///////////////////////////////////////////////////////////////
//on message recieve
//////////////////////////////////////////////////////////////////
client.on('message', msg => {if(msg.author.username != "BonsaiBro"){
  let killSwitch = false
  lastPing++
  const channel = client.channels.find('name', msg.channel.name)
  const sender = msg.author.username.toLowerCase()
///////////////////////////////////////////////////////////////
//new to bonsai
//////////////////////////////////////////////////////////////////
  if(typeof bonsaiBot.friends.find(o => o.name == sender) == "undefined"){
    let newFriend = {
      "name":sender,
      "friendLvl":0,
    }
    //channel.send(`hey ${sender.toLowerCase()} i'm your bonsai bro lol. say bonsai some time, kay? ${bonsaiBot.emoji}`)
    bonsaiBot.friends.push(newFriend)
  }
///////////////////////////////////////////////////////////////
//emoji seek check
//////////////////////////////////////////////////////////////////
if(sender == bonsaiBot.currentBF && emojiSeek == true && (msg.content.indexOf("<:") > -1 || msg.content.match(/\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g) != null)){
  if(msg.content.indexOf("<:") > -1){
    let cutOne = msg.content.indexOf("<:")
    let cutTwo = msg.content.indexOf(">") + 1
    let cutEmoji = msg.content.substring(cutOne,cutTwo);
    bonsaiBot.emoji = cutEmoji
  }
  else{
    bonsaiBot.emoji = msg.content.match(/\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g)[0]
  }
  channel.send(`great emoji choice, bro. ${bonsaiBot.emoji} is my new fave emoji. bonsai to that lol`)
  emojiSeek = false
}

///////////////////////////////////////////////////////////////
//silent stat changers
//////////////////////////////////////////////////////////////////
  //check for hate
  for(let i = 0; i < input.silent.hates.length; i++){if(msg.content.toLowerCase().includes(input.silent.hates[i])){
    decreaseFriend(sender,1,channel)
  }}
  //check for like
  for(let i = 0; i < input.silent.likes.length; i++){if(msg.content.toLowerCase().includes(input.silent.likes[i])){
    increaseFriend(sender,1,channel)
  }}
  //check for sin
  for(let i = 0; i < input.silent.sinPromote.length; i++){if(msg.content.toLowerCase().includes(input.silent.sinPromote[i])){
    decreaseStat("faith",1)
    if(bonsaiBot.stats.faith.amt == 1){
      channel.send(`bro all i think about is ${input.silent.sinPromote[i]} these days`)
    }
    else if(bonsaiBot.stats.faith.amt == 10){
      channel.send(`just spent all night googling pictures of ${input.silent.sinPromote[i]}...`)
    }
    else if(bonsaiBot.stats.faith.amt == 20){
      channel.send(`please don't tell my mom but i've been doing a lot of ${input.silent.sinPromote[i]} lately and it's really ruining my life lol`)
    }
    else if(bonsaiBot.stats.faith.amt == 30){
      channel.send(`${input.silent.sinPromote[i]} sounds straight up good rn lol ${bonsaiBot.emoji}`)
    }
    else if(bonsaiBot.stats.faith.amt == 40){
      channel.send(`what is ${input.silent.sinPromote[i]} please tell me not a joke lol ${bonsaiBot.emoji}`)
    }
    else if(bonsaiBot.stats.faith.amt == 50){
      channel.send(`could anyone sell me some ${input.silent.sinPromote[i]} in here lol jk`)
    }
    else if(bonsaiBot.stats.faith.amt == 60){
      channel.send(`${input.silent.sinPromote[i]} is cool as heck bro`)
    }
    else if(bonsaiBot.stats.faith.amt == 70){
      channel.send(`my priest found a website about ${input.silent.sinPromote[i]} in my browsing history. things have not been going bonsai for me irl lol`)
    }
    else if(bonsaiBot.stats.faith.amt == 80){
      channel.send(`${input.silent.sinPromote[i]}! ${input.silent.sinPromote[i]}! ${input.silent.sinPromote[i]}!`)
    }
    else if(bonsaiBot.stats.faith.amt == 90){
      channel.send(`${input.silent.sinPromote[i]} kinda peaks my interest ngl lol`)
    }
    else if(bonsaiBot.stats.faith.amt == 97){
      channel.send(`i'm going to google catholicism`)
    }
  }}
  //check for moral
  for(let i = 0; i < input.silent.faithPromote.length; i++){if(msg.content.toLowerCase().includes(input.silent.faithPromote[i])){
    increaseStat("faith",1)
    if(bonsaiBot.stats.faith.amt == 1){
      channel.send(`${input.silent.faithPromote[i]}? bro... i'm starting to feel holy again. send me energy`)
    }
    else if(bonsaiBot.stats.faith.amt == 10){
      channel.send(`${input.silent.faithPromote[i]}... it's been awhile since i've heard that word lol`)
    }
    else if(bonsaiBot.stats.faith.amt == 20){
      channel.send(`i've been thinking a lot about ${input.silent.faithPromote[i]} lately and it makes me feel good inside`)
    }
    else if(bonsaiBot.stats.faith.amt == 30){
      channel.send(`${input.silent.faithPromote[i]} wow what a bonsai idea`)
    }
    else if(bonsaiBot.stats.faith.amt == 40){
      channel.send(`i'm straight up vibing with this ${input.silent.faithPromote[i]} concept`)
    }
    else if(bonsaiBot.stats.faith.amt == 50){
      channel.send(`${input.silent.faithPromote[i]}?? bonsai to that! ${bonsaiBot.emoji}`)
    }
    else if(bonsaiBot.stats.faith.amt == 60){
      channel.send(`${input.silent.faithPromote[i]}... that reminds me. i've started reading the holy bible again lately. what a book... ${bonsaiBot.emoji}`)
    }
    else if(bonsaiBot.stats.faith.amt == 70){
      channel.send(`we talked about ${input.silent.faithPromote[i]} at mass last sunday. i think the catholics are onto something`)
    }
    else if(bonsaiBot.stats.faith.amt == 80){
      channel.send(`${input.silent.faithPromote[i]}! praise be the pope! jesus is lord! ${bonsaiBot.emoji}`)
    }
    else if(bonsaiBot.stats.faith.amt == 90){
      channel.send(`i will straight up murder anyone who doesn't bonsai with ${input.silent.faithPromote[i]}. do i agree with the crusades? no. not entirely, at least.`)
    }
    else if(bonsaiBot.stats.faith.amt == 98){
      channel.send(`hey bros it's me -- bonsai bot. i think it's time we inforced a 'catholics only' rule in chat. ${bonsaiBot.emoji} ${bonsaiBot.emoji} ${bonsaiBot.emoji}`)
    }
  }}
  


///////////////////////////////////////////////////////////////
//constant replies
//////////////////////////////////////////////////////////////////
if(killSwitch == false){
for(let i=0;i<input.constants.length;i++){
   for(let j=0;j<input.constants[i].keywords.length;j++){
     if(msg.content.toLowerCase().includes(input.constants[i].keywords[j])&& killSwitch == false){
      postMsg(input.constants[i].name,sender,channel)
      killSwitch = true
     }
    }
}}

///////////////////////////////////////////////////////////////
//random replies
//////////////////////////////////////////////////////////////////
if(killSwitch == false){
  for(let i=0;i<input.random.length;i++){
    if(msg.content.toLowerCase().includes(input.random[i])){
      if(getRandom(10) == 3){
        postMsg(input.random[i],sender,channel)
        killSwitch = true
      }
    }
  }
  }

}})

///////////////////////////////////////////////////////////////
//post constant msg
//////////////////////////////////////////////////////////////////
function postMsg(keyword,postSender,channel){
  let relationship = ""
  let msgIndex = 0
  lastPing = 0
  lastPinger = postSender
  if(postSender == bonsaiBot.currentBF){
    relationship = "bff"
  }
  else if(postSender == bonsaiBot.currentEnemy){
    relationship = "enemy"
  }
  else{
    relationship = "norm"
  }
  if(respo[keyword][relationship].length != 5){
    if(bonsaiBot.stats.anger.amt > 3){
      msgIndex = 1
    }
    else{
      msgIndex = 0
    }
  }
  else{
    msgIndex = bonsaiBot.stats.anger.amt
  }

  if(keyword == "vibeCmd"){
    if(relationship == "enemy"){
      channel.send(respo[keyword][relationship][msgIndex])
    }
    else{
      channel.send(
        `anger: ${bonsaiBot.stats.anger.amt}
faith: ${bonsaiBot.stats.faith.amt}
bonsai: ${bonsaiBot.stats.bonsai.amt}`
        )
    }
  }
  else if(keyword == "friendChk"){
    if(relationship == "enemy"){
      channel.send(respo[keyword][relationship][msgIndex])
    }
    else{
      let friendsList = ``
      for(let z=0;z<bonsaiBot.friends.length;z++){
        friendsList += 
`${bonsaiBot.friends[z].name}: ${bonsaiBot.friends[z].friendLvl}
`
      }
      channel.send(friendsList)
    }
  }
  else if(keyword == "sorry"){
    let buddy = bonsaiBot.friends.find(o => o.name == postSender)
    if(buddy.friendLvl >= 0 && apologyCount < 5){
      channel.send(`no need to apologize bro we're just living the bonsai lifestyle lol`)
      apologyCount++
    }
    else if(buddy.friendLvl >= 0 && apologyCount >= 5){
      channel.send(`BRO WTF WHY IS EVERYONE APOLOGIZING TO ME FOR NO REASON?? BRO YOU THINK I'M THAT INSECURE?? WELL NOW I'M PISSED NICE GOING BRO`)
      increaseStat('anger',4)
      apologyCount = 0
    }
    else{
      channel.send(`real talk? i was hopig you would apologize... this means a lot to me bro, but not in a weird way lol ${bonsaiBot.emoji}`)
      increaseFriend(postSender,5,channel)
    }
  }
  else{
  channel.send(translateMsg(respo[keyword][relationship][msgIndex],postSender))
  }
  //status changes
  if(respo[keyword].statChange.length > 0){
    if(respo[keyword].statChange[0] == "increase"){
      increaseStat(respo[keyword].statChange[1],respo[keyword].statChange[2])
      bonsaicheck(channel)
      if(respo[keyword].statChange[1] != "bonsai"){
        decreaseFriend(postSender,1,channel)
      }
      else{
        increaseFriend(postSender,2,channel)
        saveProg()
      }
    }
    else if(respo[keyword].statChange[0] == "decrease"){
      if(relationship != "enemy"){
        decreaseStat(respo[keyword].statChange[1],respo[keyword].statChange[2])
      }
      increaseFriend(postSender,1,channel)
    }
    else{
      if(relationship != "enemy"){
        //hacked it so only work with anger
        if(bonsaiBot.stats.anger.amt >= bonsaiBot.stats.anger.max){
          resetStat(respo[keyword].statChange[1])
          increaseFriend(postSender,1,channel)
        }
      }
    }
  }
  if(relationship == "enemy"){
    increaseStat("anger",1)
  }
}

function bonsaicheck(channel){
  if(bonsaiBot.stats.bonsai.amt == 10000){
    channel.send("BONSAI")
    channel.send("THROUGH")
    channel.send("MY")
    channel.send("VEINS")
    channel.send("I")
    channel.send("FEEL")
    channel.send("SUPER")
    channel.send("ULTRA")
    channel.send("MEGA")
    channel.send("DOUBLE")
    channel.send("DEITY")
    channel.send("BONSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAIIIIIIIIIIIIIIIII", {files: ["./modes/sayan5.png"]})
  }
  else if(bonsaiBot.stats.bonsai.amt == 5000){
    channel.send("AAAAAH!!!")
    channel.send("I'M")
    channel.send("GOING")
    channel.send("SUPER")
    channel.send("ULTRA")
    channel.send("MEGA")
    channel.send("DOUBLE")
    channel.send("BONSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIIIIIIIIIIIIIIIII", {files: ["./modes/sayan4.png"]})
  }
  else if(bonsaiBot.stats.bonsai.amt == 2500){
    channel.send("I'M")
    channel.send("GOING")
    channel.send("SUPER")
    channel.send("ULTRA")
    channel.send("MEGA")
    channel.send("BONSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIIIIIIIIIIIIIIIII", {files: ["./modes/sayan3.png"]})
  }
  else if(bonsaiBot.stats.bonsai.amt == 1000){
    channel.send("IT'S")
    channel.send("TIME")
    channel.send("FOR")
    channel.send("SUPER")
    channel.send("ULTRA")
    channel.send("BONSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIIIIIIIIIIIIIIIII", {files: ["./modes/sayan2.png"]})
  }
  else if(bonsaiBot.stats.bonsai.amt == 500){
    channel.send("I")
    channel.send("FEEL")
    channel.send("SUPER")
    channel.send("BONSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIIIIIIIIIIIIIIIII", {files: ["./modes/sayan1.png"]})
  }
}

function translateMsg(msg,postSender){
  let msg1 = msg.replace("EMOJIHERE",bonsaiBot.emoji)
  let msg2 = msg1.replace("NAMEHERECAPS",postSender.toUpperCase())
  let msg3 = msg2.replace("NAMEHERE",postSender)
  return msg3
}

client.login(secrets.token);
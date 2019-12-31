const secrets = require("./secrets.js")
const bonsaiBot = require("./brain.js")
const input = require("./input.js")
const respo = require("./responses.js")
const Discord = require('discord.js');
const client = new Discord.Client();

///////////////////////////////////////////////////////////////
//temporary conditions
//////////////////////////////////////////////////////////////////
let lastPing = 0
let lastChannel = ""
let lastPinger = ""
let emojiSeek = false
let jokeSeek = false
let stumbling = false

///////////////////////////////////////////////////////////////
//functions
//////////////////////////////////////////////////////////////////
function saveProg(){

}

function getRandom(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function increaseStat(statName,chng){
  if(bonsaiBot.stats[statName].amt < bonsaiBot.stats[statName].max){
    bonsaiBot.stats[statName].amt = bonsaiBot.stats[statName].amt + chng
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

function increaseFriend(friend,amt){
  let buddy = bonsaiBot.friends.find(o => o.name == friend)
  buddy.friendLvl = buddy.friendLvl + amt
  if(bonsaiBot.currentBF != getBestFriend()){
    //lastChannel.send(`lol ${getBestFriend().toLowerCase()} you're my new bff bro. bonsai to that! ${bonsaiBot.emoji}`)
    bonsaiBot.currentBF = getBestFriend().toLowerCase()
  }
}

function decreaseFriend(friend,amt){
  let buddy = bonsaiBot.friends.find(o => o.name == friend)
  buddy.friendLvl = buddy.friendLvl - amt
  if(bonsaiBot.currentEnemy != getEnemy()){
    //lastChannel.send(`hey ${getEnemy().toLowerCase()} i've been thinking and i'm kinda pissed at you ngl lol ${bonsaiBot.emoji}`)
    bonsaiBot.currentEnemy = getEnemy().toLowerCase()
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
//silent stat changers
//////////////////////////////////////////////////////////////////
  //check for hate
  for(let i = 0; i < input.silent.hates.length; i++){if(msg.content.toLowerCase().includes(input.silent.hates[i])){
    decreaseFriend(sender,1)
  }}
  //check for like
  for(let i = 0; i < input.silent.likes.length; i++){if(msg.content.toLowerCase().includes(input.silent.likes[i])){
    increaseFriend(sender,1)
  }}
  //check for sin
  for(let i = 0; i < input.silent.sinPromote.length; i++){if(msg.content.toLowerCase().includes(input.silent.sinPromote[i])){
    decreaseStat("faith",1)
    if(bonsaiBot.stats.faith.amt == 25){
      channel.send(`${input.silent.sinPromote[i]}s? what is a ${input.silent.sinPromote[i]}, bro? real question not playing lol`)
    }
  }}
  //check for moral
  for(let i = 0; i < input.silent.faithPromote.length; i++){if(msg.content.toLowerCase().includes(input.silent.faithPromote[i])){
    increaseStat("faith",1)
    if(bonsaiBot.stats.faith.amt == 75){
      channel.send(`${input.silent.faithPromote[i]}? i'm feelin the holy spirit rn bro. ${bonsaiBot.emoji}`)
    }
  }}
  
///////////////////////////////////////////////////////////////
//constant replies
//////////////////////////////////////////////////////////////////
for(let i=0;i<input.constants.length;i++){
   for(let j=0;j<input.constants[i].keywords.length;j++){
     if(msg.content.toLowerCase().includes(input.constants[i].keywords[j])){
      postMsg(input.constants[i].name,sender,channel)
      break
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
  if(postSender == bonsaiBot.currentBF){
    relationship = "bff"
  }
  else if(postSender == bonsaiBot.currentEnemy){
    relationship = "enemy"
    increaseStat("anger",1)
  }
  else{
    relationship = "norm"
  }
  if(respo[keyword][relationship].length != 5){
    if(bonsaiBot.stats.anger >= 4){
      msgIndex = 1
    }
    else{
      msgIndex = 0
    }
  }
  else{
    msgIndex = bonsaiBot.stats.anger.amt
  }
  channel.send(translateMsg(respo[keyword][relationship][msgIndex],postSender))
  if(respo[keyword].statChange.length > 0){
    if(respo[keyword].statChange[0] == "increase"){
      increaseStat(respo[keyword].statChange[1],respo[keyword].statChange[2])
    }
    else if(respo[keyword].statChange[0] == "decrease"){
      decreaseStat(respo[keyword].statChange[1],respo[keyword].statChange[2])
    }
    else{
      if(relationship != "enemy"){
        resetStat(respo[keyword].statChange[1])
      }
    }
  }
}

function translateMsg(msg,postSender){
  let msg1 = msg.replace("EMOJIHERE",bonsaiBot.emoji)
  let msg2 = msg1.replace("NAMEHERECAPS",postSender.toUpperCase())
  let msg3 = msg2.replace("NAMEHERE",postSender)
  return msg3
}

client.login(secrets.token);
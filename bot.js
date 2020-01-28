const secrets = require("./secrets.js")
const bonsaiBot = require('./save/save.json')
const input = require("./input.js")
const emojiList = require("./emoji.json")
const respo = require("./responses.js")
const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');

///////////////////////////////////////////////////////////////
//temporary conditions
//////////////////////////////////////////////////////////////////
let emojiSeek = true
let apologyCount = 0
let rageLock = false

const delay = 600000
let start = Date.now()

let timeout

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
  if(bonsaiBot.stats.anger.amt == 4 && statName == "anger" && rageLock == false){
    start = Date.now()
    rageLock = true
    clearTimeout(timeout)
    theTimeOut()
  }
  changeStatus()
}

function theTimeOut(){
  timeout = setTimeout(function(){
    rageLock = false;
}, delay);
}

function decreaseStat(statName,chng){
  if(statName == 'anger' && rageLock == true){
    console.log("too mad")
  }
  else if(bonsaiBot.stats[statName].amt - chng > -1){
    bonsaiBot.stats[statName].amt = bonsaiBot.stats[statName].amt - chng
  }
  else{
    bonsaiBot.stats[statName].amt = 0
  }
  changeStatus()
}

function resetStat(statName){
  if(statName == 'anger' && rageLock == true){
    console.log("too mad")
  }
  else{
    bonsaiBot.stats.anger.amt = bonsaiBot.stats.anger.default
  }
  changeStatus()
}

function increasePoint(person,amt){
  let buddy = bonsaiBot.friends.find(o => o.name == person)
  buddy.bonsaiPoints += amt
}

function decreasePoint(person,amt){
  let buddy = bonsaiBot.friends.find(o => o.name == person)
  if(buddy.bonsaiPoints - amt < 0){
    buddy.bonsaiPoints = 0
  }
  else{
    buddy.bonsaiPoints = buddy.bonsaiPoints - amt
  }
}

function getPoints(person){
  let buddy = bonsaiBot.friends.find(o => o.name == person)
  return buddy.bonsaiPoints
}

function someoneDied(person){
  bonsaiBot.whoDied.push(person)
  if(bonsaiBot.whoDied.length > 5){
    bonsaiBot.whoDied.shift()
  }
}

function increaseFriend(friend,amt,lastChannel){
  let buddy = bonsaiBot.friends.find(o => o.name == friend)
  let numbro = amt
  if(friend == bonsaiBot.currentBF){
    numbro = amt - 1
  }
  buddy.friendLvl = buddy.friendLvl + numbro
  if(bonsaiBot.currentBF != getBestFriend()){
    bonsaiBot.currentBF = getBestFriend().toLowerCase()
    lastChannel.send(`${bonsaiBot.currentBF} bro i really admire you. you're my emoji-model lol. that's like a role model but... for emojis lol`)
    //emojiSeek = true
  }
  if(bonsaiBot.currentEnemy != getEnemy()){
    lastChannel.send(`getting to know ${friend} has made me realize how unbonsai ${getEnemy().toLowerCase()} is ${bonsaiBot.emoji}`)
    bonsaiBot.currentEnemy = getEnemy().toLowerCase()
  }
}

function decreaseFriend(friend,amt,lastChannel){
  let buddy = bonsaiBot.friends.find(o => o.name == friend)
  let numbro = amt
  if(friend == bonsaiBot.currentBF){
    numbro = amt * 2
  }
  buddy.friendLvl = buddy.friendLvl - numbro
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
    //emojiSeek = true
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

function changeStatus(){
  let gameName = ''
  let urlPlace = ''
  
  switch (bonsaiBot.stats.anger.amt) {
    case 0:
      gameName = "feelin bonsai"
      urlPlace = "https://www.youtube.com/watch?v=VFt7AIArwkc"
      break;
    case 1:
      gameName = "easy like sunday morning lol"
      urlPlace = "https://www.youtube.com/watch?v=3DSVMDmzCcA"
      break;
    case 2:
      gameName = "wanna tell everyone to lighten up iykwim lol"
      urlPlace = "https://www.youtube.com/watch?v=KIYiGA_rIls"
      break;
    case 3:
      gameName = "run fa fa fah away bro lol"
      urlPlace = "https://www.youtube.com/watch?v=O52jAYa4Pm8"
      break;
    case 4:
      gameName = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHH"
      urlPlace = "https://www.youtube.com/watch?v=_C15LZYX6ZY"
      break;
    default:
      gameName = ""
      urlPlace = ""
  }

  client.user.setPresence({
      game: {
          name: gameName,
          type: "STREAMING",
          url: urlPlace
      }
  });
}

client.on('ready', () => {
  client.user.setStatus('available')
  changeStatus()
})

///////////////////////////////////////////////////////////////
//on message recieve
//////////////////////////////////////////////////////////////////
client.on('message', msg => {if(msg.author.username != "BonsaiBro"){
  let killSwitch = false
  let emojiDetected = false
  let emojiUsed = ""
  let foodUsed = ""
  let foodDetected = false
  lastPing++
  const channel = client.channels.find('name', msg.channel.name)
  const sender = msg.author.username.toLowerCase()


  //check for emoji
  for(let e = 0; e < emojiList.length;e++){
    if(msg.content.includes(emojiList[e].emoji)){
      emojiDetected = true
      emojiUsed = emojiList[e].emoji
    }
  }

  //check for food
  for(let e = 0; e < bonsaiBot.food.length;e++){
    if(msg.content.toLowerCase().includes(bonsaiBot.food[e])){
      console.log("detected")
      foodDetected = true
      foodUsed = bonsaiBot.food[e]
    }
  }

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
  
  increasePoint(sender,1)
///////////////////////////////////////////////////////////////
//emoji seek check
//////////////////////////////////////////////////////////////////
if(sender == bonsaiBot.currentBF && emojiSeek == true && (msg.content.indexOf("<:") > -1 || emojiDetected == true)){
  if(msg.content.indexOf("<:") > -1){
    let cutOne = msg.content.indexOf("<:")
    let cutTwo = msg.content.indexOf(">") + 1
    let cutEmoji = msg.content.substring(cutOne,cutTwo);
    bonsaiBot.emoji = cutEmoji
  }
  else{
    bonsaiBot.emoji = emojiUsed
  }
}


///////////////////////////////////
// stuff where the msg is returned
////////////////////////////////////
if(msg.content.toLowerCase().includes(' eat ')){
  let splitUpMsg = msg.content.toLowerCase().split(' ')
  if(splitUpMsg.indexOf('eat')<splitUpMsg.length -1 && bonsaiBot.food.indexOf(splitUpMsg[splitUpMsg.indexOf('eat')+1]) == -1
  && splitUpMsg[splitUpMsg.indexOf('eat')+1] != "bonsai" && splitUpMsg[splitUpMsg.indexOf('eat')+1] != "some" && input.random.indexOf(splitUpMsg[splitUpMsg.indexOf('eat')+1])==-1){
    bonsaiBot.food.push(splitUpMsg[splitUpMsg.indexOf('eat')+1])
  }
}

//death
if(msg.content.includes('who died')){
  //
}
else if(msg.content.toLowerCase().includes('died')){
  if(msg.content.toLowerCase().split(' ').indexOf('died')>0){
    let splitUpMsg = msg.content.toLowerCase().split(' ')
    let indexOfDeath = splitUpMsg.indexOf('died')
    channel.send(`bro... ${splitUpMsg[indexOfDeath - 1]} died?? this is so messed up... i can't handle this... i can't cope! this is NOT bonsai!`)
    someoneDied(splitUpMsg[indexOfDeath - 1])
  }
}
else if(msg.content.toLowerCase().includes('is dead')){
  let splitUpMsg = msg.content.toLowerCase().split(' ')
  let theDead = ""
  for(let i=0;i<splitUpMsg.length;i++){
    if(splitUpMsg[i] == "is" && splitUpMsg[i+1] == "dead" && i > 0){
      theDead = splitUpMsg[i-1]
    }
  }
  if(theDead != ""){
    channel.send(`bro... ${theDead} died?? this is so messed up... i can't handle this... i can't cope! this is NOT bonsai!`)
    someoneDied(theDead)
  }
}
//food
else if(foodDetected == true && (msg.content.toLowerCase().includes(' not food') || msg.content.toLowerCase().includes(" isn't food") 
|| msg.content.toLowerCase().includes(" isnt food") || msg.content.toLowerCase().includes(" aren't food") || msg.content.toLowerCase().includes(" arent food"))){
  channel.send(`wait... you're telling me ${foodUsed} isn't food? this is so messed up bro... i've been snacking on ${foodUsed} all day...`)
  bonsaiBot.food.splice(bonsaiBot.food.indexOf(foodUsed),1);
}
else if(foodDetected == true){
  channel.send(`bro, ${foodUsed}?? you gonna eat that? i'm really hungry i'd love to chow down on some ${foodUsed}!`)
}
//spoilers
else if((msg.content.match(/\u007C\u007C/g) || []).length == 2){
  if(getRandom(10) == 1){
    let spoilerIsolate = msg.content.split("||")[1]
    channel.send(`bro... what the heck are you talking about? "${spoilerIsolate}"?? could you help a bro out, PLEASE?`)
  }
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
  let lowerMsg = msg.content.toLowerCase()
  let cleanMsg = lowerMsg.replace(/[^\w\s]/gi, '')
  let broDetect = false
  if(cleanMsg.includes("bro")){
    broDetect = true
  }
  for(let i=0;i<input.constants.length;i++){
    for(let j=0;j<input.constants[i].keywords.length;j++){
      if(cleanMsg.includes(input.constants[i].keywords[j])&&killSwitch == false){
          if(input.constants[i].needbro == false || broDetect == true){
            postMsg(input.constants[i].name,sender,channel)
            killSwitch = true
          }
      }
    }
  }
}

///////////////////////////////////////////////////////////////
//random replies
//////////////////////////////////////////////////////////////////
if(killSwitch == false){
  for(let i=0;i<input.random.length;i++){
    if(msg.content.toLowerCase().includes(input.random[i])){
      let random = getRandom(6)
      if(sender == getEnemy() && random != 2){
        random = getRandom(3) 
      }
      if(random == 2){
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
  //shop check
  if(keyword == "bonsai"){
    //cancels out initial increase
    decreasePoint(postSender,1)
    if(getPoints(postSender) < respo[keyword].energyCost){
      channel.send(postSender + "... my bro.... you don't have enough bonsai energy to give me your strength. relax my bro")
    }
    else{
      channel.send(translateMsg(respo[keyword][relationship][msgIndex],postSender))
      increaseFriend(postSender,2,channel)
      decreasePoint(postSender,respo[keyword].energyCost)
      increaseStat(respo[keyword].statChange[1],respo[keyword].statChange[2])
      bonsaicheck(channel)
    }
    saveProg()
  }
  else if(keyword == "vibeCmd"){
    decreasePoint(postSender,1)
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
  else if(keyword == "flipCoin"){
    if(relationship == "enemy"){
      channel.send(respo[keyword][relationship][msgIndex])
    }
    else{
      let coin = getRandom(50)
      if(bonsaiBot.stats.anger.amt <4){
        if(coin < 24  ){
          channel.send("tails bro lol")
        }
          else if(coin < 49){
            channel.send("heads bro")
        }
          else{
            channel.send("bro i dropped it wtf lol")
        }
      }
      else{
        if(coin < 25  ){
          channel.send("BRO WHAT YOU TRYING TO STEAL MY COINS NOW?")
        }
          else if(coin < 50){
            channel.send("WHO CARES BRO LEAVE ME BE")
        }
      }
    }
  }

  else if(keyword == "friendChk"){
    decreasePoint(postSender,1)
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

  else if(keyword == "pointCheck"){
    decreasePoint(postSender,1)
    if(relationship == "enemy"){
      channel.send(respo[keyword][relationship][msgIndex])
    }
    else{
      let friendsList = ``
      for(let z=0;z<bonsaiBot.friends.length;z++){
        if(typeof bonsaiBot.friends[z].bonsaiPoints == 'undefined' || bonsaiBot.friends[z].bonsaiPoints < 0 || bonsaiBot.friends[z].bonsaiPoints == null || bonsaiBot.friends[z].bonsaiPoints == NaN){
          bonsaiBot.friends[z].bonsaiPoints = 50
        }
        friendsList += 
`${bonsaiBot.friends[z].name}: ${bonsaiBot.friends[z].bonsaiPoints}
`
      }
      saveProg()
      channel.send(friendsList)
    }
  }
  else if(keyword == "whoDied"){
    channel.send(`it's been... it's been a very sad year for death bro...`)
    for(let i=0;i<bonsaiBot.whoDied.length;i++){
      channel.send(`${bonsaiBot.whoDied[i]}...`)
    }
    channel.send(`all up in heaven bonsai'ing with the great ape in the sky...`)
    channel.send(`not a day has gone by i don't think of the bros we lost... BONSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI!`)
  }
  else if(keyword == "sorry"){
    let buddy = bonsaiBot.friends.find(o => o.name == postSender)
    if(buddy.friendLvl >= 0 && apologyCount < 5 && bonsaiBot.stats.anger.amt < 4){
      channel.send(`no need to apologize bro we're just living the bonsai lifestyle lol`)
      apologyCount++
    }
    else if(buddy.friendLvl >= 0 && apologyCount < 5 && bonsaiBot.stats.anger.amt == 4){
      channel.send(`WELL WHATEVER DUDE! I'M PISSED NOW! SORRY ISN'T GONNA CUT IT BRO! I'M RAGIN'! I'VE GONE APE! I'M LIVID! YOU THINK YOU CAN FIX ALL THIS JUST BY SAYING SORRY?? BRO! BRO! BRO! NO! EEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHH!!!`)
      apologyCount++
    }
    else if(buddy.friendLvl >= 0 && apologyCount >= 5){
      channel.send(`BRO WTF WHY IS EVERYONE APOLOGIZING TO ME FOR NO REASON?? BRO YOU THINK I'M THAT INSECURE?? WELL NOW I'M PISSED NICE GOING BRO`)
      increaseStat('anger',4)
      apologyCount = 0
    }
    else if(buddy.friendLvl < 0 && bonsaiBot.stats.anger.amt == 4){
      channel.send(`I`)
      channel.send(`DON'T`)
      channel.send(`FOR`)
      channel.send(`GIVE`)
      channel.send(`YOU`)
      channel.send(`BRO`)
    } 
    else{
      channel.send(`real talk? i was hopig you would apologize... this means a lot to me bro, but not in a weird way lol ${bonsaiBot.emoji}`)
      increaseFriend(postSender,5,channel)
    }
  }
  else if(keyword == "relaxCmd" && rageLock == true){
    const elapsed = Date.now() - start;
    const remaining = Math.floor((delay - elapsed)/1000); // divide by 1000 for seconds
    channel.send("RELAX!? I'M NOT READY TO RELAX!")
    channel.send("AAAAAAAAAAAAAAAAAAAAAAAAAHHH")
    channel.send("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHH")
    channel.send("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHH")
    channel.send("I NEED AT LEAST " + remaining + " MORE SECOOOOOOONDS TO CHILL THE EFF DOWN BRO!!!!!!")
  }
  else{
  channel.send(translateMsg(respo[keyword][relationship][msgIndex],postSender))
  }
  //status changes
  if(respo[keyword].statChange.length > 0){
    if(respo[keyword].statChange[0] == "increase" && respo[keyword].statChange[1] != "bonsai"){
        increaseStat(respo[keyword].statChange[1],respo[keyword].statChange[2])
        bonsaicheck(channel)
        decreaseFriend(postSender,1,channel)
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
    channel.send("...")
    channel.send("...")
    channel.send("I am.... both metaphorically and physically... reborn" + bonsaiBot.emoji)
    bonsaiBot.stats.bonsai.amt = 0
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
  let bonus = ""
  if(getRandom(50) == 25){
    bonus = "(bernie voice) "
  }
  let msg1 = msg.replace("EMOJIHERE",bonsaiBot.emoji)
  let msg2 = msg1.replace("NAMEHERECAPS",postSender.toUpperCase())
  let msg3 = msg2.replace("NAMEHERE",postSender)
  return bonus + msg3
}

client.login(secrets.token);
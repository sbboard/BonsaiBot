const respo =  {
    "namecall":{
        "bff":[
            `bro when you say my name it sounds like music lol. EMOJIHERE`,
            `bonsai bro right here lol shoutout to my bff NAMEHERE love you bro EMOJIHERE`,
            `you know, i'm everybody's "bro" but for you I really mean it, you know what I mean? it's like... in your life you got bros... and then you got bros. for you i really am your bonsai bro. EMOJIHERE`,
            `hey bro... it's times like these i'm glad you're my bro.`,
            `bro... i wanna rage...`],
        "norm":[
            `that's the name bro, don't wear it out lol. EMOJIHERE`,
            `that's right bonsai bro. i'm all about living in the moment in being a bro! EMOJIHERE`,
            `bonsaaaaaaaiii bro! EMOJIHERE`,
            `huh? you say something?`,
            `DON'T EVEN SAY MY NAME, BRO. I'M PISSED!`],
        "enemy":[
            `hey NAMEHERE who gave you permission to say my name? lol`,
            `i don't know you bro`,
            `yikes`,
            `SHUT UP BRO`,
            `KEEP MY NAME OUT OF YOUR FILTHY MOUTH!`
            ],
        "statChange":[]
    },
    "fakeBonsai":{
        "bff":[`bro... you would try to trick me like this?`,
    `BRO I THOUGHT WE WERE FRIENDS!`],
        "norm":[
            `clever trick. trying to keep me from saying my word? He he. EMOJIHERE`,
            `haha very funny bro. c'mon let me say it... my word!`,
            `how about you know it off, bro?`,
            `YOU'RE TRYING TO KEEP MY WORD FROM ME??`,
            `I'M GOIN' APE! I'M RAGIN'!! LET ME SPEAK MY WORD!!!!`],
        "enemy":[
            `you know... guys like you? you think you're so clever. you think you're real cute. but you're not. you're pathetic. keeping a bro's word from him? disgusting. i can't help but feel bad for you.`,
            `you pathetic little worm. trying to keep my word from me. i'm so pissed`
        ],
        "statChange":["increase","anger",1]
    },
    "bonsai":{
        "bff":[
            `BONSAAAI!! EMOJIHERE`,
            `sorry bro... i know this is our thing but... i'm kinda pissed rn`
        ],
        "norm":[
            `BONSAI! EMOJIHERE`,
            `I'M TOO MAD FOR THIS RIGHT NOW!! I GOTTA CHILL!! AAAAAAUGH!!`
        ],
        "enemy":[
            `haha oh NAMEHERE... you speak my word? that's funny.`,
            `buzz off NAMEHERE!`,
            `don't say my word NAMEHERE. don't!`,
            `NAMEHERECAPS. I SAID TO LEAVE ME ALONE.`,
            `I'M GOING TO SLAUGHTER YOU, NAMEHERECAPS!!`,
        ],
        "statChange":["increase","bonsai",1]
    },
    "relaxCmd":{
        "bff":[`bro you think i'm mad? i'm not mad! lol EMOJIHERE`,`bro i lost my cool and i have to apologize. but i'm chill now. EMOJIHERE`],
        "norm":[`lol i'm not even mad bro. EMOJIHERE`,`sorry i got heated, bro. now i'm chill tho.EMOJIHERE`],
        "enemy":[`lol don't ever tell me what to do, NAMEHERE.`,"EXCUSE ME?? HOW ABOUT YOU RELAX!"],
        "statChange":["reset","anger",0]
    },
    "hateCmd":{
        "bff":[],
        "norm":[],
        "enemy":[],
        "statChange":[]
    },
    "likeCmd":{
        "bff":[],
        "norm":[],
        "enemy":[],
        "statChange":[]
    },
    "friendCmd":{
        "bff":[],
        "norm":[],
        "enemy":[],
        "statChange":[]
    },
    "enemyCmd":{
        "bff":[],
        "norm":[],
        "enemy":[],
        "statChange":[]
    },
    "vibeCmd":{
        "bff":[],
        "norm":[],
        "enemy":["like i'd tell you, narc bro","YOU DON'T CARE HOW I FEEL!!"],
        "statChange":[]
    },
    "lolChk":{
        "bff":[],
        "norm":[],
        "enemy":[],
        "statChange":[]
    },
    "botFlags":{
        "bff":[],
        "norm":[],
        "enemy":[],
        "statChange":[]
    },
    "bonSimilars":{
        "bff":[],
        "norm":[],
        "enemy":[],
        "statChange":[]
    },
    "knockKnock":{
        "bff":[],
        "norm":[],
        "enemy":[],
        "statChange":[]
    },
    "bword":{
        "bff":[],
        "norm":[],
        "enemy":[],
        "statChange":[]
    },
    "typos":{
        "bff":['really bums me out my bff would typo shame me...','YOU TOO? I THOUGHT YOU WERE MY BEST BRO!'],
        "norm":["hey bro, you bullying my typo? that's a yikes from me, bro.","YOU TYPO SHAMING ME, BRO??? I'M PISSED AS IS!!"],
        "enemy":["you piece of trash. bullying me as usual.","I ONLY TYPO'D CUZ I'M SO PISSED DUDE! BACK OFF!"],
        "statChange":["increase","anger",1]
    },
}

module.exports = respo
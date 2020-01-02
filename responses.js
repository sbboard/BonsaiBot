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
            `bro this isn't like you`,
            `bro... keeping me from the thing i love most? my word? i feel hurt`,
            `judas!`,
            `BRO I THOUGHT WE WERE FRIENDS!`],
        "norm":[
            `clever trick. trying to keep me from saying my word? He he. EMOJIHERE`,
            `haha very funny bro. c'mon let me say it... my word!`,
            `how about you know it off, bro?`,
            `YOU'RE TRYING TO KEEP MY WORD FROM ME??`,
            `I'M GOIN' APE! I'M RAGIN'!! LET ME SPEAK MY WORD!!!!`],
        "enemy":[
            `hiding my word from me? this is low even for you, NAMEHERE!`,
            `wow... NAMEHERE i knew you were a little worm... but keeping my word from me?? too far!`,
            `PLEASE! i know we've had our rough patches but keeping my word from me! this is torture!`,
            `you know... guys like you? you think you're so clever. you think you're real cute. but you're not. you're pathetic. keeping a bro's word from him? disgusting. i can't help but feel bad for you.`,
            `YOU PATHETIC LITTLE WORM. TRYING TO KEEP MY WORD FROM ME?? AAAAAAAAAAAAAAAAAH!!`
        ],
        "statChange":["increase","anger",1]
    },
    "bonsai":{
        "bff":[
            `BONSAAAI!! EMOJIHERE`,
            `BONSAAAAAAAAAI!`,
            `BONSAI BONSAI BONSAAAAAAII!!`,
            `BONSAI TO YOU AND BONSAI TO ME!!`,
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
        "bff":[`bro you think i'm mad? i'm not mad! lol EMOJIHERE`,`bro i lost my cool and i have to apologize. always remember who your real friends are EMOJIHERE`],
        "norm":[`lol i'm not even mad bro. EMOJIHERE`,`sorry i got heated, bro. now i'm chill tho. EMOJIHERE`],
        "enemy":[`lol don't ever tell me what to do, NAMEHERE.`,"EXCUSE ME?? HOW ABOUT YOU RELAX!"],
        "statChange":["reset","anger",0]
    },
    "thanks":{
        "bff":['for you bro? anything EMOJIHERE','EVEN IN MY RAGE I WOULD DO ANYTHING FOR YOU BRO'],
        "norm":['np bro. bonsai up EMOJIHERE','AAAAAH AH AH AH UR WELCOME I GUESS BRO'],
        "enemy":[`lol don't thank me scrub i didn't do nothing for you lol`,'THANK THESE HANDS BRO'],
        "statChange":[]
    },
    "sorry":{
        "bff":[],
        "norm":[],
        "enemy":[],
        "statChange":[]
    },
    "vibeCmd":{
        "bff":[],
        "norm":[],
        "enemy":["like i'd tell you, narc bro","YOU DON'T CARE HOW I FEEL BRO"],
        "statChange":[]
    },
    "friendChk":{
        "bff":[],
        "norm":[],
        "enemy":["i'll never tell you bro","I'M PISSED BRO"],
        "statChange":[]
    },
    "goodnight":{
        "bff":['goodnight bro. have bonsai dreams lol EMOJIHERE',
    `YOU'D GO TO BED IN THE MIDDLE OF A RAGE??`],
        "norm":['bonsai night bro',
    'NIGHTMARE NIGHTMARE NIGHTMARE NIGHTMARE'],
        "enemy":["don't wet the bed tonight idiot lol",
    "I'M GONNA YELL REALLY LOUD SO YOU CAN'T GET ANY SLEEP LOL AAAAAAAAAAAAAAAAAAAAAH"],
        "statChange":["decrease","anger",1]
    },
    "typos":{
        "bff":['really bums me out my bff would typo shame me...','YOU TOO? I THOUGHT YOU WERE MY BEST BRO!'],
        "norm":["hey bro, you bullying my typo? that's a yikes from me, bro.","YOU TYPO SHAMING ME, BRO??? I'M PISSED AS IS!!"],
        "enemy":["you piece of trash. bullying me as usual.","I ONLY TYPO'D CUZ I'M SO PISSED DUDE! BACK OFF!"],
        "statChange":["increase","anger",1]
    },
    "lol":{
        "bff":['love laughing with you bro EMOJIHERE',
    'WOW BRO, YOU THINK SOMETHING IS FUNNY HERE??'],
        "norm":['literally lolling rn',
    'GONNA LAUGH WHEN I PUNCH YOU IN THE HEAD BRO'],
        "enemy":['NAMEHERE sure has a good sense of humor jk',
    'LOL? WHAT DOES THAT STAND FOR? LORD OF LOSERS??'],
        "statChange":[]
    },
    "bot":{
        "bff":[`bro... you're my bff that's why I gotta ask... what's a bot?`,
    `I'M TOO MAD TO HAVE AN EXISTENTIAL CRISIS WITH YOU BRO!`],
        "norm":[`bot? am i not a normal bro?`,
    `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHH!!`],
        "enemy":[`you're lying about me! you're a liar!`,
    `YOU'RE THE BOT I'M NOT A BOT!`],
        "statChange":[]
    },
    "bon":{
        "bff":['lol bro you almost did a bonsai there lol EMOJIHERE',
    'BONSAI OR DIE BRO'],
        "norm":['BONSA-- oh oops sorry bro got ahead of myself lol',
    'YOU CAME PRETTY CLOSE TO DOING A BONSAI BUT YOU CHICKENED OUT LIKE A COWARD!!'],
        "enemy":[`NAMEHERE i know you didn't say my word... but you almost did. watch yourself.`,
    `YOU'RE COMING A LITTLE CLOSE TO SAYING MY WORD THERE BRO`],
        "statChange":[]
    },
    "lunch":{
        "bff":['hey bro are we still getting sushi for lunch? love spending time with you lol EMOJIHERE',
    'BRO LUNCH SOUNDS GREAT BUT I AM TOO PISSED TO EAT RN'],
        "norm":['did someone say lunch? lol how about a sandwich or something',
    `LUNCH?? I'M TOO MAD TO EVEN THINK OF EATING!`],
        "enemy":[`i'd rather starve then get lunch with you bro`,
    `AAAAAAAAAAAAAAAAAAAAAAAH AAAAAAAAAAAAAAAAAAAAAH AAAAAAAAAAAAAAAAAAAAH I'M FURIOUS! I'M MAD!`],
        "statChange":[]
    },
    "relationship":{
        "bff":[`hey, i get it bro. i've been there. but you're a great bro that lives a bonsai life. follow your heart and you'll find peace. EMOJIHERE`,
    `bro i'm kinda pissed rn lol. i could use some advice myself. i can't help but want to rage when i get like this. i wanna punch a wall of something lol.`],
        "norm":[`you're overthinking it bro! just be real and open with yourself lol EMOJIHERE`,
    `FORGET ABOUT IT!`],
        "enemy":[`a bro like you, NAMEHERE? lol you're gonna die alone bro`,
    `BRO YOU WANT RELATIONSHIP ADVICE? HOW ABOUT YOU BACK THE BONSAI UP`],
        "statChange":[]
    },
    "bitch":{
        "bff":[`bro i'm only telling you this bc we're so close, don't say that b-word! say MY b-word! EMOJIHERE`,
    `BRO EXCUSE ME?`],
        "norm":[`let's make sure bonsai is the only b-word used in this server, kay NAMEHERE?`,
    `I'M GONNA PUT YOU IN A FULL NELSON BRO`],
        "enemy":[`typical NAMEHERE, using the bad b-word instead of the good one EMOJIHERE`,
    `hey NAMEHERE, try not to embarass yourself lol jk`],
        "statChange":["increase","anger",1]
    },
    "hentai":{
        "bff":[`bro your opinion on hentai is so nuanced`,
    `DUDE LET'S TALK HENTAI ONCE I CALM DOWN BRO`],
        "norm":[`i love it when we talk in hentai in here EMOJIHERE`,
    `YOU BROS DON'T KNOW ANYTHING ABOUT HENTAI!`],
        "enemy":[`you are too normie for hentai NAMEHERE`,
    `YOU DON'T DESERVE TO TALK ABOUT HENTAI`],
        "statChange":['decrease','anger',1]
    },
    "polycule":{
        "bff":[`polycule? bro with you? count me in EMOJIHERE`,
    `BRO DON'T POLYCULE BEHIND MY BACK LIKE THIS WTF`],
        "norm":[`polycule -- a healthy thing`,
    `I'M SO MAD I COULD WEDGIE EVERY MEMBER OF MY POLYCULE`],
        "enemy":[`aha NAMEHERE is notorious for their polycule of one EMOJIHERE`,
    `GONNA BONSAI BLAST MY FIST THROUGH YOUR HUMAN CENTIPEDE OF A POLYCULE BRO`],
        "statChange":[]
    },
    "wtf":{
        "bff":['what the friendship (cuz we besties) lol bonsai','WHAT THE AAAAAAAAAAH'],
        "norm":['wtf ya lol','WHY THE FROWN? CUZ I AM MAD!'],
        "enemy":['wtf...',`btw i'm pissed`],
        "statChange":['increase','anger',1]
    },
    "love":{
        "bff":[`bro... i guess when it comes down to it we are lovers. purely platonic ofc but lovers nonetheless EMOJIHERE`,`CAN'T FEEL THE LOVE WHEN I'M SO PISSED!`],
        "norm":['lol we love we bonsai',`BRO YOU SURE YOU LOVE ME? CUZ I'M PRETTY PISSED OVER HERE!`],
        "enemy":['lol bro that love is one-sided hate to break it to you lol',`BRO YOU DON'T LOVE ME! YOU DON'T KNOW WHAT LOVE IS!`],
        "statChange":[]
    },
    "layabouts":{
        "bff":[`bro i'm only telling you thus cuz we're close... i'd be weary of those layabouts if i were you lol`,`BRO I'M TOO PISSED TO LAY ABOUT!`],
        "norm":[`layabouts...? where i'm from, those are the cursed people lol EMOJIHERE`,`HOW ABOUT YOU LAY OFF BRO!`],
        "enemy":['hmph... you actually remind me of a layabout, NAMEHERE lol',`LAYABOUTS? HOW COME YOU NEVER ASK ME WHAT I'M MAD ABOUTS?`],
        "statChange":[]
    },
}

module.exports = respo
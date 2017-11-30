const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const os = require("os");
const got = require('got');
const fs = require('fs');
const db = require('quick.db');
var xkcd = require('xkcd-imgs');
var isPrime = require('prime-number');
const ytdl = require('ytdl-core');
const getImage = require("first-image-search-load");
const exec = require('exec');
var catMe = require('cat-me');
const translate = require('google-translate-api');
const sleep = require('system-sleep');
var http = require('http');
const speedTest = require('speedtest-net');
var PastebinAPI = require('pastebin-js');
pastebin = new PastebinAPI('2ce0278e88720e6aaa70bcda9a871fc3');
var weather = require('weather-js');
var figlet = require('figlet');
var giphy = require( 'giphy-api' )( 'JeHK10ZBmNg72Fe676NUOOHVtvKX2doG' );
var anti_spam = require("discord-anti-spam");
const cydia = require('cydia-api-node');
var lngDetector = new (require('languagedetect'));
const Cleverbot = require('maycon-cleverbot');
const ud = require('urban-dictionary');
var google = require('google');
var Twitter = require('twitter');
var twitterClient = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token_key,
    access_token_secret: config.access_token_secret
});
google.resultsPerPage = 1;
const cleverbot = new Cleverbot();
var opts = {
    maxResults: 10,
    key: 'AIzaSyAI-Xk1xZmKMg8UmFLdRgZahbpMMAzQWW0'
};

const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, message) => {
    // ejs render automatically looks in the views folder
    message.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});
 // pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
    http.get('http://olijs.herokuapp.com');
}, 300000);


let templates = [];

got('https://memegen.link/templates/').then(res => {
    let data = JSON.parse(res.body);
    templates = [];
    let promises = [];
    for (let key in data) {
        promises.push(_loadMeme(data[key]));
    }

    Promise.all(promises).then(() => {
        templates = templates.filter(e => !!e);
        templates.sort((a, b) => a.name.localeCompare(b.name));
    }).catch(console.error);

    console.log("Finished loading meme templates.");
}).catch(console.error);

function _loadMeme(url) {
    return got(url).then(res => {
        let singleData = JSON.parse(res.body);

        templates.push({
            name: url.replace(/https\:\/\/memegen\.link\/api\/templates\/(.*)/, '$1'),
            url: url.replace('/api/templates', ''),
            styles: singleData.styles
        });
    });
}

function getMeme(name) {
    return templates.find(m => m.name.toLowerCase() === name.toLowerCase());
}

function cleanInput(input) {
    if (!input) return '';
    return input.replace(/"/g, '\'\'').replace(/\#/g, '~h')
        .replace(/\-/g, '--').replace(/\_/g, '__')
        .replace(' ', '_').replace(/\?/g, '~q')
        .replace(/\%/g, '~p').replace(/\//g, '~s');
}



function toBin(str) {
    var st, i, j, d;
    var arr = [];
    var len = str.length;
    for (i = 1; i <= len; i++) {
        //reverse so its like a stack
        d = str.charCodeAt(len - i);
        for (j = 0; j < 8; j++) {
            arr.push(d % 2);
            d = Math.floor(d / 2);
        }
    }
    //reverse all bits again.
    return arr.reverse().join("");
}



function fromBin(str) {
    if (str.match(/[10]{8}/g)) {
        var wordFromBinary = str.match(/([10]{8}|\s+)/g).map(function (fromBinary) {
            return String.fromCharCode(parseInt(fromBinary, 2));
        }).join('');
        return wordFromBinary;
    }
}

function to64(str) {
    return new Buffer(str).toString('base64');
}

function from64(str) {
    return new Buffer.from(str, 'base64').toString();
}

String.prototype.toHHMMSS = function () { //get uptime, just add 
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}

client.on("ready", (guild) => {  
    //client.user.setAvatar('https://i.imgur.com/0kWO4WS.png');
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    //client.user.setGame(`on ${client.guilds.size} servers`);
    client.channels.get("362637152946880532").send( {
        embed: {
            color: 0xff0000,
            description: `<@${config.owner}>, i'm up.\nMy prefix is '${config.prefix}'`,
            timestamp: new Date()
        }
    });




});
/* GUILD ADD START */
client.on('guildMemberRemove', member => {
    let guild = member.guild;
    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Someone left!',
      `${member.user} is in a better place now! :neutral_face: `)
      member.sendEmbed(embed);
});

client.on('guildMemberAdd', member => {
	let guild = member.guild;
	member.send(`Welcome, ${member}!\n Welcome to World of Randomness.\n Please read #welcome to get an idea of what we are doing here.\n As the next step, you can choose your class:\n Snek, Cate, Squirrel, Birb or Doge?\n You can also choose your own colour. Just let us know and we'll get it for you.\n If you have a problem with the server or a person on the server, please tell our Admins.\n If you have a problem in your life, the Doc is here for you. Have fun!\n https://i.imgflip.com/1y0jwo.gif`);
});
/* GUILD ADD END */

client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setGame(`on ${client.guilds.size} servers`);
});

for (var i in client.guilds) {
    i.createInvite();
}

client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("message", async message => {

    let usedCommand = false;

    if (message.content.includes("aab")) {
        message.channel.send(":goat:");
	}

	if (message.content.includes("good bot") && message.mentions.users.first().bot) {

		if (db.fetchObject("hasUsedGoodBotToday" + message.author.id).value == "true") console.log("Stopped because user voted."); sendEmbedded(null, "You've already voted in the last 12 hours."); return;

		console.log("good bot detected");
		//console.log(message.mentions.users.first().id)
		db.updateValue("good_bot_count" + message.mentions.users.first().id, 1);

		db.updateText("hasUsedGoodBotToday" + message.author.id, "true")

		setTimeout(() => {
			db.updateText("hasUsedGoodBotToday" + message.author.id, "false")
		}, 43200000)
	}

    if (message.author.bot || message.channel.type == "dm") return; //don't answer other bots' messages    


    
    if (message.content.includes("discord.gg/")) {
        message.reply("don't send invite link. banne");
        message.delete();
        console.log(`${message.author} sent an invite link. banne`);
    }

    if (message.author.bot || message.channel.type == "dm") return;

    if (message.content.indexOf(config.prefix) !== 0) return; //only check for messages with prefix

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
    function sendEmbedded(color, content) { //embed with color, if color == null, generate random color
        if (color == null) {
            color = Math.floor(Math.random() * 16777214) + 1;
        }
        message.channel.send({
            embed: {
                color: color,
                description: content,
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: `oliveJS`
                }
            }
        });
    }



	if (command == "goodbot") {
		db.fetchObject("good_bot_count" + message.mentions.users.first().id).then((i) => {
			sendEmbedded(null, `<@${message.mentions.users.first().id}> has ${i.value} votes for good bot`);
        })
        usedCommand = true;
	}

    if (command == "quote") {
        message.delete();
        console.log("executed command quote");
        if (!args[0]) return message.reply('Please provide a valid message ID.')
        try {
            message.channel.fetchMessage(args[0]).then(message => {
                const embed = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setAuthor(message.author.tag)
                    .setDescription(message.content)
                    .setFooter(message.createdAt)
                message.channel.send({ embed })
            })
        } catch (error) {
            return message.reply('That message could not be found.')
        }
        usedCommand = true;
    }

    if (command == "aes") {
        message.delete();
        sendEmbedded(null, args.join(" ").split('').join(' '));
        usedCommand = true;
    }

    if (command == "isprime") {
        message.delete();
        try {
            sendEmbedded(null, isPrime(parseInt(args.join(" "))));            
        } catch (err) {
            sendEmbedded(null, JSON.stringify(err));
        }
        usedCommand = true;
    }

    if (command == "clever") {
        message.delete();
        console.log("clever request sent");
        const m = await message.channel.send(":arrows_counterclockwise:");
        cleverbot.request(args.join(" ")).then(function(response) {
            message.channel.send({embed: {
                color: 3447003,
                author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL
                },
                title: "CleverBot",
                url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                fields: [
                {
                    name: "Input:",
                    value: args.join(" ")
                },
                {
                    name: "Output:",
                    value: response
                }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "oliveJS"
                }
              }
            });
        });
        m.delete();
        usedCommand = true;
    }

    if (command == "xkcd") {
        message.delete();
        xkcd.img(function(err, res){
            if(err) {
                sendEmbedded(null, err);
            }
            message.channel.send(res.url);
        });
        usedCommand = true;
    }

    if (command == "ud") {
        ud.term(args.join(" "), function (error, entries, tags, sounds) {
            if (error) {
              sendEmbedded(null, error.message)
            } else {
                message.channel.send({embed: {
                    color: 3447003,
                    author: {
                      name: client.user.username,
                      icon_url: client.user.avatarURL
                    },
                    title: "Urban Dictionary",
                    url: "https://www.urbandictionary.com/",
                    fields: [
                    {
                        name: `Definition for "${entries[0].word}"`,
                        value: `${entries[0].definition}`
                    },
                    {
                        name: `Example`,
                        value: `${entries[0].example}`
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: "oliveJS"
                    }
                  }
                });
            }
        });
        usedCommand = true;
    }

    if (command == "udspeed" && message.author == "<@267407075905110016>") {
        var mess = await message.channel.send(":arrows_counterclockwise:");
        const sppedTest = speedTest({maxTime: 5000});        
        sppedTest.on('data', data => {
            message.channel.send({embed: {
                color: 3447003,
                author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL
                },
                title: "Speed Test",
                url: "http://www.speedtest.net/",
                fields: [
                {
                    name: "Download Speed",
                    value: `${data.speeds.download} mbits/s`
                },
                {
                    name: "Upload Speed",
                    value: `${data.speeds.upload} mbits/s`
                },
                {
                    name: "Average Ping",
                    value: `${Math.round(data.server.ping)}ms`
                }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "oliveJS"
                }
              }
            });
            mess.delete();            
        });
        usedCommand = true;
    }

    /*
    if (command == "image") {                                                               //TODO: Fix this.
        //var image = await getImage.getFirstImageURL(args.join(" "));
        message.channel.send(await getImage.getFirstImageURL(args.join(" ")));
    }
    */

    if (command == "dog") {
        message.delete();
        var imageArray = await getImage.getImagesArray("dog");
        message.channel.send(imageArray[Math.floor(Math.random() * imageArray.length) + 0 ]);
        usedCommand = true;
    }

    if (command == "birb") {
        message.delete();
        var imageArray = await getImage.getImagesArray("bird");
        message.channel.send(imageArray[Math.floor(Math.random() * imageArray.length) + 0 ]);
        usedCommand = true;
    }

    if (command == "cate") {
        message.delete();
        message.channel.send('```\n' + catMe() + '```');
        usedCommand = true;
    }

    if (command == "coin") {
        message.delete();
        var coin = Math.floor(Math.random() * 2) + 1;
        if (coin == 1) {
            sendEmbedded(null, "Flipped coin and landed on: tails.");
        } else {
            sendEmbedded(null, "Flipped coin and landed on: heads.");
        }
        usedCommand = true;
    }

    if (command == "translate") {
        message.delete();
        const languages = require("./languages.json");
        if (!args.join(" ")) {
            sendEmbedded(null, '```\n' + JSON.stringify(languages, null, 1).replace('{', '').replace('}', '') + '```');            
        } else if (args[0] == "list") {
            sendEmbedded(null, '```\n' + JSON.stringify(languages, null, 1).replace('{', '').replace('}', '') + '```');
        } else {
            if (args[0] == "auto") {
                translate(args.join(" ").replace(args[0], '').replace(args[1], ''), {from: args[0], to: args[1]}).then(res => {
                    message.channel.send({embed: {
                        color: 3447003,
                        author: {
                          name: client.user.username,
                          icon_url: client.user.avatarURL
                        },
                        title: "Translate",
                        url: "https://translate.google.com/",
                        fields: [
                        {
                            name: "Auto Detection",
                            value: `Language detected: ${res.from.language.iso}`
                        },
                        {
                            name: "Input:",
                            value: `${args.join(" ").replace(args[0], '').replace(args[1], '')}`
                        },
                        {
                            name: "Output:",
                            value: `${res.text}`
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                          icon_url: client.user.avatarURL,
                          text: "oliveJS"
                        }
                      }
                    });
                }).catch(err => {
                    var erorEmbed = '```\n' + err + '```';
                    sendEmbedded(null, erorEmbed);
                });
            } else {
                translate(args.join(" ").replace(args[0], '').replace(args[1], ''), {from: args[0], to: args[1]}).then(res => {
                    message.channel.send({embed: {
                        color: 3447003,
                        author: {
                          name: client.user.username,
                          icon_url: client.user.avatarURL
                        },
                        title: "Translate",
                        url: "https://translate.google.com/",
                        fields: [
                        {
                            name: "Input:",
                            value: `${args.join(" ").replace(args[0], '').replace(args[1], '')}`
                        },
                        {
                            name: "Output:",
                            value: `${res.text}`
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                          icon_url: client.user.avatarURL,
                          text: "oliveJS"
                        }
                      }
                    });
                }).catch(err => {
                    var erorEmbed = '```\n' + err + '```';
                    sendEmbedded(null, erorEmbed);
                });
            }
        }
        usedCommand = true;
    }

    if (command == "google") {
        google(args.join(" "), function (err, res){
            if (err) console.error(err)
            
            var link = res.links[0];
            message.channel.send({embed: {
                color: 3447003,
                author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL
                },
                title: "Google",
                url: "https://google.com/",
                fields: [
                {
                    name: "Top Result",
                    value: `${link.title + ' - ' + link.href}\n${link.description + "\n"}`
                }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "oliveJS"
                }
            }});
        })
        
        usedCommand = true;
    }


    if (command == "cydia") {
        message.delete();
        cydia.getAllInfo(args.join(" ")) //Use the package name or the display name. Case-insensitive
        .then(info => {
            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: `Cydia - Information for ${args.join(" ")}`,
                    fields: [{
                        name: `Package name`,
                        value: info.name,
                        inline: true
                    },
                    {
                        name: "Section",
                        value: `${info.section}`,
                        inline: true
                    },
                    {
                        name: "Summary",
                        value: info.summary,
                        inline: true
                    },
                    {
                        name: "Version",
                        value: info.version
                    },
                    {
                        name: "Price",
                        value: `$${info.price}`,
                        inline: true
                    },
                    {
                        name: "Repo",
                        value: info.repo.name,
                        inline: true
                    },
                    {
                        name: "Link",
                        value: `${info.repo.link}`
                    } //test
                    ],
                    footer:
                    {
                        value: `Requested by ${message.author}`,
                        icon_url: client.user.avatarURL,
                    },
                    timestamp: new Date()                
                }
            });
        });
        usedCommand = true;
    }
    if (command == "tweet" && message.author == "<@267407075905110016>") {
        message.delet();
        twitterClient.post('statuses/update', {status: args.join(" ")}, function(error, tweet, response) {
            //tweet will contain information about the tweet sent, if it sends
            sendEmbedded(null, `tweeted: url: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);
            console.log(`tweeted: ${args.join(" ")}`)      
            if (error) {
              console.log(error) //log error if there is one
            }
          });
        usedCommand = true;
    }

    async function Animate(anim, timeBetweenMessages) {
        message.delete();
        //var animate = args.join(" ");
        var output = anim.split(" ");
        if (output.length > 30) {
            sendEmbedded(null, "Please input a string with less than 30 words."); 
            return;
        }
        var m = await message.channel.send(output[0]);
        for (i = 0; i < output.length; i++) {
            m.edit(output[i]);
            sleep(`${timeBetweenMessages}`);      
        }
    }
    

    if (command == "animate" || command == "anim") {
        message.delete();
        Animate(args.join(" "), 500);
        console.log("executed animate");
        usedCommand = true;
    }

    if (command == "8ball") {
        message.delete();
        console.log("executed command 8ball");
        var answers = ["Yes.", "No.", "No fucking way.", "Of course.", "Go snort antifreeze.", "I'm gonna hit you with a shovel for this."];
        var sendAnswer = answers[Math.floor(Math.random()*answers.length)];
        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: ":8ball: **Prediction**\n",
                description: "\n",
                fields: [{
                    name: `Question`,
                    value: args.join(" ")
                },
                {
                    name: `Answer`,
                    value: sendAnswer
                }
                ],
                footer:
                {
                    value: `Requested by ${message.author}`,
                    icon_url: client.user.avatarURL,
                },
                timestamp: new Date()                
            }
        });
        usedCommand = true;
        
    }

    if (command == "big") {
        await figlet(args.join(" "), function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                sendEmbedded(null, "Something went wrong...");
                return;
            }
            var write = '```\n' + data + "\n```"
            message.channel.send(write);
        });
        message.delete();
        usedCommand = true;
    }

    var nowPlaying = "";

    if (command == "play") {
        usedCommand = true;
        message.delete();
        var isReady = true;
        var voiceChannel = message.member.voiceChannel;
        if (isReady) {
            isReady = false;
            var url = args.join(" ");
            ytdl.getInfo(url, function (err, info) {
                sendEmbedded(null, `Now playing "${info.title}"`);
                console.log(`Now playing "${info.title}"`);
                nowPlaying = info.title;
                if (command == "playing") {
                    sendEmbedded(null, nowPlaying);
                }
            });

            var stream = ytdl(url);

            var voiceChannel = message.member.voiceChannel;
            voiceChannel.join().then(connection => {
                console.log(`joined channel and playing video`);
                const dispatcher = connection.playStream(stream);
                dispatcher.on("end", end => {
                    console.log("left channel");
                    voiceChannel.leave();
                });
            }).catch(err => console.log(err));
            isReady = true
        }
    }

    if (command == "stop") {
        usedCommand = true;
        message.delete();
        var voiceToLeave = message.member.voiceChannel;
        message.channel.send("Left voice channel.");
        voiceToLeave.leave();
    }

    if (command == "game") {
        usedCommand = true;
        message.delete();
        const game = args.join(' ')
        if (!game) {
            message.delete()
            await client.user.setGame(null, null)
            sendEmbedded(null, 'Successfully cleared your game!').then(m => {
            })
        } else {
            message.delete()
            await client.user.setGame(`${game}`)
            sendEmbedded(null, `Successfully changed game to **${game}**!`).then(m => {
            })
        }
    }


    if (command == "random") {
        usedCommand = true;
        message.delete();
        randColor = Math.floor(Math.random() * 16777214) + 1;
        message.channel.send({
            embed: {
                color: randColor,
                description: `Random color generated: ${randColor}\n${randColor} is equal to 0x${randColor.toString(16).toUpperCase()}`
            }
        });
    }

    if (command == "gif") {
        usedCommand = true;
        message.delete();
        if (args.join(" ") == "peener") {
            sendEmbedded(null, "peener doesn't work ok.");
        } else {
            if (!args.join(" ")) {
                giphy.random({
                    rating: 'g',
                    limit: 1
                }, function (err, res) {
                    if (err) {
                    sendEmbedded(null, err);
                    }else {
                        message.channel.send(res.data.image_original_url);
                    }
                });
            } else if (args.join(" ")){
                giphy.search({
                    q: args.join(" "),
                    limit: 1,
                    rating: "g"
                }, function (err, res) {
                    try {
                        message.channel.send(res.data[0].embed_url);                    
                        
                    } catch (uncaughtException) {
                        sendEmbedded(null, `${args.join(" ")} doesn't work ok.`);
                    }
                    // Res contains gif data!
                });
            }
        }
    }

    if (command == "paste") {
        usedCommand = true;
        message.delete();        
        pastebin
        .createPaste(args.join(" "))
        .then(function (data) {
            // we have succesfully pasted it. Data contains the id
            sendEmbedded(null, "Here you go!\n" + data);
        })
        .fail(function (err) {
            console.log(err);
            sendEmbedded(null, err);
        });
    }

    if (command == "geninv" && message.author == "<@267407075905110016>") {
        usedCommand = true;
        sendEmbedded(null, "Generated invites.");
        client.guilds.forEach(g => g.channels.first().createInvite()
            .catch(err => message.author.send(`Missing permissions to create invite for ${g}`))
            .then(i => message.author.send(i.url)))
    }


    //Discord Economy Start

    if (command == "reloadb" && message.author == "<@267407075905110016>") {
        usedCommand = true;
        message.delete();        
        const m = await message.channel.send(":arrows_counterclockwise:");
        try {
            await message.guild.members.forEach((member) => {
                console.log(member.user.id);
                var test = member.user.id.toString();
                db.updateText(test + message.guild.id, "false").then((i) => {
                    //console.log(`updated ${memb}: new value: ${i.text}`);
                    process.on('uncaughtException', function(err) {
                        throw err;
                    });
				})
            }); 
            sleep(1000);
        }catch (uncaughtException) {
            throw uncaughtException; 
        }
        m.delete();
        sendEmbedded(null, "Updated Database");
        console.log("Updated Database.");                
    }

    if (command == "money") {
        usedCommand = true;
        message.delete();        
        db.fetchObject(message.author.id + message.guild.id).then((i) => {
            sendEmbedded(null, `<@${message.author.id}>'s  balance is: ${i.value}€`);
        });
    }

    if (command == "payday" || command == "work") {
        usedCommand = true;
        message.delete();        
        db.fetchObject(message.author.id + message.guild.id).then(k => {
            console.log(k.text);
            if (k.text == "false") {
                console.log("pay");
                var randValue =  Math.floor(Math.random() * 10000) + 1;
                db.updateValue(message.author.id + message.guild.id, randValue).then((i) => { // db.updateBalance grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                    sendEmbedded(null, `${message.author} worked really hard and earned **${randValue}**€!\n**Its new balance is:** ${i.value}`);
                    const embed = new Discord.RichEmbed()
                        .setDescription(`${message.guild.name}'s **Bank**`)
                        .setColor('RANDOM')
                        .addField('test', 'test', true)
                    
                })
            } else {
                console.log("no pay");
                const embed = new Discord.RichEmbed()
                    .setDescription(`${message.guild.name}'s **Bank**`)
                    .setColor('RANDOM')
                    .addField('You already got paid today, come on.', "Don't make me ban you.", false)
                message.channel.send(embed);
            }
    
            db.updateText(message.author.id + message.guild.id, "true");

            setTimeout(function(){ 
                db.updateText(message.author.id, "false").then((i) => {                }) //wait a day
            }, 86400000);
        })
    }

    if (command == "setmoney" && message.author == "<@267407075905110016>") {
        usedCommand = true;
        db.updateValue(args[0].replace('<', '').replace('>', '').replace('@', '') + message.guild.id, parseInt(args.join("").replace(args[0], '')))
            .catch(uncaughtException => {sendEmbedded(null, `${args.join("").replace(args[0], '')} is not a number.`) })
        sendEmbedded(null, `Balance set to ${parseInt(args.join("").replace(args[0], ''))}`);
    }

    if (command == "resetmoney" && message.author == "<@267407075905110016>") {
        usedCommand = true;
        message.delete();
        db.fetchObject(message.author.id + message.guild.id).then((k) => {
            var moneyToRemove = k.value;
            db.updateValue(message.author.id + message.guild.id, -k.value)
            sendEmbedded(null, `Reset ${args.join(" ")}'s balance.`);
        });

    }

    //Discord Economy End
    
    if (command == "weather") {                                        
        usedCommand = true;
        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
            if(err) {
                console.log(err);;
            } else {
                try {
                    message.channel.send({
                        embed: {
                            color: 3447003,
                            author: {
                                name: client.user.username,
                                icon_url: client.user.avatarURL
                            },
                            title: "Weather",
                            description: `Current weather in ${result[0].location.name}`,
                            fields: [{
                                name: `Current Temperature`,
                                value: `${result[0].current.temperature}°C`,
                                inline: true
                            },
                            {
                                name: "Todays Low",
                                value: `${result[0].forecast[0].low}°C`,
                                inline: true                                
                            },
                            {
                                name: "Todays High",
                                value: `${result[0].forecast[0].high}°C`,
                                inline: true                                
                            }
                            ],
                            footer:
                            {
                                value: `Requested by ${message.author}`,
                                icon_url: client.user.avatarURL,
                            },
                            timestamp: new Date()                
                        }
                    });
                } catch (err) {
                    sendEmbedded(null, `Couldn't find the city ${args.join(" ")}`);
                }
            }         
            //console.log("low" + JSON.stringify(result[0].current.temperature, null, 2));
        });
    }
    

    if (command == "meme") {
        usedCommand = true;
        message.delete();        
        if (templates.length < 1) {
            throw 'The memes haven\'t loaded yet!';
            sendEmbedded(null, "The memes haven\'t loaded yet! Please wait a few seconds and try again.");
        }
    
        if (/^(ls|list|s(earch)?)$/i.test(args[0])) {
            var memeTemps = "**Availble memes**\n" + templates.map(meme => `- \`${meme.name}\``).join('\n');
            message.delete();
            return (await sendEmbedded(null, memeTemps));
        }
    
        if (/^(i(nf(o)?)?)$/i.test(args[0])) {
            if (args.length < 2) {
                throw 'You must provide a meme to get info about!';
            }
    
            let info = getMeme(args[1]);
            if (!info) {
                throw `That is not a valid meme! Do \`${config.prefix}meme list\` to see available memes.`;
            }
    
            message.delete();
            return (await message.channel.send({
                embed: sendEmbedded(null, `${info.styles && info.styles.length > 1 ? info.styles.map(s => `\n- \`${s}\``).join('') : 'None'}`)
            }));
        }
    
        let input = args.join(' ');
        let parts = input.split('|').map(p => p.trim());
    
        if (parts.length < 3) {
            throw `No message was provided!`;
        }
    
        let meme = getMeme(args[0]);
        if (!meme) {
            throw `That is not a valid meme! Do \`${config.prefix}meme list\` to see available memes.`;
        }
    
        let topText = cleanInput(parts[1]);
        let bottomText = cleanInput(parts[2]);
    
        if (!topText || !bottomText) {
            throw 'Empty message!';
        }
    
        let url = `${meme.url}/${cleanInput(parts[1])}/${cleanInput(parts[2])}.jpg`;
        if (parts[3]) url += `?alt=${encodeURIComponent(parts[3])}`;
    
        const clock = await message.channel.send(':arrows_counterclockwise:');
        await message.channel.send({
            files: [
                {
                    attachment: url,
                    name: parts[0] + '.jpg'
                }
            ]
        });
        clock.delete();
    }

    if (command == "reverse") {
        usedCommand = true;
        message.delete();
        if (args.join(" ") == "kit kat") {
            sendEmbedded(null, "kat kit");
        } else {
            if (args.length < 1) {
                throw 'You must input text to be reversed!';
            } else {
                sendEmbedded(null, args.join(' ').split('').reverse().join(''));                
            }
        }

    }

    if (command == "eval" && message.author == "<@267407075905110016>") {
        usedCommand = true;
        message.delete();
        console.log("Executed command eval");
        var code = args.join(" ");
        try { var evaluatedCode = await (eval(code)); null; }
        catch (error) { };  //just because it's needed
        console.log(evaluatedCode);
        if (evaluatedCode == null) {
            sendEmbedded(null, `Error! Try again and check for spelling mistakes.`);
        }
        else {
            message.channel.send({
                embed: {
                    color: Math.floor(Math.random() * 16777214) + 1,
                    description: `Input: ${code}\nOutput: ${evaluatedCode}`
                }
            });
        }
        
    }

    if (command == "exec" && message.author == config.owner) {
        usedCommand = true;
        let input = args.join(' ')
        try {
            let result = await child_process.exec(input);
            let embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTimestamp()
                .setAuthor('Shell Execution', 'https://codemaxx.github.io/assets/images/emoji/terminal.png')
                .addField(':outbox_tray: Output', `\`\`\`\n${result.stdout}\n\`\`\``)
                .setFooter('oliveJS')
            message.delete()
            message.channel.send({ embed })
            console.log(embed)
        } catch (error) {
            let result = await child_process.exec(input);
            const outerr = require('util').inspect(result.stderr)
            let embed2 = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTimestamp()
                .setTitle('Uh oh..there was an error')
                .addField(`Output',``\`\`\`\n${outerr}\n\`\`\``)
                .setFooter('rBot')
            message.channel.send({ embed: embed2 })
            console.log(embed2)
        }
    }

    if (command == "uptime") {
        usedCommand = true;
        message.delete();
        var time = process.uptime();
        var uptime = (time + "").toHHMMSS();
        var working = "I've been up for " + uptime;
        sendEmbedded("9078233", working);
        console.log("Executed command uptime");
    }

    if (command == "ping") { //~~attempted ping command~~ it actually works now
        usedCommand = true;
        message.delete();
        const m = await message.channel.send("Ping?");
        sendEmbedded(null, `:ping_pong: Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        m.delete();
        console.log("Executed command ping");
    }

    if (command == "kick") {
        usedCommand = true;
        message.delete();
        console.log("Executed command kick");
        if (!message.member.roles.some(r => ["Administrator", "Moderator", "Bot Commander"].includes(r.name)) && !message.author == "<@267407075905110016>")
            return sendEmbedded(null, "Sorry, you don't have permissions to use this!");
        let member = message.mentions.members.first();
        if (!member)
            return sendEmbedded(null, "Please mention a valid member of this server");
        if (!member.kickable)
            return sendEmbedded(null, "I couldn't kick this user. They might have a higher role than me.");
        let reason = args.slice(1).join(' '); //removes first part
        if (!reason)
            return sendEmbedded(null, "Please indicate a reason for the kick!");
        await member.kick(reason)
            .catch(error => sendEmbedded(null, `Sorry ${message.author} I couldn't kick because of : ${error}`));
        sendEmbedded(null, `${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
    }

    if (command == "ban") {
        usedCommand = true;
        message.delete();
        console.log("Executed command ban");
        if (!message.member.roles.some(r => ["Administrator", "Moderator", "Bot Commander"].includes(r.name)) && !config.owner)
            return sendEmbedded(null, "You don't have permission to ban anyone.");
        let member = message.mentions.members.first();
        if (!member)
            return sendEmbedded(null, "Please mention a valid member of this server");
        if (!member.bannable)
            return sendEmbedded(null, "I couldn't ban this user. They might have a higher role than me.");
        let reason = args.slice(1).join(' '); //removes first part
        if (!reason)
            return sendEmbedded(null, "Please indicate a reason for the kick!");
        await member.ban(reason) //now it's time to ban
            .catch(error => sendEmbedded(null, `Sorry ${message.author} I couldn't ban because of : ${error}`));
        sendEmbedded(null, `${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }

    if (command == "tobin") {
        usedCommand = true;
        message.delete();
        var input = args.join(" ");
        var output = "";
        output = "Output for "  + '"' + input + '"' +": " + toBin(input);
        sendEmbedded(null, output);
        console.log("Executed command tobin");
    }

    if (command == "frombin") {
        usedCommand = true;
        message.delete();
        var input = args.join(" ");
        var output = "Output for " + '"' + input + '"' +": " + fromBin(input);
        sendEmbedded(null, output);
        console.log("Executed command frombin");
    }

    if (command == "prefix" && message.author == "<@267407075905110016>") {
        usedCommand = true;
        message.delete();
        if (!args.join(" ")) {
            sendEmbedded(null, `Current prefix is ${config.prefix}`);
        } else {
            sendEmbedded(null, `Prefix changed to ${args.join(" ")}`);
            var data = JSON.parse(fs.readFileSync("./config.json").toString(),true);
            data.prefix = args.join(" ");
            fs.writeFileSync("./config.json",JSON.stringify(data));
        }
    }

    if (command == "to64") {
        usedCommand = true;
        message.delete();
        var output = "Output for " + '"' + args.join(" ") + '"' + ": " + to64(args.join(" "));
        sendEmbedded(null, output);
        console.log("Executed command tob64");
    }

    if (command == "from64") {
        usedCommand = true;
        message.delete();
        var output = "Output for " + '"' + args.join(" ") + '"' + ": " + from64(args.join(" "));
        sendEmbedded(null, output);
        console.log("Executed command from64");
    }

    
    if (command == "nick" && (message.member.roles.some(r => ["Administrator", "Moderator", "Bot Commander"].includes(r.name)) || message.author == "<@267407075905110016>")) {
        usedCommand = true;
        message.mentions.members.first().setNickname(args.join(" ").replace(args[0], ''), "olive").catch(error => {
                sendEmbedded(null, "Error setting new nickname.")
            })
            .then(sendEmbedded(null, `Successfully changed nick to ${args.join(" ").replace(args[0], '')}`))
    }
    

    if (command === "purge" || command == "prune") { //purge command
        usedCommand = true;
        message.delete();
        console.log("Executed command purge");
        const deleteCount = parseInt(args[0], 10);
        if (!deleteCount || deleteCount <= 0 || deleteCount > 100)
            return sendEmbedded(null, "Please provide a number between 0 and 100 for the number of messages to delete");
        const fetched = await args.join(" ");
        message.channel.bulkDelete(+fetched + +1)
            sendEmbedded(null, `Deleted ${fetched} messages.`)
            .catch(error => sendEmbedded(null, `Couldn't delete messages because of: ${error}`));
    }

    if (command == "info") {
        usedCommand = true;
        message.delete();
        sendEmbedded(null, "This bot is written by oliver (oliver#9880).\nThanks to Tanol (Tanol#8909) for the profile pic.\n");
    }

    if (command == "help") {
        usedCommand = true;
        message.delete();
        var output = "You can add me to your discord server with this link https://discordapp.com/oauth2/authorize?client_id=374188904309456896&scope=bot&permissions=8 \n"
        var requestBy = "Requested by" + message.author;
        message.author.send(output);
        message.channel.send("HELP IS ON ITS WAY");
        message.author.send({
            embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "**Help**",
                description: `**These are all available commands.**\n`,
                fields: [{
                    name: `to64`,
                    value: `Convert any string to a base64 string.\n__Example__: ${config.prefix}to64 oliver is the best`
                },
                {
                    name: `from64`,
                    value: `Convert any base64 string to a UTF-8 string.\n__Example__: ${config.prefix}from64 b2xpdmVyIGlzIHRoZSBiZXN0`
                },
                {
                    name: `tobin`,
                    value: `Convert any string to a binary string.\n__Example__: ${config.prefix}tobin oliver is amazing`
                },
                {
                    name: `frombin`,
                    value: `Convert any binary string to a UTF-8 string.\n__Example__: ${config.prefix}frombin example`
                },
                {
                    name: `kick`,
                    value: `Kick a certain member with a reason\n__Example__:  ${config.prefix}kick @badmember being bad`
                },
                {
                    name: `ban`,
                    value: `Ban a certain member with a reason\n__Example__: ${config.prefix}ban @badboi being a bad boi`
                },
                {
                    name: `purge/prune`,
                    value: `Delete a certain amount of messages.\n__Example__: ${config.prefix}purge 5`
                },
                {
                    name: `uptime`,
                    value: `Display how long i have been up for (HH:MM:SS)\n__Exmaple__: ${config.prefix}uptime`

                },
                {
                    name: `ping`,
                    value: `Display the local ping and the API ping\n__Example__: ${config.prefix}ping`
                },
                {
                    name: "stats",
                    value: `Display various stats about the bot (currently only CPU and Memory Usage)\n__Exmaple__: ${config.prefix}stats`
                },
                {
                    name: "8ball",
                    value: `Answer a question\n__Example__: ${config.prefix}8ball is amra gay?`
                },
                {
                    name: "anim/animate",
                    value: `Animate text by editing it with a 250ms interval\n__Example__: ${config.prefix}animate ay this is pretty cool`
                },
                {
                    name: "prefix",
                    value: `Change prefix\n__Example__: ${config.prefix}prefix +`
                },
                {
                    name: "meme",
                    value: `Create a meme\n__Example__: ${config.prefix}meme list\n ${config.prefix}meme xy | what is | this`
                },
                {
                    name: "big",
                    value: `Make text bigger\n__Example__: ${config.prefix}big hello world!`
                },
                {
                    name: "translate",
                    value: `Translate text from one to another\n__Example__: ${config.prefix}translate en nl Hello World!`
                },
                {
                    name: "aes",
                    value: `A E S T E T H I C S\n__Example__: ${config.prefix}aes hello world`
                },
                {
                    name: "dog",
                    value: `Send a random image of a dog\n__Example__: ${config.prefix}dog`
                },
                {
                    name: "cat",
                    value: `Send ascii art of a random cat\n__Example__: ${config.prefix}`
                },
                {
                    name: "birb",
                    value: `Send a random picture of a bird\n__Example__: ${config.prefix}birb`
                },
                {
                    name: "gif",
                    value: `Send a gif\n__Example__: ${config.prefix}gif that escalated quickly`
                },
                {
                    name: "weather",
                    value: `Get the weather of any city\n__Example__: ${config.prefix}weather stockholm`
				},
				{
					name: "money/payday",
					value: `Get some money everyday\n__Example__: ${config.prefix}payday` //TODO: FIX
                },
                {
                    name: "xkcd",
                    value: `Get a random xkcd comic\n__Example__: ${config.prefix}xkcd`
                },
                {
                    name: "coin",
                    value: `Flip a coin\n__Example__: ${config.prefix}coin`
                }
                ],
                timestamp: new Date(),
                footer: {
                    value: requestBy,
                    icon_url: client.user.avatarURL,
                }
            }
        });
        console.log("Executed command help");
        var helpToWho = "Sent help to " + message.author;
        console.log(helpToWho)
    }

    if (command == "stats") {
        usedCommand = true;
        message.delete();
        function cpuAverage() {
            //Initialise sum of idle and time of cores and fetch CPU info
            var totalIdle = 0, totalTick = 0;
            var cpus = os.cpus();

            //Loop through CPU cores
            for (var i = 0, len = cpus.length; i < len; i++) {

                //Select CPU core
                var cpu = cpus[i];

                //Total up the time in the cores tick
                for (type in cpu.times) {
                    totalTick += cpu.times[type];
                }

                //Total up the idle time of the core
                totalIdle += cpu.times.idle;
            }

            //Return the average Idle and Tick times
            return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
        }

        //Grab first CPU Measure
        var startMeasure = cpuAverage();

        //Set delay for second Measure
        setTimeout(function () {

            //Grab second Measure
            var endMeasure = cpuAverage();

            //Calculate the difference in idle and total time between the measures
            var idleDifference = endMeasure.idle - startMeasure.idle;
            var totalDifference = endMeasure.total - startMeasure.total;

            //Calculate the average percentage CPU usage
            var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

            //Output result to console
            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: "**Stats**",
                    description: `**Statistics for oliveJS**\n`,
                    fields: [{
                        name: `Memory Usage`,
                        value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}MB`
                    },
                    {
                        name: "CPU Usage",
                        value: `${percentageCPU}%`
                    }
                    ],
                    timestamp: new Date(),
                    footer:
                    {
                        value: requestBy,
                        icon_url: client.user.avatarURL,
                    }
                }
            });
        }, 100);
    }
    if (!usedCommand) {
        console.log("reacted")
        message.react("❌")        
    }
});

client.login(config.token);
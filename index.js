require('dotenv').config();

const Discord = require("discord.js");
const moment = require("moment");
const bot = new Discord.Client();
const TOKEN = process.env.DISCORD_TOKEN;
const PREFIX = '!';
const request = require('request');


const url = "https://www.instagram.com/sololomka/?__a=1&max_id={end_cursor}";
const options = {json: true};
const temp = [];

let fs = require("fs");
let text = fs.readFileSync("./data.txt", "utf-8");

let arrayofstring = text.split('\n\n');

request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    }

    if (!error && res.statusCode == 200) {
        body['graphql']['user']['edge_owner_to_timeline_media']['edges'].forEach(element => {
            if (element['node']['is_video'] == false){
                temp.push(element['node']['shortcode']);
            }
        });
    }
});

function handleTimeCommand(message) {
    let now = moment();
    let then = moment(new Date(2020, 0, 28, 17, 0, 0));
    let ms = then.fromNow();
    let d = moment.duration(ms);
    let text = "Санин Час Ч " + ms;
    message.reply(text);
}

function handleAniptikoCommand(message) {
    let item = arrayofstring[Math.floor(Math.random()*arrayofstring.length)];
    message.reply('\n'+ item);
}

function handleAnyaptikoCommand(message) {
    let fs = require('fs');
    let files = fs.readdirSync('Namiko\\');
    let photo = files[Math.floor(Math.random()*files.length)];
    message.reply("Фото Намико ", {files: ["Namiko\\"+photo]});
}

function handleInstagramCommand(message) {
    let photo = temp[Math.floor(Math.random()*temp.length)];
    message.reply("Фото Намико https://www.instagram.com/p/"+photo+"/");
}

function processUser(message) {
    const user = users.filter(x => x.id === message.author.id)[0];

    if (user) {
        user.reactions.forEach((value, index) => message.react(value));
    }
}

function processCommand(message) {
    let args = message.content.substring(PREFIX.length).split(" ");

    let command = args[0];
    if (command) {
        let commandHandler = commandHandlers[command].handle;
        commandHandler(message);
    }
}

const users = [
    {
        id: '371670423999610880',
        reactions: ['0️⃣', '🚬']
    },
    {
        id: '281847177213509643',
        reactions: ['🦇']
    },
];

const commandHandlers = [
    {
        name: 'time',
        handle: handleTimeCommand
    },
    {
        name: 'аниптико',
        handle: handleAniptikoCommand
    },
    {
        name: 'аняптико',
        handle: handleAnyaptikoCommand
    },
    {
        name: 'instagram',
        handle: handleInstagramCommand
    },
];

bot.on('ready', () => {
    console.log('Bot Start');
});

bot.on('message',  message => {
    processUser(message);
    processCommand(message);
});

bot.login(TOKEN);

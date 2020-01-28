require('dotenv').config();

const Discord = require("discord.js");
const moment = require("moment");
const fs = require('fs');
const request = require('request');

const TOKEN = process.env.DISCORD_TOKEN;
const PREFIX = '!';

const url = "https://www.instagram.com/sololomka/?__a=1&max_id={end_cursor}";
const options = { json: true };
const temp = [];

const aniptikoTexts = fs.readFileSync("./data.txt", "utf-8").split('\n\n');
const namikoPhotos = fs.readdirSync('Namiko');

const bot = new Discord.Client();

request(url, options, (error, res, body) => {
    if (error) {
        return console.log(error)
    }

    if (!error && res.statusCode == 200) {
        body['graphql']['user']['edge_owner_to_timeline_media']['edges'].forEach(element => {
            if (element['node']['is_video'] == false) {
                temp.push(element['node']['shortcode']);
            }
        });
    }
});

function buildPathToNamikoPhoto(fileName) {
    return "Namiko\/" + fileName;
}

function handleTimeCommand(message, arguments) {
    let then = moment(new Date(2020, 0, 30, 17, 0, 0));
    let ms = then.fromNow();
    let text = "Саня узнает свою судьбу " + ms;
    return message.reply(text);
}

function handleAniptikoCommand(message, arguments) {
    const item = aniptikoTexts[Math.floor(Math.random() * aniptikoTexts.length)];
    return message.reply('\n' + item);
}

function handleAnyaptikoCommand(message, arguments) {
    const photo = namikoPhotos[Math.floor(Math.random() * namikoPhotos.length)];
    return message.reply("Фото Намико ", { files: [buildPathToNamikoPhoto(photo)] });
}

function handleInstagramCommand(message, arguments) {
    const photo = temp[Math.floor(Math.random() * temp.length)];
    return message.reply("Фото Намико https://www.instagram.com/p/" + photo + "/");
}

function handleStickerCommand(message, arguments) {
    const [discordStickerName] = arguments;
    const regexGroups = /^<:(?<emojiName>\d+|\w+):(?<emojiId>\d+)>$/.exec(discordStickerName);

   console.log('handleStickerCommand context', {
        discordStickerName,
        regexGroups,
    });

    let targetStickerFileName = null;
    if (regexGroups) {
        targetStickerFileName = namikoPhotos.find(x => x.split('.')[0] === regexGroups.groups.emojiName);

        if (targetStickerFileName !== undefined) {
            return message.reply('', { files: [buildPathToNamikoPhoto(targetStickerFileName)] });
        }
    }
}

function processUser(message) {
    const user = users.find(x => x.id === message.author.id);

    if (user !== undefined) {
        user.reactions.forEach((value, index) => message.react(value));
    }
}

function processCommand(message) {
    let args = message.content.substring(PREFIX.length).split(" ");

    let [command, ...arguments] = args;
    let commandHandler = commandHandlers.find(x => x.name === command);
    if (commandHandler !== undefined) {
        console.log('Handling `' + commandHandler.name + '` command.');
        commandHandler.handle(message, arguments);
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
    }
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
    {
        name: 'sticker',
        handle: handleStickerCommand
    },
];

bot.on('ready', () => {
    console.log('Bot Start');
});

bot.on('message', message => {
    processUser(message);
    processCommand(message);
});

bot.login(TOKEN);

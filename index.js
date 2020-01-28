require('dotenv').config();

const Discord = require("discord.js");
const moment = require("moment");
const bot = new Discord.Client();
const TOKEN = process.env.DISCORD_TOKEN;
const PREFIX = '!';
const request = require('request');


let url = "https://www.instagram.com/sololomka/?__a=1&max_id={end_cursor}";
let options = {json: true};
var temp = [];

request(url, options, (error, res, body) => {


    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode == 200) {

        body['graphql']['user']['edge_owner_to_timeline_media']['edges'].forEach(element => {

            if (element['node']['is_video'] == false){

                temp.push(element['node']['shortcode']);

            }
        });

        };
});


var fs = require("fs");
var text = fs.readFileSync("./data.txt", "utf-8");

var arrayofstring = text.split('\n\n');

bot.on('ready', () => {
    console.log('Bot Start');
});

bot.on('message',  message => {
    if (message.author.id == '371670423999610880') {
        message.react('0️⃣');
        message.react('🚬');
    }
    if (message.author.id == '281847177213509643') {
        message.react('🦇');
    }
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){

        case 'time':

            var now = moment();
            var then = moment([2020, 00, 28, 17, 00, 00]);
            var ms = then.fromNow();
            var d = moment.duration(ms);
            var text = "Санин Час Ч " + ms;
            message.reply(text);
            break;
        
        case 'аниптико':
            var item = arrayofstring[Math.floor(Math.random()*arrayofstring.length)];
            message.reply('\n'+ item);
            break;
        
        case 'аняптико':

            var fs = require('fs');
            var files = fs.readdirSync('Namiko\\');
            var photo = files[Math.floor(Math.random()*files.length)];
            message.reply("Фото Намико ", {files: ["Namiko\\"+photo]});
            break;
        
        case 'instagram':

            var photo = temp[Math.floor(Math.random()*temp.length)];
            message.reply("Фото Намико https://www.instagram.com/p/"+photo+"/");
            break;
    }

});

bot.login(TOKEN);

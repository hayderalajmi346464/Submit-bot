const express = require("express");
const app = express();

app.listen(() => console.log("submit bot by badboy"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});


const Discord = require('discord.js');
const client = new Discord.Client();
const cmd = require("node-cmd");
const ms = require("ms");
const fs = require('fs');
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const simpleytapi = require('simple-youtube-api')
const util = require("util")
const gif = require("gif-search");
const jimp = require("jimp");
const guild = require('guild');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const pretty = require("pretty-ms");
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');

const prefix = "-"
const developers = "ايديك"





let submit = JSON.parse(fs.readFileSync("./submit.json", 'utf8'));
client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "set-apply")){
    if(!badboy.member.hasPermission("ADMINISTRATOR")) return 
    var channel = badboy.mentions.channels.first();
    if(!channel) return badboy.channel.send("منشن الروم")
    submit[badboy.guild.id] = {
      channel: channel.name
    }
    fs.writeFile("./submit.json", JSON.stringify(submit), (err) => {
if(err)
console.error(err);
 
})
badboy.channel.send(`تم تعين روم التقديمات الى ${channel}`)
  }
})


client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "apply")){
    if(!submit[badboy.guild.id]) return badboy.channel.send("حدد روم التقديمات اولا")
    let ch = badboy.guild.channels.cache.find(ro => ro.name === `${submit[badboy.guild.id].channel}`);

let filter = m => m.author.id === badboy.author.id;
var user = badboy.author.username
var q1 
badboy.channel.send("من فضلك اكتب اسمك...").then(badboy => {
  badboy.channel.awaitMessages(filter , {
    max: 1,
    time: 9000,
    errors: ['time']
  })
  .then(collected => {
    
    collected.first().delete();
    
    q1 = collected.first().content;
    var q2 //انا غبي 
badboy.edit("من فضلك اكتب عمرك...").then(badboy => {
      badboy.channel.awaitMessages(filter , {
        max: 1,
        time: 9000,
        errors: ['time']
      })
      .then(collected => {
    
    collected.first().delete();
    
    q2 = collected.first().content;
    var q3 
    badboy.edit("من فضلك اكتب بلدك...").then(badboy => {
      badboy.channel.awaitMessages(filter , {
        max: 1,
        time: 9000,
        errors: ['time']
      })
      .then(collected => {
    
    collected.first().delete();
    
    q3 = collected.first().content;
    var q4 
    badboy.edit("من فضلك اكتب خبراتك....").then(badboy => {
      badboy.channel.awaitMessages(filter , {
        max: 1,
        time: 9000,
        errors: ['time']

      })
       .then(collected => {
    
    collected.first().delete();
    
    q4 = collected.first().content;
    var q5 
    badboy.edit("من فضلك اكتب سبب تقديمك...").then(badboy => {
      badboy.channel.awaitMessages(filter , {
        max: 1,
        time: 9000,
        errors: ['time']
      })
      .then(collected => {
    
    collected.first().delete();
    
    q5 = collected.first().content;
    var q6
badboy.edit(`Are You Sure You Want To Send This apply? **(Yes | No)**`)


badboy.channel.awaitMessages(response => response.content === 'No' || 'Yes' && filter, {
 
  max: 1,

  time: 90000,

  errors: ['time']

})

.then(collected => {

  if(collected.first().content === 'No') {

    badboy.delete();

    badboy.delete();



  }

  if(collected.first().content === 'Yes') {

  
   badboy.edit('تم ارسال تقديمك');

    collected.first().delete();
      var embed = new Discord.MessageEmbed()
    .setTitle("New Submit")
    .setAuthor(`New Submit in ${badboy.guild.name}`)
    .setTimestamp()
    .setFooter(`Submit by : ${user}`)
    .setDescription(`
    اسم المقدم : ${q1}
    عمر المقدم : ${q2}
    بلد المقدم : ${q3}
    خبرات المقدم : ${q4}
    سبب التقديم : ${q5}
    
    `)
    ch.send(embed)
  }
})
   
      })
      
    })
   

       })
    })
      })

    })
       })
    })
  })
})
  }
})


client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "قبول")){
    var role = badboy.guild.roles.cache.find(r => r.name === "m")//اسم الرتبة الي راح ياخذها الشخص اذا قبلته
let mention = badboy.mentions.members.first();
    if(!mention) return badboy.channel.send("منشن الشخص")
   
badboy.channel.send(`تم قبولك بنجاح ${mention} و اخذت رتبت ${role}`)
mention.roles.add(role)

  }
})



client.on('message', badboy => { 
  if(badboy.content.startsWith(prefix + "رفض")){
    var user = badboy.mentions.users.first()
    if(!user) return badboy.channel.send("منشن الشخص")
    var args = badboy.content.split(" ").slice(2).join(" ")
    if(!args) return badboy.channel.send("اكتب السبب")
    badboy.channel.send(`تم رفضك للاسف ${user} بسبب : ${args}`)
  }
})

client.login(process.env.token);

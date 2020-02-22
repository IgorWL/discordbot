const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
let active = new Map();

const prefix = "botprefix";
const ownerID = "yourid";

const presence = [
  "No Discord uai",
  "use -help para ver meus comandos!",
  "Desta vez fui feito pelo JavaScript :O"
]; // creates an arraylist containing phrases you want your bot to switch through.

client.on("ready", () => {
  setInterval(() => {
    const index = Math.floor(Math.random() * (presence.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
    client.user.setActivity(presence[index]);
  }, 12000);
});

client.on("message", async message => {
  if (message == `<@${client.user.id}>` || message == `${client.user.tag}`) {
    const embed = new Discord.RichEmbed().setTile(`Olá ${message.author.tag}!`)
      .setDescription(`Eu sou ${client.user.tag}!
Para saber meus comandos use: -help!`);
    message.channel.send(embed);
  }
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  let cmd = args.shift().toLowerCase();
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  try {
    let ops = {
      ownerID: ownerID,
      active: active
    };

    let commandFile = require(`./comandos/${cmd}.js`);
    commandFile.run(client, message, args, ops);
  } catch (e) {
    console.log(e.stack);
  }
});
client.login(config.token);

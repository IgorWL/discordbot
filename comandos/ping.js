const Discord = require('discord.js');

module.exports.run = async (bot , message, args) => {
    let botping = new Date() - message.createdAt;

  message.channel.send("Carregando...").then(msg => {
    let pEmbed = new Discord.RichEmbed()
        .setTitle("🏓 Ping:")
        .addField('Bot: ', Math.floor(botping) + 'ms')
        .addField('API: ', Math.floor(bot.ping) + 'ms')
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
        .setColor("RANDOM").setTimestamp()

        msg.edit(pEmbed);
})
                                         }

module.exports.help = {
    name: "ping"
}

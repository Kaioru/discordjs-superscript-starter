import path from 'path';
import discord from 'discord.js';
import superscript from 'superscript';

const client = new discord.Client();
const token = process.env.BOT_TOKEN;

if (!token) {
    console.log('Please set the BOT_TOKEN in the environment variables.');
} else {
    superscript.setup({
        factSystem: {
            clean: true,
        },
        importFile: path.resolve(__dirname, 'data.json'),
        pluginsPath: path.resolve(__dirname, 'plugins')
    }, (err, bot) => {
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
        });

        client.on('message', (message) => {
            const content = message.content;

            if (message.author.bot) return;

            bot.reply(message.author.id, content, (err, reply) => {
                message.reply(reply.string);
            });
        });

        client.login(token);
    });
}
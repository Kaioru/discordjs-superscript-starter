import path from 'path';
import glob from 'glob';
import discord from 'discord.js';
import superscript from 'superscript';
import dotenv from 'dotenv'

dotenv.config()

const client = new discord.Client();
const token = process.env.BOT_TOKEN;

if (!token) {
    console.log('Please set the BOT_TOKEN in the environment variables.');
} else {
    glob(`${__dirname}/facts/**/*.{top,tbl}`, (err, files) => {
        superscript.setup({
            logPath: null,
            mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/superscriptdb',
            factSystem: {
                importData: files,
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
    });
}
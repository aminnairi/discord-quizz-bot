"use strict";

const { Client } = require("discord.js");
const { config: dotEnvToProcessEnv } = require("dotenv");
const { Quizz } = require("./quizz.js");
const questions = require("./questions.json");

dotEnvToProcessEnv();

const client = new Client();

client.on("ready", function() {
    console.log(`Client logged as ${client.user.tag}`);
});

const quizz = new Quizz(questions);

client.on("message", function(message) {
    if (message.author.id !== client.user.id) {
        if (message.content.startsWith("!") && ["!quizz", "!stop", "!ff"].every(command => !message.content.includes(command))) {
            message.react("😂");
        } else if (message.content.toLowerCase().trim() === "!quizz" && !quizz.hasSelectedQuestion()) {
            message.reply("Reçu ! Je chosis une question au hasard...");

            quizz.selectQuestion();

            message.channel.send(quizz.question.text);
        } else if (message.content.toLowerCase().trim() === "!quizz" && quizz.hasSelectedQuestion()) {
            message.react("🤔");
            message.reply("Okay ! Je change la question...");

            quizz.selectQuestion();

            message.channel.send(quizz.question.text);
        } else if (quizz.hasSelectedQuestion() && message.content.toLowerCase().trim() === "!stop") {
            message.react("☹️");
            message.reply("Okay, j'arrête de poser des questions...");

            quizz.resetQuestion();
        } else if (quizz.hasSelectedQuestion() && message.content.toLowerCase().trim() === "!ff") {
            message.react("😭");
            message.channel.send(quizz.question.getAnswersAfterForfeit());
            message.channel.send(quizz.question.explanation);

            quizz.resetQuestion();
        } else if (quizz.hasSelectedQuestion()) {
            if (quizz.question.isAnswer(message.content)) {
                message.react("👍");
                message.reply("Bravo, tu as trouvé la bonne réponse !");
                message.channel.send(quizz.question.getAnswersAfterWin());
                message.channel.send(quizz.question.explanation);

                quizz.resetQuestion();
            } else {
                message.react("👎");
            }
        }
    }
});

client.login(process.env.TOKEN);

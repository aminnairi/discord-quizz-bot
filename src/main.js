"use strict";

const { Client } = require("discord.js");
const { config: dotEnvToProcessEnv } = require("dotenv");
const { Quizz } = require("./quizz.js");
const { Scores } = require("./scores.js");
const questions = require("./questions.json");

dotEnvToProcessEnv();

const client = new Client();
const scores = new Scores();

client.on("ready", function() {
    console.log(`Client logged as ${client.user.tag}`);
});

const quizz = new Quizz(questions);

client.on("message", function(message) {
    if (message.author.id !== client.user.id) {
        if (!quizz.hasSelectedQuestion()) {
            if (message.content === "!help") {
                message.channel.send("Pour avoir de l'aide, tape `!help`.");
                message.channel.send("Pour avoir de l'aide, tape `!scores`.");
                message.channel.send("Pour réinitialiser les scores, tape `!reset`.");
                message.channel.send("Pour que je pose une question, tape `!quizz`.");
                message.channel.send("Pour arrêter une question en cours, tape `!stop`.");
                message.channel.send("Pour demander la solution à une question en cours, tape `!ff`.");
                message.channel.send("Pour reporter un problème, tape `!issue`.");
                message.channel.send("Pour m'aider à m'améliorer, tape `!contribute`.");
                message.reply("Amuse-toi bien ;)");
            }

            if (message.content === "!issue") {
                message.reply("Un problème à reporter ? Rends-toi à cette adresse : https://github.com/aminnairi/discord-quizz-bot/issues pour ouvrir une issue. Mon créateur te répondra le plus vite possible !");
                return;
            }

            if (message.content === "!contribute") {
                message.reply("Envie de contribuer ? Rien de plus simple... Enfin ça c'est la théorie ! Tu t'y connais un minimum en JavaScript et Node.js ? Pas à l'aise avec le développement mais tu souhaites m'aider à augmenter mon capital de questions ? Alors tu peux apporter ton aide en te rendant à cette adresse : https://github.com/aminnairi/discord-quizz-bot/. Les *pull-requests* sont les bienvenues !");
                return;
            }

            if (message.content === "!quizz") {
                message.react("🎉");
                message.reply("Reçu ! Je choisis une question au hasard...");
                quizz.selectQuestion();
                message.channel.send(quizz.question.text);
                return;
            }

            if (message.content === "!scores") {
                message.channel.send(scores.summary());
                return;
            }

            if (message.content === "!reset") {
                scores.reset();
                message.replay("Bien reçu. Je viens de réinitialiser les scores de tout le monde !");
                return;
            }
        } else {
            if (message.content === "!quizz") {
                message.react("🤔");
                message.reply("Okay ! Je change la question...");
                quizz.selectQuestion();
                message.channel.send(quizz.question.text);
                return;
            }

            if (message.content.toLowerCase().trim() === "!stop") {
                message.react("☹️");
                message.reply("Okay, j'arrête de poser des questions...");
                quizz.resetQuestion();
                return;
            }

            if (message.content.toLowerCase().trim() === "!ff") {
                message.react("😭");
                message.channel.send(quizz.question.getAnswersAfterForfeit());
                message.channel.send(quizz.question.explanation);
                quizz.resetQuestion();
                return;
            }

            if (quizz.question.isAnswer(message.content)) {
                scores.increase(message.member.displayName);
                message.react("👍");
                message.reply("Bravo, tu as trouvé la bonne réponse !");
                message.channel.send(quizz.question.getAnswersAfterWin());
                message.channel.send(quizz.question.explanation);
                quizz.resetQuestion();
                return;
            } 

            message.react("👎");
            return;
        }
    }
});

client.login(process.env.TOKEN);

"use strict";

class ScoresConstructorError extends Error {
    constructor(message) {
        super(message);

        this.name = "ScoresConstructorError";
    }
}

class Scores {
    constructor() {
        if (arguments.length !== 0) {
            throw new ScoresConstructorError("No arguments expected");
        }

        this.scores = {};
    }

    increase(user) {
        if (this.scores[user]) {
            this.scores[user] = this.scores[user] + 1;
        } else {
            this.scores[user] = 1;
        }
    }

    summary() {
        const scores = Object.entries(this.scores).sort(function([, player1Score], [, player2Score]) {
            return player2Score - player1Score;
        });

        if (scores.length === 0) {
            return "Il n'y a pas de scores encore enregistré. Fais une partie avec la commande `!quizz` !";
        }

        return scores.map(function([user, score], index) {
            return `${index === 0 ? "🥇 " : index === 1 ? "🥈 " : index === 2 ? "🥉 " : ""}${user} a ${score} point${score > 1 ? "s" : ""}.`;
        }).join("\n");
    }

    reset() {
        this.scores = {};
    }
}

module.exports = {
    Scores,
    ScoresConstructorError
};

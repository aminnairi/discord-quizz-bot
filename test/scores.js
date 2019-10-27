"use strict";

const { describe, it } = require("mocha");
const { expect } = require("chai");
const { Scores, ScoresConstructorError } = require("../src/scores.js");

describe("scores.js", function() {
    it("It should throw an error when passing an argument to the constructor.", function() {
        expect(() => new Scores(true)).to.throw(ScoresConstructorError);
    });

    it("It should instanciate a new Scores instance with an empty objet for the scores.", function() {
        const scores = new Scores();
        
        expect(scores.scores).to.deep.equal({});
    });

    it("It should set the score to one if the user has no score.", function() {
        const scores = new Scores();

        scores.increase("Brendan");
        scores.increase("Linus");
        scores.increase("Richard");

        expect(scores.scores).to.deep.equal({ Brendan: 1, Linus: 1, Richard: 1 });
    });

    it("Should increment the user's score if it already exists.", function() {
        const scores = new Scores();


        scores.increase("Brendan");
        scores.increase("Linus");
        scores.increase("Richard");
        scores.increase("Brendan");

        expect(scores.scores).to.deep.equal({ Brendan: 2, Linus: 1, Richard: 1 });
    });

    it("It should return a default text in case there is no scores registered yet and after a reset.", function() {
        const scores = new Scores();

        expect(scores.summary()).to.equal("Il n'y a pas de scores encore enregistré. Fais une partie avec la commande `!quizz` !");

        scores.increase("Brendan");
        scores.reset();

        expect(scores.summary()).to.equal("Il n'y a pas de scores encore enregistré. Fais une partie avec la commande `!quizz` !");
    });

    it("It should return the score summary when there is at least one member registered.", function() {
        const scores = new Scores();

        scores.increase("Amin");
        scores.increase("Richard");
        scores.increase("Richard");
        scores.increase("Brendan");
        scores.increase("Brendan");
        scores.increase("Brendan");
        scores.increase("Brendan");
        scores.increase("Linus");
        scores.increase("Linus");
        scores.increase("Linus");

        expect(scores.summary()).to.equal("🥇 Brendan a 4 points.\n🥈 Linus a 3 points.\n🥉 Richard a 2 points.\nAmin a 1 point.");
    });
});

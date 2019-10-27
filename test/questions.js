"use strict";

const { describe, it } = require("mocha");

const { expect } = require("chai");

const {
    Question,
    QuestionTextMissingError,
    QuestionTextTypeError,
    QuestionAnswersMissingError,
    QuestionAnswersEmptyError,
    QuestionAnswersTypeError,
    QuestionExplanationMissingError,
    QuestionExplanationTypeError
} = require("../src/question.js");

describe("questions.js", function() {
    it("It should throw an error if the text property is missing.", function() {
        expect(function() {
            return new Question({});
        }).to.throw(QuestionTextMissingError);

        expect(function() {
            return new Question({ text: "" });
        }).to.throw(QuestionTextMissingError);
    });

    it("It should throw an error if the text property is not a string.", function() {
        expect(function() {
            return new Question({ text: true });
        }).to.throw(QuestionTextTypeError);
    });

    it("It should throw an error if the answers property is missing.", function() {
        expect(function () {
            return new Question({ text: "text" });
        }).to.throw(QuestionAnswersMissingError);
    });

    it("It should throw an error if the answers is not an array", function() {
        expect(function() {
            return new Question({ text: "text", answers: true });
        }).to.throw(QuestionAnswersTypeError);
    });

    it("It should throw an error if the answers property is empty.", function() {
        expect(function () {
            return new Question({ text: "text", answers: [] });
        }).to.throw(QuestionAnswersEmptyError);
    });

    it("It should throw an error if the answers property is not an array of strings.", function() {
        expect(function () {
            return new Question({ text: "text", answers: [true] });
        }).to.throw(QuestionAnswersTypeError);
    });

    it("It should throw an error if the explanation is missing.", function() {
        expect(function() {
            return new Question({ text: "text", answers: ["a"] });
        }).to.throw(QuestionExplanationMissingError);

        expect(function() {
            return new Question({ text: "text", answers: ["a"], explanation: "" });
        }).to.throw(QuestionExplanationMissingError);
    });

    it("It should throw an error if the explanation is not a string.", function() {
        expect(function() {
            return new Question({ text: "text", answers: ["a"], explanation: true });
        }).to.throw(QuestionExplanationTypeError);
    });

    it("It should not throw an error when passing the correct parameter to the constructor.", function() {
        expect(function() {
            return new Question({ text: "a", answers: ["a"], explanation: "a" });
        }).to.not.throw;
    });

    it("Should return false when passing a wrong answer.", function() {
        const question = new Question({
            text: "Is Discord better than Slack?",
            answers: ["yes"],
            explanation: "Slack is powered by a company that wants to make money while Discord is powered by its community."
        });

        expect(question.isAnswer("no")).to.be.false;
    });

    it("Should return true when passing a valid answer.", function() {
        const question = new Question({
            text: "Is today a good day to put in production?",
            answers: ["no"],
            explanation: "There is no better day to put in production. Just roll with this."
        });

        expect(question.isAnswer("no")).to.be.true;
    });

    it("Should return the answers in case of a forfeit.", function() {
        const question1 = new Question({
            text: "Are dogs angels hidden in animals' body?",
            answers: ["oui"],
            explanation: "Look at how happy they are when you get back from work. They just are. Period."
        });


        const question2 = new Question({
            text: "How many days are in a week?",
            answers: ["7", "seven"],
            explanation: "Really? Are you born yesterday?"
        });

        const question3 = new Question({
            text: "Cite one functional programing language.",
            answers: ["Haskell", "Elm", "Ocaml"],
            explanation: "Functional programing language often does not mutate the data structures and loop over entries using recursion."
        });

        expect(question1.getAnswersAfterForfeit()).to.equal("Dommage ! La bonne réponse était oui.");
        expect(question2.getAnswersAfterForfeit()).to.equal("Dommage ! Les bonnes réponses étaient 7 ou seven.");
        expect(question3.getAnswersAfterForfeit()).to.equal("Dommage ! Les bonnes réponses étaient Haskell, Elm ou Ocaml.");
    });

    it("Should return the answers in case of a win.", function() {
        const question1 = new Question({
            text: "Are dogs angels hidden in animals' body?",
            answers: ["oui"],
            explanation: "Look at how happy they are when you get back from work. They just are. Period."
        });

        const question2 = new Question({
            text: "How many days are in a week?",
            answers: ["7", "seven"],
            explanation: "Really? Are you born yesterday?"
        });

        const question3 = new Question({
            text: "Cite one functional programing language.",
            answers: ["Haskell", "Elm", "Ocaml"],
            explanation: "Functional programing language often does not mutate the data structures and loop over entries using recursion."
        });

        expect(question1.getAnswersAfterWin()).to.equal("La bonne réponse était bien sûr oui.");
        expect(question2.getAnswersAfterWin()).to.equal("Les bonnes réponses étaient bien sûr 7 ou seven.");
        expect(question3.getAnswersAfterWin()).to.equal("Les bonnes réponses étaient bien sûr Haskell, Elm ou Ocaml.");
    });
});

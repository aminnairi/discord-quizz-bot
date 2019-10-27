"use strict";

const { describe, it } = require("mocha");
const { expect } = require("chai");
const { Question } = require("../src/question.js");

const {
    Quizz,
    QuizzConstructorArgumentsError,
    QuizzQuestionsTypeError
} = require("../src/quizz.js");

describe("quizz.js", function() {
    it("It should throw an error if the number of arguments passed to the constructor is invalid.", function() {
        expect(() => new Quizz()).to.throw(QuizzConstructorArgumentsError);
        expect(() => new Quizz(1, 2)).to.throw(QuizzConstructorArgumentsError);
    });

    it("It should throw an error when passing an argument that is not an array.", function() {
        expect(() => new Quizz(1)).to.throw(QuizzQuestionsTypeError);
    });

    it("It should instanciate the quizz with an empty selected question and a list of questions.", function() {
        const questions = [
            new Question({ text: "a", answers: ["a"], explanation: "a" }),
            new Question({ text: "a", answers: ["a"], explanation: "a" }),
            new Question({ text: "a", answers: ["a"], explanation: "a" }),
            new Question({ text: "a", answers: ["a"], explanation: "a" })
        ];

        const quizz = new Quizz(questions);
        
        expect(quizz.question).to.be.null;
        expect(quizz.questions).to.deep.equal(questions);
    });

    it("It should set a random question.", function() {
        const question1 = { text: "a", answers: ["a"], explanation: "a" };
        const question2 = { text: "a", answers: ["a"], explanation: "a" };

        const quizz1 = new Quizz([
            new Question(question1)
        ]);

        const quizz2 = new Quizz([
            new Question(question1),
            new Question(question2)
        ]);

        expect(quizz1.question).to.be.null;
        expect(quizz1.hasSelectedQuestion()).to.be.false;
        expect(quizz2.question).to.be.null;
        expect(quizz2.hasSelectedQuestion()).to.be.false;

        quizz1.selectQuestion();
        quizz2.selectQuestion();

        expect(quizz1.question).to.deep.equal(question1);
        expect(quizz1.hasSelectedQuestion()).to.be.true;
        expect(quizz2.question).to.deep.equal(question1);
        expect(quizz2.hasSelectedQuestion()).to.be.true;
    });

    it("It should reset the question properly.", function() {
        const question = new Question({
            text: "a",
            answers: ["a"],
            explanation: "a"
        });

        const quizz = new Quizz([ question ]);

        quizz.selectQuestion();

        expect(quizz.question).to.not.be.null;

        quizz.resetQuestion();

        expect(quizz.question).to.be.null;
    });
});

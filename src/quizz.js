const { Question } = require("./question.js");

class QuizzQuestionsTypeError extends Error {
    constructor(message) {
        super(message);

        this.name = "QuizzQuestionsTypeError";
    }
}

class QuizzConstructorArgumentsError extends Error {
    constructor(message) {
        super(message);

        this.name = "QuizzConstructorArgumentsError";
    }
}

class Quizz {
    constructor(questions) {
        if (arguments.length !== 1) {
            throw new QuizzConstructorArgumentsError("Expected exactly one argument.");
        }

        if (Object.prototype.toString.call(questions) !== "[object Array]") {
            throw new QuizzQuestionsTypeError("First argument must be an array");
        }


        this.question = null;
        this.questions = questions.map(question => new Question(question));
    }

    selectQuestion() {
        const minimum = 0;
        const maximum = this.questions.length - 1;
        const random = Math.floor(Math.random() * (maximum - minimum) + minimum + 1);

        if (this.questions.length === 1) {
            this.question = this.questions[0];

            return;
        }

        this.question = this.questions[random];
    }

    resetQuestion() {
        this.question = null;
    }

    hasSelectedQuestion() {
        return !!this.question;
    }
}

module.exports = { Quizz };

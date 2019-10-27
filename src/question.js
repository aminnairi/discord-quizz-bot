class QuestionTextMissingError extends Error {
    constructor(message) {
        super(message);

        this.name = "QuestionTextMissingError";
    }
}

class QuestionAnswersMissingError extends Error {
    constructor(message) {
        super(message);

        this.name = "QuestionAnswersMissingError";
    }
}

class QuestionAnswersEmptyError extends Error {
    constructor(message) {
        super(message);

        this.name = "QuestionAnswersEmptyError";
    }
}

class QuestionExplanationMissingError extends Error {
    constructor(message) {
        super(message);

        this.name = "QuestionExplanationMissingError";
    }
}

class QuestionTextTypeError extends Error {
    constructor(message) {
        super(message);

        this.name = "QuestionTextTypeError";
    }
}

class QuestionAnswersTypeError extends Error {
    constructor(message) {
        super(message);

        this.name = "QuestionAnswersTypeError";
    }
}

class QuestionExplanationTypeError extends Error {
    constructor(message) {
        super(message);

        this.name = "QuestionExplanationTypeError";
    }
}

class Question {
    constructor({ text, answers, explanation }) {
        if (!text) {
            throw new QuestionTextMissingError("The text field is mandatory.");
        }

        if (Object.prototype.toString.call(text) !== "[object String]") {
            throw new QuestionTextTypeError("The text field must be a string.");
        }

        if (!answers) {
            throw new QuestionAnswersMissingError("The answers property is mandatory.");
        }

        if (Object.prototype.toString.call(answers) !== "[object Array]") {
            throw new QuestionAnswersTypeError("The answers field must be an array.");
        }

        if (answers.length === 0) {
            throw new QuestionAnswersEmptyError("The answers property is empty.");
        }

        if (answers.some(answer => Object.prototype.toString.call(answer) !== "[object String]")) {
            throw new QuestionAnswersTypeError("The answers field must be an array of strings.");
        }

        if (!explanation) {
            throw new QuestionExplanationMissingError("The explanation property is mandatory.");
        }

        if (Object.prototype.toString.call(explanation) !== "[object String]") {
            throw new QuestionExplanationTypeError("The explanation field must be a string.");
        }

        this.text = text;
        this.answers = answers;
        this.explanation = explanation;
    }

    isAnswer(guess) {
        return this.answers.some(function(answer) {
            return guess.toLowerCase().trim() === answer.toLowerCase().trim();
        });
    }

    getAnswersAfterForfeit() {
        if (this.answers.length < 2) {
            return `Dommage ! La bonne réponse était ${this.answers[0]}.`;
        }

        return `Dommage ! Les bonnes réponses étaient ${this.answers.slice(0, -1).join(", ")} ou ${this.answers.slice(-1)}.`;
    }

    getAnswersAfterWin() {
        if (this.answers.length < 2) {
            return `La bonne réponse était bien sûr ${this.answers[0]}.`;
        }

        return `Les bonnes réponses étaient bien sûr ${this.answers.slice(0, -1).join(", ")} ou ${this.answers.slice(-1)}.`;
    }
}

module.exports = {
    Question,
    QuestionTextMissingError,
    QuestionTextTypeError,
    QuestionAnswersMissingError,
    QuestionAnswersEmptyError,
    QuestionAnswersTypeError,
    QuestionExplanationMissingError,
    QuestionExplanationTypeError
};

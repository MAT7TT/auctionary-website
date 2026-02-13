const Joi = require("joi");
const questions = require("../models/question.server.models");
const { containsProfanity } = require("../lib/profanity");
const core = require("../models/core.server.models");

const get_questions = (req, res) => {
    const item_id = parseInt(req.params.item_id, 10);

    core.itemDetails(item_id, (err, item) => {
        if (err) return res.sendStatus(500);
        if (!item) return res.sendStatus(404);

        questions.checkQuestions(item_id, (err, rows) => {
            if (err) return res.sendStatus(500);
            return res.status(200).json(rows);
        });
    }); 
}

const ask_question = (req, res) => {
    const schema = Joi.object({
        question_text: Joi.string().trim().min(1).required()
    });

    const { error } = schema.validate(req.body, { errors: { wrap: { label: false } } });
    if(error) return res.status(400).json({ error_message: error.details[0].message });

    const user_id = req.user_id;
    const item_id = parseInt(req.params.item_id, 10);
    const { question_text } = req.body;

    if (containsProfanity(question_text)) {
        return res.status(406).json({ error_message: "Profanity is not allowed" });
    }

    core.itemDetails(item_id, (err, item) => {
        if (err) return res.sendStatus(500);
        if (!item) return res.sendStatus(404);

        const now = Math.floor(Date.now() / 1000);

        if (item.end_date <= now) {
            return res.status(405).json({ error_message: "This auction has ended"})
        }

        if (item.creator_id === user_id) {
            return res.status(403).json({ error_message: "You cannot ask a question on your own item"})
        }
        
        questions.askQuestion(user_id, item_id, question_text, (err2, question_id) => {
            if (err2) return res.sendStatus(500);
            return res.sendStatus(200);
        });
    });
}

const answer_question = (req, res) => {
    const schema = Joi.object({
        answer_text: Joi.string().trim().min(1).required()
    });

    const { error } = schema.validate(req.body, { errors: { wrap: { label: false } } });
    if(error) return res.status(400).json({ error_message: error.details[0].message });

    const user_id = req.user_id;
    const question_id = parseInt(req.params.question_id, 10);
    const { answer_text } = req.body;
    
    if (containsProfanity(answer_text)) {
        return res.status(406).json({ error_message: "Profanity is not allowed" });
    }

    questions.getQuestionById(question_id, (err, question) => {
        if (err) return res.sendStatus(500);
        if (!question) return res.sendStatus(404);

        core.itemDetails(question.item_id, (err2, item) => {
            if (err) return res.sendStatus(500);
            if (!item) return res.sendStatus(404);

            const now = Math.floor(Date.now() / 1000);

            if (item.end_date <= now) {
                return res.status(405).json({ error_message: "This auction has ended"})
            }

            if (item.creator_id !== user_id) {
            return res.status(403).json({ error_message: "Only the sellers can answer questions on their items"})
            }

            questions.answerQuestion(question_id, answer_text, (err3, updated) => {
                if (err3) return res.sendStatus(500);
                if (!updated) return res.sendStatus(404);
                return res.sendStatus(200);
            });
        })
    });
}

module.exports = {
    get_questions: get_questions,
    ask_question: ask_question,
    answer_question: answer_question
}
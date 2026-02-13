const { isAuthenticated } = require("../lib/authentication");
const questions = require("../controllers/question.server.controllers");

module.exports = function(app) {
    app.route("/item/:item_id/question")
        .get(questions.get_questions)
        .post(isAuthenticated, questions.ask_question);

    app.route("/question/:question_id")
        .post(isAuthenticated, questions.answer_question);
}
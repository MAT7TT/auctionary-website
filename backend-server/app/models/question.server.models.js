const db = require("../../database");

const checkQuestions = (item_id, done) => {
    const sql = `SELECT question_id, question AS question_text, 
                        answer AS answer_text 
                 FROM questions 
                 WHERE item_id=?
                 ORDER BY question_id DESC
                 `;

    db.all(sql, [item_id], (err, rows) => {
        if (err) return done(err);
        return done(null, rows || []);
    });
}

const askQuestion = (user_id, item_id, question_text, done) => {
    const sql = `INSERT INTO questions (question, answer, asked_by, item_id) VALUES (?, ?, ?, ?)`;
    values = [question_text, null, user_id, item_id];

    db.run(sql, values, function (err) {
    if (err) return done(err, null);
    return done(null, this.lastID);
    });
}

const getQuestionById = (question_id, done) => {
    const sql = `SELECT * FROM questions WHERE question_id=?`;
    
    db.get(sql, [question_id], (err, row) => {
        if (err) return done(err);
        return done(null, row);
    });
}

const answerQuestion = (question_id, answer_text, done) => {
    const sql = `UPDATE questions SET answer=? WHERE question_id=?`;

    db.run(sql, [answer_text, question_id], function (err) {
        if (err) return done(err);
        if (this.changes === 0 ) return done(null, false);
        return done(null, true);
    });
}

module.exports = { checkQuestions, askQuestion, getQuestionById, answerQuestion };
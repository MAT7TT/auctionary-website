const db = require("../../database");

const getAll = (done) => {
    const sql = `SELECT category_id, name FROM categories ORDER BY name`;
    db.all(sql, [], (err, categories) => {
        if (err) return done(err);
        return done(null, categories);
    });
}

const addItemCategories = (item_id, category_ids, done) => {
    if (!Array.isArray(category_ids) || category_ids.length === 0) {
        return done(null);
    }

    const sql = `INSERT OR IGNORE INTO item_categories (item_id, category_id) VALUES (?,?)`;
    let rem_categories = category_ids.length;

    category_ids.forEach((category_id) => {
        db.run(sql, [item_id, category_id], (err) => {
            if (err) return done(err);
            rem_categories --;
            if (rem_categories === 0) return done(null);
        });
    });
}

const getItemCategories = (item_id, done) => {
    const sql = `SELECT c.category_id, c.name
                 FROM categories c
                 JOIN item_categories ic ON c.category_id = ic.category_id
                 WHERE ic.item_id =?
                 ORDER BY c.name
                 `;
    db.all(sql, [item_id], (err, rows) => {
        if (err) return done(err);
        return done(null, rows);
    });
}

module.exports = {
    getAll: getAll,
    addItemCategories: addItemCategories,
    getItemCategories: getItemCategories
}
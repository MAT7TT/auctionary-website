const categories = require("../models/categories.server.models");

const list = (req, res) => {
    categories.getAll((err, rows) => {
        if (err) return res.sendStatus(500)
        return res.status(200).json(rows);
    });
};

module.exports = {
    list: list
};


const categories = require("../controllers/categories.server.controllers");

module.exports = function(app) {
    app.route("/categories")
        .get(categories.list);
}
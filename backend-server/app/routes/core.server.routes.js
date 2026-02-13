const { isAuthenticated } = require("../lib/authentication");
const core = require("../controllers/core.server.controllers");

module.exports = function(app) {
    app.route("/search")
        .get(core.search);

    app.route("/item")
        .post(isAuthenticated, core.create);

    app.route("/item/:item_id")
        .get(core.item_details);

    app.route("/item/:item_id/bid")
        .post(isAuthenticated, core.place_bid)
        .get(core.bid_history);
    
}
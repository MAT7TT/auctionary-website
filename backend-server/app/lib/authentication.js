const users = require("../models/user.server.models");

const isAuthenticated = (req, res, next) => {
    const token = req.get("X-Authorization");
    if (!token) return res.sendStatus(401);

    users.getIdFromToken(token, (err, id) => {
        if (err) return res.sendStatus(500);
        if (!id) return res.sendStatus(401);

        req.user_id = id;
        next();
    });
}

module.exports = { isAuthenticated };
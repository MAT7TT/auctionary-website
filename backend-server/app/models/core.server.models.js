const db = require("../../database");

const searchItem = (q, status, limit, offset, user_id, category_id, done) => {
    let sql = `
        SELECT DISTINCT i.item_id, i.name, i.description, i.end_date,
               i.creator_id, i.image_url, u.first_name, u.last_name
        FROM items i
        JOIN users u ON i.creator_id = u.user_id
    `;
    const params = [];
    const conditions = [];

    // Category filter
    if (typeof category_id === "string" && category_id.length > 0) {
        const ids = category_id.split(",").map(Number);

        sql += `LEFT JOIN item_categories ic ON i.item_id = ic.item_id
                LEFT JOIN categories c ON c.category_id = ic.category_id
                `;
        conditions.push(`c.category_id IN (${ids.map(() => "?").join(",")})`);
        params.push(...ids);
    }
    
    // search filter
    if (q) {
        conditions.push("(LOWER(i.name) LIKE LOWER(?) OR LOWER(i.description) LIKE LOWER(?))");
        const likeQ = `%${q}%`;
        params.push(likeQ);
        params.push(likeQ);
    }

    // status filters
    if (status === "OPEN") {
        conditions.push("i.creator_id = ?");
        conditions.push("i.end_date > strftime('%s','now')");
        params.push(user_id);
    } else if (status === "BID") {
        sql += " JOIN bids b ON b.item_id = i.item_id";
        conditions.push("b.user_id = ?");
        conditions.push("i.end_date > strftime('%s','now')");
        params.push(user_id);
    } else if (status === "ARCHIVE") {
        conditions.push("i.creator_id = ?");
        conditions.push("i.end_date < strftime('%s','now')");
        params.push(user_id);
    } else if (status && !["OPEN", "BID", "ARCHIVE"].includes(status)) {
        return done({ invalidStatus: true }, null);
    }

    // combine all conditions
    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY i.item_id ASC LIMIT ? OFFSET ?";
    params.push(Number(limit), Number(offset));

    db.all(sql, params, (err, rows) => {
        if (err) return done(err, null);
        return done(null, rows);
    });
}

const createItem = (name, description, starting_bid, end_date, creator_id, image_url, done) => {
    const sql = `INSERT INTO items (name, description, starting_bid, start_date, end_date, creator_id, image_url) VALUES (?, ?, ?, strftime('%s','now'), ?, ?, ?)`;
    const values = [name, description, starting_bid, end_date, creator_id, image_url || null];

    db.run(sql, values, function (err) {
        if (err) return done(err, null);
        return done(null, this.lastID);
    });
}

const itemDetails = (item_id, done) => {
    const sql = `SELECT i.*, u.first_name AS seller_first_name, u.last_name AS seller_last_name
                 FROM items i
                 JOIN users u ON i.creator_id = u.user_id
                 WHERE i.item_id=?
                `;

    db.get(sql, [item_id], (err, itemRow) => {
        if (err) return done(err);
        if (!itemRow) {
            console.log("here", itemRow)
            return done(null, null);
        } 
        const bidSql = `SELECT b.user_id, b.amount AS current_bid,
                               u.first_name AS bidder_first_name, u.last_name AS bidder_last_name
                        FROM bids b
                        JOIN users u ON b.user_id = u.user_id
                        WHERE b.item_id=?
                        ORDER BY b.amount DESC, b.timestamp DESC
                        LIMIT 1
                        `;

        db.get(bidSql, [item_id], (err2, bidRow) => {
            if (err2) return done(err2);
            const results = {
                item_id: itemRow.item_id,
                name: itemRow.name,
                description: itemRow.description,
                starting_bid: itemRow.starting_bid,
                start_date: itemRow.start_date,
                end_date: itemRow.end_date,
                creator_id: itemRow.creator_id,
                image_url: itemRow.image_url,
                first_name: itemRow.seller_first_name,
                last_name: itemRow.seller_last_name,
                current_bid: bidRow ? bidRow.current_bid: itemRow.starting_bid,
                current_bid_holder: bidRow ? {
                    user_id:bidRow.user_id,
                    first_name: bidRow.bidder_first_name,
                    last_name: bidRow.bidder_last_name
                } : null
            }

            const categorySql = `SELECT c.category_id, c.name
                                 FROM categories c
                                 JOIN item_categories ic ON ic.category_id = c.category_id
                                 WHERE ic.item_id=?
                                 ORDER BY c.name
                                 `;

            db.all(categorySql, [item_id], (err3, catRows) => {
                if (err3) return done(err3);
                results.categories = catRows;
                return done(null, results);
            });
        });
    });
}

const placeBid = (user_id, item_id, amount, done) => {
    const sql = `INSERT INTO bids (user_id, item_id, amount, timestamp) VALUES (?, ?, ?, strftime('%s','now'))`;
    
    db.run(sql, [user_id, item_id, amount], function (err) {
        if (err) return done(err);
        return done(null);
    });
}

const bidHistory = (item_id, done) => {
    const sql = `SELECT b.item_id, b.amount, b.timestamp,
                        u.user_id, u.first_name, u.last_name
                FROM bids b
                JOIN users u ON b.user_id = u.user_id
                WHERE b.item_id=?
                ORDER BY b.amount DESC, b.timestamp DESC
                LIMIT 2
                `;

    db.all(sql, [item_id], (err, rows) => {
        if (err) return done(err);
        return done(null, rows);
    });
}

module.exports = { createItem, itemDetails, placeBid, bidHistory, searchItem };
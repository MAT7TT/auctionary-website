const crypto = require("crypto");
const db = require("../../database");


const getHash = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex');
}

const addNewUser = (first_name, last_name, email, password , done) => {
  const salt = crypto.randomBytes(64);
  const hash = getHash(password, salt);

  const sql = `INSERT INTO users (first_name, last_name, email, password, salt) VALUES (?, ?, ?, ?, ?)`;
  let values = [first_name, last_name, email, hash, salt.toString('hex')];
  
  db.run(sql, values, function (err) {
    if (err) return done(err, null);
    return done(null, this.lastID);
    }
  );
}

const authenticateUser = (email, password, done) => {
  const sql = 'SELECT user_id, password, salt FROM users WHERE email=?'

  db.get(sql, [email], (err, row) => {
    if(err) return done(err);
    if(!row) return done(null, false);

    if(row.salt === null) row.salt = '';
    let salt = Buffer.from(row.salt, 'hex');

    if (row.password === getHash(password, salt)) {
      return done(false, row.user_id);
    } else {
      return done(null, false);
    }
  });
}

const getUserById = (user_id, done) => {
  const userSql = `SELECT user_id, first_name, last_name FROM users WHERE user_id=?`;
  db.get(userSql, [user_id], (err, userRow) => {
    if (err) return done(err);
    if (!userRow) return done(null, null);

    const sellingSql = `SELECT i.item_id, i.name, i.description, i.end_date, i.creator_id,
                            i.image_url, u.first_name, u.last_name
                     FROM items i
                     JOIN users u ON i.creator_id = u.user_id
                     WHERE i.creator_id=?
                     `;

    db.all(sellingSql, [user_id], (err2, sellingRow) => {
      if (err2) return done(err2);

      const biddingSql = `SELECT DISTINCT i.item_id, i.name, i.description, i.end_date, i.creator_id,
                                          i.image_url, u.first_name, u.last_name
                          FROM bids b
                          JOIN items i ON b.item_id = i.item_id
                          JOIN users u ON i.creator_id = u.user_id
                          WHERE b.user_id=? AND i.end_date > strftime('%s','now')
                          `;
      db.all(biddingSql, [user_id], (err3, biddingRow) => {
        if (err3) return done(err3);

        const auctEndedSql = `SELECT DISTINCT i.item_id, i.name, i.description, i.end_date, i.creator_id,
                                              i.image_url, u.first_name, u.last_name
                              FROM bids b
                              JOIN items i ON b.item_id = i.item_id
                              JOIN users u ON i.creator_id = u.user_id
                              WHERE b.user_id=? AND i.end_date <= strftime('%s','now')
                              `;
        db.all(auctEndedSql, [user_id], (err4, auctEndedRow) => {
        if (err4) return done(err4);
        
        const results = {
            user_id: userRow.user_id,
            first_name: userRow.first_name,
            last_name: userRow.last_name,
            selling: Array.isArray(sellingRow) ? sellingRow : [],
            bidding_on: Array.isArray(biddingRow) ? biddingRow : [],
            auctions_ended: Array.isArray(auctEndedRow) ? auctEndedRow : []
          };
            return done(null, results);
        });
      });
    });
  });
}

const getToken = (id, done) => {
  const sql = `SELECT session_token FROM users WHERE user_id=?`;

  db.get(sql, [id], (err, row) => {
    if (err) return done(err);
    if (!row) return done(null, null);
    return done(null, row.session_token);
  });
}

const setToken = (id, done) => {
  let token = crypto.randomBytes(16).toString('hex');
  const sql = `UPDATE users SET session_token=? WHERE user_id=?`;

  db.run(sql, [token, id], (err) => {
    if (err) return done(err);
    return done(null, token);
  })
}

const removeToken = (token, done) => {
  const sql = `UPDATE users SET session_token=null WHERE session_token=?`;

  db.run(sql, [token], function (err) {
    if (err) return done(err);
    if (this.changes === 0) return done(null, false);
    return done(null, true);
  })
}

const getIdFromToken = (token, done) => {
  const sql = `SELECT user_id FROM users WHERE session_token=?`;

  db.get(sql, [token], (err, row) => {
    if (err) return done(err);
    if (!row) return done(null, null);
    return done(null, row.user_id);
  });
};

module.exports = { getHash, addNewUser, authenticateUser, getToken, setToken, removeToken, getIdFromToken, getUserById};
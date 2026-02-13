const Joi = require("joi");
const category = require("../models/categories.server.models");
const core = require("../models/core.server.models");
const users = require("../models/user.server.models");
const { containsProfanity } = require("../lib/profanity");

const search = (req, res) => {

    const token = req.get("X-Authorization");

    users.getIdFromToken(token, (err, id) => {
        if (err) return res.sendStatus(500);

        const { q = "", status = null, limit = 10, offset = 0, category_id = null } = req.query;

        const validStatuses = ["OPEN", "BID", "ARCHIVE"];
        if (status && !validStatuses.includes(status)) return res.sendStatus(400);
        if (!id && status) return res.sendStatus(400);

        core.searchItem(q, status, limit, offset, id, category_id, (err, results) => {
            if (err) return res.sendStatus(500);
            return res.status(200).json(results || []);
        });
    });
}

const create = (req, res) => {
    const schema = Joi.object({
        name:         Joi.string().trim().min(1).required().messages({ 'string.empty': 'Item name is required', 'any.required': 'Item name is required' }),
        description:  Joi.string().trim().min(1).required().messages({ 'string.empty': 'Description is required', 'any.required': 'Description is required' }),
        starting_bid: Joi.number().strict().greater(0).required().messages({ 'number.base': 'Starting bid must be a number', 'number.greater': 'Starting bid must be greater than 0', 'any.required': 'Starting bid is required' }),
        end_date:     Joi.number().integer().greater(Math.floor(Date.now() / 1000)).required().messages({ 'number.base': 'End date must be a valid timestamp', 'number.greater': 'End date must be in the future', 'any.required': 'End date is required' }),
        image_url:    Joi.string().uri().allow(null, "").optional().messages({ 'string.uri': 'Image URL must be a valid URL' }),
        categories:   Joi.array().items(Joi.number().integer().positive()).optional().messages({ 'array.base': 'Categories must be an array of category IDs' })
    });

    const { error } = schema.validate(req.body, { errors: { wrap: { label: false } } });
    if(error) return res.status(400).json({ error_message: error.details[0].message });

    const { name, description, starting_bid, end_date, categories, image_url } = req.body;
    if (containsProfanity(name) || containsProfanity(description)) {
        return res.status(403).json({ error_message: "Profanity is not allowed" });
    }
    const creator_id = req.user_id;

    core.createItem(name, description, starting_bid, end_date, creator_id, image_url, (err, item_id) => {
        if (err) return res.sendStatus(500);
        
        category.addItemCategories(item_id, categories || [], (err2) => {
                if (err2) return res.sendStatus(500);
                return res.status(201).json({ item_id: item_id });
            });
      });
}

const item_details = (req, res) => {
    const item_id = parseInt(req.params.item_id, 10);

    core.itemDetails(item_id, (err, item) => {
        if (err) return res.sendStatus(500);
        if (!item) return res.sendStatus(404);
        return res.status(200).json(item);
    });
}

const place_bid = (req, res) => {
    const schema = Joi.object({
        amount: Joi.number().greater(0).required()
    });

    const { error } = schema.validate(req.body, { errors: { wrap: { label: false } } });
    if (error) return res.status(400).json({ error_message: error.details[0].message });
    
    const user_id = req.user_id;
    const item_id = parseInt(req.params.item_id, 10);
    const { amount } = req.body;

    core.itemDetails(item_id, (err, item) => {
        if (err) return res.senStatus(500);
        if (!item) return res.sendStatus(404);

        const now = Math.floor(Date.now() / 1000);

        if (item.end_date <= now) {
            return res.status(405).json({ error_message: "This auction has ended"})
        }

        if (item.creator_id === user_id) {
            return res.status(403).json({ error_message: "You cannot bid as the seller on this item"});
        }

        core.bidHistory(item_id, (err2, bids) => {
            if (err2) return res.status(500).json({ error_message: "Server error" });
            const latestBidAmount = bids.length > 0 ? bids[0].amount : item.starting_bid;
            
            if (amount <= latestBidAmount) {
                return res.status(400).json({ error_message: "Bid must be higher than the current highest bid"});
            }

            core.placeBid(user_id, item_id, amount, (err3) => {
                if (err3) return res.sendStatus(500);
                return res.status(201).json({ message: "Bid Received"});
            });
        });
    });
}

const bid_history = (req, res) => {
    const item_id = parseInt(req.params.item_id, 10);

    core.itemDetails(item_id, (err, item) => {
        if (err) return res.sendStatus(500);
        if (!item) return res.sendStatus(404);

        core.bidHistory(item_id, (err2, bids) => {
            if (err2) return res.sendStatus(500)
            return res.status(200).json( bids || [] );
        });
    });
}

module.exports = {
    search: search,
    create: create,
    item_details: item_details,
    place_bid: place_bid,
    bid_history: bid_history
}
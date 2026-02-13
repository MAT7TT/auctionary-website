const Filter = require('bad-words');
const filter = new Filter;

const containsProfanity = (text) => {
    return filter.isProfane(text);
}

module.exports = { containsProfanity };
const crypto = require("crypto");

const password = "Password#123";
const saltHex = "0a1817cb52aa3a27ee36aea8f5215984eec7cc454da2732ef3952cd7db282fcf67f2abb06aa1d75f34cbc06c29dfe8a34b0de606ea78d1776e28279faa189339";

const salt = Buffer.from(saltHex, "hex");

const hash = crypto
  .pbkdf2Sync(password, salt, 100000, 256, "sha256")
  .toString("hex");

console.log("HASH:\n", hash);
console.log("LENGTH:", hash.length);

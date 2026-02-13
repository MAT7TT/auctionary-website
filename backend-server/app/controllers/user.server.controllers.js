const Joi = require("joi");
const users = require("../models/user.server.models");

const create_account = (req, res) => {
  const schema = Joi.object({
    first_name: Joi.string().trim().min(1).required().messages({ 'string.empty': 'First name is required', 'any.required': 'First name is required' }),
    last_name:  Joi.string().trim().min(1).required().messages({ 'string.empty': 'Last name is required', 'any.required': 'Last name is required' }),
    email:      Joi.string().trim().email({ tlds: { allow: false } }).required().messages({ 'string.email': 'Email must be a valid email address', 'string.empty': 'Email is required', 'any.required': 'Email is required' }),
    password:   Joi.string()
                    .min(8).max(30)
                    .pattern(/[a-z]/,  'lowercase')
                    .pattern(/[A-Z]/,  'uppercase')
                    .pattern(/[0-9]/,  'digits')
                    .pattern(/[^A-Za-z0-9]/, 'special')
                    .required().messages({ 'string.empty': 'Password is required', 'string.min': 'Password must be at least 8 characters long', 'string.max': 'Password must be no more than 30 characters long', 'string.pattern.name': 'Password must include uppercase, lowercase, a number, and a special character', 'any.required': 'Password is required' })
  });

  const { error } = schema.validate(req.body, { errors: { wrap: { label: false } } });
  if (error) return res.status(400).json({ error_message: error.details[0].message });

  const { first_name, last_name, email, password } = req.body;

  users.addNewUser(first_name, last_name, email, password, (err, user_id) => {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        return res.status(400).json({ error_message: "Email already in use"});
      }
      return res.sendStatus(500);
    }
    return res.status(201).json({ user_id: user_id });
  });
}

const login = (req, res) => {
  const schema = Joi.object({
    email:    Joi.string().trim().email({ tlds: { allow: false } }).required().messages({ 'string.email': 'Email must be a valid email address', 'string.empty': 'Email is required', 'any.required': 'Email is required' }),
    password: Joi.string().min(1).required().messages({ 'string.empty': 'Password is required', 'any.required': 'Password is required' })
  });

  const { error } = schema.validate(req.body, { errors: { wrap: { label: false } } });
  if (error) return res.status(400).json({ error_message: error.details[0].message });

  users.authenticateUser(req.body.email, req.body.password, (err, id) => {
    if (err) return res.sendStatus(500);
    if (!id) return res.status(400).json({ error_message: "Invalid email/password supplied" });
    
    users.getToken(id, (err2, token) => {
      if (err2) return res.sendStatus(500);

      if (token) {
        return res.status(200).json({user_id: id, session_token: token});
      } else {
        users.setToken(id, (err3, newToken) => {
          if (err3) return res.sendStatus(500);
          return res.status(200).json({user_id: id, session_token: newToken});
        })
      }
    })
  });
}

const getInfo = (req, res) => {
  const user_id = parseInt(req.params.user_id, 10);

  users.getUserById(user_id, (err, user) => {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(404);
    return res.status(200).json(user);
  })
}

const logout = (req, res) => {
  const token = req.get("X-Authorization");
  if (!token) return res.sendStatus(401);

  users.getIdFromToken(token, (err, id) => {
    if (err) return res.sendStatus(500);
    if (!id) return res.sendStatus(401);

    users.removeToken(token, (err2, removed) => {
    if (err2) return res.sendStatus(500);
    if (!removed) return res.sendStatus(401);
    return res.sendStatus(200);
    });
  });
}

module.exports = { create_account, login, getInfo, logout };

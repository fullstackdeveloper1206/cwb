
const jwt = require('jwt-simple')
const { IncomingForm } = require('formidable')
const xml2js = require('xml2js');
const moment = require("moment")
const md5 = require('md5');
const fs = require('fs');
var mongoose = require('mongoose');

const Admins = require('../../models/admins')
const Accounts = require('../../models/accounts')
const Users = require('../../models/users')
const Keys = require('../../models/keys')

const { fileStore, fileDelete } = require('../file');


const adminKey = 'abcdef'
const idLen = 8
const createToken = (id) => {
  return jwt.encode({ _id: id }, adminKey)
}

const login = async (req, res) => {
  try {
    var { email, password } = req.body
    password = md5(password)
    var admin = await Admins.findOne({ email: email, password: password })
    if (!admin) return res.status(400).json({ success: false, error: 'Email or password is incorrect' })
    if (!admin.active) return res.status(400).json({ success: false, error: 'Account is inactive currently' })
    res.status(200).json({ success: true, token: createToken(admin._id) })
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, error: 'Unexpected error occured' })
  }
}
const authenticate = async (req, res, next) => {
  var token = req.headers.authorization;
  try {
    var payload = jwt.decode(token, adminKey);
    var admin = await Admins.findById(payload._id);
    req.body.admin = admin;

    next();
  } catch (e) {
    res.status(200).json({ success: false, error: e.message });
  }
}
const loginjwt = async (req, res) => {
  try {
    const id = req.body.admin._id
    const admin = await Admins.findById(id)
    if (!admin) return res.status(200).json({ success: false, error: 'Invalid admin' })
    return res.status(200).json({
      success: true,
      token: createToken(admin._id),
      profile: {
        fullName: admin.fullName,
        imgPath: admin.imgPath
      }
    })
  } catch (e) {
    console.log(e)
    res.status(200).json({ success: false, error: 'Unexpected error occured' })
  }
}
const resetPwd = async (req, res) => {
  try {
    const { oldPwd, newPwd } = req.body
    const id = req.body.admin._id
    var admin = await Admins.findById(id)
    if (admin.password != md5(oldPwd))
      return res.status(400).json({ success: false, error: 'Current password doesn\'t match with old one.' })
    admin.password = md5(newPwd)
    await admin.save()
    return res.status(200).json({ success: true })

  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, error: 'Unexpected error occured' })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await Users.find()
    res.json({ success: true, result: users })
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, error: 'Unexpected error occured' })

  }
}
const addUser = async (req, res) => {
  try {
    const { username } = req.body
    const user = await Users.create({ username })
    res.json({ success: true, result: user })
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, error: 'Unexpected error occured' })

  }
}
const getAccount = async (req, res) => {
  try {
    const { userId, shopId } = req.body
    const account = await Accounts.findOne({ userId, shopId })
    const keys = await Keys.findOne({userId})
    res.json({ success: true, result: account, keys })
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, error: 'Unexpected error occured' })
  }
}
const saveAccount = async (req, res) => {
  try {
    const { userId, shopId, username, password, keywords } = req.body
    var account = await Accounts.findOne({ userId, shopId })
    if (!account) account = await Accounts.create({ userId, shopId, username, password, keywords, running: false })
    else
      account = await Accounts.findOneAndUpdate({ userId, shopId }, { username, password, keywords })
    res.json({ success: true, result: account })
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, error: 'Unexpected error occured' })
  }
}
const saveAPIKeys = async (req, res) => {
  try {
    console.log('here')
    const { userId, twitterAPIKey, discordAPIKey, lineAPIKey } = req.body
    console.log(twitterAPIKey, discordAPIKey, lineAPIKey)
    var keys = await Keys.findOne({ userId })
    if (!keys) keys = await Keys.create({ userId, twitterAPIKey, discordAPIKey, lineAPIKey })
    else
    keys = await Keys.findOneAndUpdate({ userId }, { twitterAPIKey, discordAPIKey, lineAPIKey})
    res.json({ success: true, result: keys })
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, error: 'Unexpected error occured' })
  }
}
const toggleBotStatus = async (req, res) => {
  try {
    const { userId, shopId, status } = req.body;
    var account = await Accounts.findOne({ userId, shopId });
    if (!account) return res.json({ success: false, error: 'Account not exists' });
    if (account.running == status) return res.json({ success: false, error: 'Bot already ' + (status ? 'running' : 'stopped') });
    var lastStarted = status ? moment() : null
    await Accounts.findOneAndUpdate({ userId, shopId }, { running: status, lastStarted })
    account = await Accounts.findOne({ userId, shopId });
    res.json({ success: true, result: account })
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, error: 'Unexpected error occured' })
  }
}

module.exports = {
  login,
  authenticate,
  loginjwt,
  resetPwd,
  getUsers,
  addUser,
  getAccount,
  saveAPIKeys,
  saveAccount,
  toggleBotStatus
}
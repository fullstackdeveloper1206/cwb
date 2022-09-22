const md5 = require('md5');
var mongoose = require('mongoose');
var constants = require('../app/constants');
var Admins = require('../models/admins');
var Users = require('../models/users');
var Inventories = require('../models/inventories');
var Customers = require('../models/customers')
var Contracts = require('../models/contracts')
mongoose.connect(constants.dburl, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
  var admin = [{
    email: 'admin',
    password: md5('admin'),
    role: 0,
    active: true
  }]
  await Admins.collection.deleteMany();
  await Admins.collection.insertMany(admin);

  // var contracts = []
  // for (let i = 0; i < 20; i++) {
  //   contracts.push(
  //     {
  //       _id: i.toString().padStart(6, '0') + '220302' + '00',
  //       name: 'Contract ' + i.toString(),
  //       channelId: '01',
  //       customerId: i.toString().padStart(6, '0'),
  //       contractValidFrom: null,
  //       contractValidTo: null,
  //       msgValidFrom: null,
  //       msgValidTo: null,
  //       message: 'Contract',
  //       branches: ['0000', '0001', '0002'],
  //       contractStatus: 0,
  //       proofOfPrint: '',
  //       totalPrints: 10,
  //       contractMessage: 'Contract message' + i.toString(),
  //       contractWebsite: 'Contract website' + i.toString(),
  //       contractSocialMedia: 'Contract social media' + i.toString(),
  //       contractLogo: '',
  //       unitPrice: 10,
  //       paymentDay: 31,
  //       contractPdf: '',
  //       salesPersonId: '',
  //       paymentMethod: 0,
  //       paymentUrl: ''
  //     }
  //   )
  // }
  // await Contracts.deleteMany()
  // await Contracts.insertMany(contracts)
  process.exit(0);
});
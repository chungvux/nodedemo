const httpStatus = require('http-status');
const {
  Clan
} = require('../models');

const {
  clanService,
  userService
} = require('../services')

const getClan = async (req, res) => {
  const clans = await clanService.getClan();

  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: clans
  })
}
const getOneClan = async (req, res) => {
  const {
    idClan
  } = req.body;
  const clan = await clanService.getOneClan(idClan);

  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: clan
  })
}
const createClan = async (req, res) => {
  const {
    name,
    avatar,
    language,
    requiredPoint
  } = req.body;
  const address = req.wallet.Address;
  const user = await userService.getUserByAddress(address);
  const newClan = await clanService.addClan(name, avatar, language, user.Username, requiredPoint, address)
  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: 'Successfully !!!',
  })
}
const search = async (req, res) => {
  const {
    name
  } = req.body;
  const clan = await clanService.findClan(name);
  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: clan
  })
}

const attendClan = async (req, res) => {
  const address = req.wallet.Address;
  const {
    idClan
  } = req.body;

  const clan = await clanService.getOneClan(idClan);
  if (!clan) res.status(404).json({
    status: true,
    code: httpStatus[200],
    message: 'Not Found',
  })

  clan.waitingMember.push(address);
  await clan.save();
  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: 'Successfully !!!',
  })
}

const approveMember = async (req, res) => {
  const {
    isSelectAll,
    addresses,
    idClan
  } = req.body;
  const owner = req.wallet.Address;
  const clan = await clanService.getOneClan(idClan);
  if (!clan) res.status(404).json({
    status: true,
    code: httpStatus[200],
    message: 'Not Found',
  });

  if (!(clan.member[0] == owner)) res.status(401).json({
    Error: "You are not authorization"
  });

  if (isSelectAll) {
    for (let i = 0; i < clan.waitingMember.length; i++) {
      clan.member.push(clan.waitingMember[i]);
      clan.waitingMember.splice(i, 1);
    }
  } else {
    addresses.forEach(address => {
      const waitingAddr = clan.waitingMember.find(addr => addr == address);
      console.log(waitingAddr)
      if (waitingAddr) {
        clan.member.push(waitingAddr);
        const index = clan.waitingMember.indexOf(waitingAddr);
        clan.waitingMember.splice(index, 1);
      }
    });
  }

  await clan.save();

  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: 'Successfully !!!',
  })
}



module.exports = {
  getClan,
  getOneClan,
  createClan,
  search,
  approveMember,
  attendClan
}

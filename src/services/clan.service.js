const {
  Clan
} = require('../models');

const getClan = async (idClan) => {
  const clan = await Clan.find();
  return clan
}
const getOneClan = async (idClan) => {
  const clan = await Clan.findOne({ _id: idClan });
  return clan
}

const addClan = async (name, avatar, language, owner, requiredPoint, address) =>
{
  const newClan = new Clan({
    name,
    avatar,
    language,
    owner,
    requiredPoint,
  });
  newClan.member.push(address);
  await newClan.save();
}

const findClan = async (name) =>
{
  const clan = await Clan.find({
    'name': {
      '$regex': name,
      '$options': 'i'
    }
  });

  return clan
}


module.exports = {
  getOneClan,
  addClan,
  findClan,
  getClan
}

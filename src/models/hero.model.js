const TYPE = {
  Warrior: 'Warrior',
  Support: 'Support',
  Tanker: 'Tanker',
  Sniper: 'Sniper',
};

const COMMON_HERO = {
  1: {
    name: 'Berry',
    type: TYPE.Warrior,
    description: 'Tac ke',
  },
  2: {
    name: 'Sonic',
    type: TYPE.Warrior,
    description: 'Doi',
  },
  3: {
    name: 'Bunnie',
    type: TYPE.Warrior,
    description: 'Tho',
  },
  4: {
    ame: 'Denis',
    type: TYPE.Support,
    description: 'Hai ly',
  },
  5: {
    name: 'Bliz',
    type: TYPE.Support,
    description: 'Than lan',
  },
  6: {
    name: 'Tote',
    type: TYPE.Tanker,
    description: 'Rua',
  },
  7: {
    name: 'Dory',
    type: TYPE.Sniper,
    description: 'Hong hac',
  },
};

const RARE_HERO = {
  1: {
    name: 'Tygar',
    type: TYPE.Warrior,
    description: 'Ho',
  },
  2: {
    name: 'Dumbo',
    type: TYPE.Tanker,
    description: 'Voi',
  },
  3: {
    name: 'Geoffrey',
    type: TYPE.Sniper,
    description: 'Huou cao co',
  },
  4: {
    ame: 'Adler',
    type: TYPE.Warrior,
    description: 'Chim ung',
  },
  5: {
    name: 'Claws',
    type: TYPE.Support,
    description: 'Cua',
  },
};

const EPIC_HERO = {
  1: {
    name: 'Panpan',
    type: TYPE.Sniper,
    description: 'Gau truc',
  },
  2: {
    name: 'Crocky',
    type: TYPE.Warrior,
    description: 'Ca sau',
  },
  3: {
    name: 'Archer',
    type: TYPE.Support,
    description: 'Vet',
  },
  4: {
    name: 'Sharky',
    type: TYPE.Support,
    description: 'Ca map',
  },
};

const LEGENDARY_HERO = {
  1: {
    name: 'Mr.Pi',
    type: TYPE.Warrior,
    description: 'Linh vat du an',
  },
  2: {
    name: 'Leo',
    type: TYPE.Tanker,
    description: 'Su tu',
  },
};

const RATITY = ['Common', 'Rare', 'Epic', 'Legendary'];

const SKIN = ['Origin', 'Chromas', 'Prestige'];

module.exports = {
  TYPE,
  COMMON_HERO,
  RARE_HERO,
  EPIC_HERO,
  LEGENDARY_HERO,
  RATITY,
  SKIN,
};

const CURRENCCY = {
  HBG: 'HBG',
  USD: 'USD',
};

const BOX = {
  Silver: {
    Type: 'Silver',
    Price: 480,
    Unit: CURRENCCY.HBG,
    Ratio: 0.7635,
  },
  Gold: {
    Type: 'Gold',
    Price: 1989,
    Unit: CURRENCCY.HBG,
    Ratio: 0.1832,
  },
  Platinum: {
    Type: 'Platinum',
    Price: 9943,
    Unit: CURRENCCY.HBG,
    Ratio: 0.0366,
  },
  Diamond: {
    Type: 'Diamond',
    Price: 21875,
    Unit: CURRENCCY.HBG,
    Ratio: 0.0167,
  },
};

const SKIN_RARITY = {
  Origin: 0.7,
  Chromas: 0.29,
  Prestige: 0.01,
};

const RATION_SKIN_BOX = {
  Silver: {
    Common: 0.95,
    Rare: 0.05,
    Epic: 0,
    Legend: 0,
  },
  Gold: {
    Common: 0.25,
    Rare: 0.7,
    Epic: 0.05,
    Legend: 0,
  },
  Platinum: {
    Common: 0,
    Rare: 0.25,
    Epic: 0.7,
    Legend: 0.05,
  },
  Diamond: {
    Common: 0,
    Rare: 0,
    Epic: 0.7,
    Legend: 0.3,
  },
};

module.exports = {
  BOX,
  SKIN_RARITY,
  RATION_SKIN_BOX,
  CURRENCCY,
};

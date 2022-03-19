const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService,
  userService,
  tokenService,
  emailService,
  historyLoginService
} = require('../services');

const TreeContractModel = require('../models/treeContract.model')
const TreeModel = require('../models/tree.model')
const {
  generateJWT
} = require('../middlewares/jwtAuth')
const bcrypt = require('bcrypt')
const {
  web3,
  checkUpline,
  getRootAddress,
  decoder,
  getToken
} = require('../Function/web3')
// const {
//   BEP20
// } = require('../../Config/BEP20')
const {
  registerEmailSchema,
  changePasswordSchema,
  changeUsernameSchema
} = require('../validations/auth.validation');
const {
  Contract_HBG
} = require('../config/Contract/contract')
const fs = require('fs')

const PresaleSetting = require('../models/PresaleSettingModel')
const Presale = require('../models/PresaleModel')
const PresaleClaim = require('../models/PresaleClaimModel')






const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({
    user,
    tokens
  });
});

const login = catchAsync(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);

  res.json(user)
});

const inputCode = catchAsync(async (req, res) => {
  const {
    user,
    code
  } = req.body;

  const isCode = await historyLoginService.compareCode(user.Address, code);
  if (isCode) {
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(200).json({
      token: tokens.access.token
    });
  } else {
    res.status(400).json('Wrong Code')
  }

})

const logout = catchAsync(async (req, res) => {
  const address = req.wallet.Address;
  const status = await authService.logout(address);
  res.status(200).json({
    status
  });
});

//

async function registerSystem(req, res) {
  try {
    var {
      wallet,
      sponsor
    } = req.body
    var check_wallet = await web3.utils.isAddress(wallet)
    var check_sponsor = await web3.utils.isAddress(sponsor)
    if (!check_wallet)
      return res.status(200).json({
        status: false,
        message: "wallet is not correct"
      })
    wallet = wallet.toLowerCase()
    check_wallet = await TreeModel.findOne({
      Address: wallet
    })
    if (!check_sponsor && sponsor != "")
      return res.status(200).json({
        status: false,
        message: "sponsor is not correct"
      })
    var ID
    var lastest_data = await TreeModel.find().sort({
      ID: -1
    }).limit(1)
    lastest_data.length > 0 ? ID = lastest_data[0].ID + 1 : ID = 1
    if (!check_sponsor) {
      check_sponsor = {}
      check_sponsor.Wallet = []
    } else {
      sponsor = sponsor.toLowerCase()
      check_sponsor = await TreeModel.findOne({
        Address: sponsor
      })
      if (!check_sponsor)
        return res.status(200).json({
          status: false,
          message: "sponsor is not found"
        })
    }
    check_sponsor.Wallet.unshift(ID)
    if (!check_wallet) {
      await new TreeModel({
        ID: ID,
        Wallet: check_sponsor.Wallet,
        Address: wallet
      }).save()
    }
    check_sponsor = await TreeContractModel.findOne({
      Address: sponsor
    })
    if (!check_sponsor)
      return res.status(200).json({
        status: false,
        message: "sponsor is not active"
      })
    return res.status(200).json({
      status: true,
      message: ''
    })

  } catch (error) {
    console.log(error)
    return res.status(200).json({
      status: false,
      message: error.message,
      data: {
        registed: false
      }
    })
  }
}

async function registerEmail(req, res) {
  try {
    var {
      Email,
      Password
    } = req.body
    var is_email = await TreeContractModel.findOne({
      Email: Email
    })
    if (is_email)
      return res.status(200).json({
        status: false,
        message: `Email already exit.`
      })
    var salt = await bcrypt.genSaltSync(10)
    var hash = await bcrypt.hashSync(Password, salt)
    await new TreeContractModel({
      Email: Email,
      Password: hash
    }).save()
    return res.status(200).json({
      status: true,
      message: `Registed success`
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

async function LoginEmail(req, res) {
  try {
    var {
      email,
      password,
      battle
    } = req.body
    var find_Email = await TreeContractModel.findOne({
      Email: email
    })
    if (!find_Email)
      return res.status(200).json({
        status: false,
        message: `Email is not correct.`
      })
    if (!password)
      return res.status(200).json({
        status: false,
        message: `Password required`
      })
    var match = await bcrypt.compareSync(password, find_Email.Password);
    if (!match)
      return res.status(200).json({
        status: false,
        message: `Password is not correct.`
      })
    if (find_Email.Battle == undefined)
      find_Email.Battle = false
    if ((battle || battle == false) && find_Email.Battle == false)
      // if (battle == true || battle == false)
      return res.status(200).json({
        status: false,
        message: "You cant join battle"
      })
    find_Email.Jwt_Token = await generateJWT({
      Address: find_Email.Address
    })
    await find_Email.save()
    return res.status(200).json({
      status: true,
      data: {
        token: find_Email.Jwt_Token
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

async function loginAddress(req, res) {
  try {
    var {
      wallet,
      sign
    } = req.body
    wallet = wallet.toLowerCase()
    var is_registed = await TreeContractModel.findOne({
      Address: wallet
    })
    if (!is_registed)
      return res.status(200).json({
        status: false,
        message: `Unregistered account`
      })
    if (!sign || sign == "")
      return res.status(200).json({
        status: true,
        data: {
          sign: process.env.LOGIN_SIGN
        }
      })
    var data = await web3.eth.accounts.recover(process.env.LOGIN_SIGN, sign)
    if (data.toLowerCase() != wallet.toLowerCase()) {
      data = await web3.eth.accounts.recover(await web3.utils.toChecksumAddress(wallet), sign); //process.env.SIGN
      if (data.toLowerCase() != wallet.toLowerCase())
        return res.status(200).json({
          status: false,
          message: "Sign is not correct",
          data: {
            registed: false
          }
        })
    }
    if (is_registed.Battle == undefined)
      find_Email.Battle = false
    is_registed.Jwt_Token = await generateJWT({
      Address: is_registed.Address
    })
    await is_registed.save()
    return res.status(200).json({
      status: true,
      data: {
        token: is_registed.Jwt_Token
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

async function updateEmail(req, res) {
  var {
    email,
    password
  } = req.body
  wallet = req.User.Address
  var is_registed = await TreeContractModel.findOne({
    Address: wallet
  })
  if (!is_registed)
    return res.status(200).json({
      status: false,
      message: `Unregistered account`
    })
  else if (is_registed.Email)
    return res.status(200).json({
      status: false,
      message: `You has email`
    })
  try {
    await registerEmailSchema.validateAsync({
      email,
      password
    });
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message
    })
  }
  try {
    var check_email = await TreeContractModel.findOne({
      Email: email
    })
    if (check_email)
      return res.status(200).json({
        status: false,
        message: `Email has used.`
      })
    var salt = await bcrypt.genSaltSync(10)
    var hash = await bcrypt.hashSync(password, salt)
    if (is_registed.Email == undefined) {
      await TreeContractModel.updateOne({
        Address: wallet
      }, {
        $set: {
          Password: hash,
          Email: email,
          Jwt_Token: null,
          Blocked: false
        }
      })
    } else {
      is_registed.Password = hash
      is_registed.Email = email
      await is_registed.save()
    }
    return res.status(200).json({
      status: true,
      message: `Update success`
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

async function listUser(req, res) {
  try {
    var {
      page,
      sort,
      search
    } = req.body
    wallet = req.User.Address
    // is search
    var isSearch = await web3.utils.isAddress(search)
    // order 0 tìm tuyến trên , khác 0 tìm tuyến dưới
    if (wallet != undefined) {
      wallet = wallet.toLowerCase()
    }
    var list_data = {}
    list_data.data = []
    var find_wallet = await TreeContractModel.findOne({
      Address: wallet
    })
    if (sort == undefined)
      sort = {
        ID: -1
      }
    if (!find_wallet)
      return res.status(200).json({
        status: false,
        message: `Wallet ${wallet} is not found`
      })
    var query = {
      $and: [{
        Wallet: {
          $in: find_wallet.ID
        }
      }, {
        Address: {
          $nin: find_wallet.Address
        }
      }]
    }

    var perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
    var pages = page || 1;
    var data = await TreeContractModel.find(query).select("-_id -updatedAt -__v").sort(sort)
    var member = await TreeModel.findOne({
      Address: wallet
    })
    if (!member)
      return res.status(200).json({
        status: false,
        message: `Register system first`
      })

    var final_data = {}
    final_data.downline = []
    final_data.f1 = (await TreeContractModel.find({
      "Wallet.1": member.ID
    })).length

    member = await TreeModel.find({
      $and: [{
        Wallet: {
          $in: member.ID
        }
      }, {
        Address: {
          $nin: member.Address
        }
      }]
    })

    if (isSearch) {
      user_id = req.User.ID
      var user_wallet = await TreeContractModel.findOne({
        Wallet: {
          $in: [user_id]
        },
        Address: search.toLowerCase()
      })
      if (user_wallet) {
        var index_wallet = user_wallet.Wallet.indexOf(find_wallet.ID)
        if (user_wallet.Wallet.length <= 1)
          var sponsor = {
            Address: ""
          }
        else
          var sponsor = await TreeContractModel.findOne({
            ID: user_wallet.Wallet[1]
          })
        if (user_wallet)
          final_data.downline.push({
            ID: user_wallet.ID,
            F: index_wallet,
            Address: user_wallet.Address,
            Sponsor: sponsor.Address,
            createAt: user_wallet.createdAt
          })
      }

    } else {
      for (var index = pages * perPage - perPage; index < pages * perPage; index++) {
        if (data[index]) {
          if (!isSearch) {
            var sponsor = await TreeContractModel.findOne({
              ID: data[index].Wallet[1]
            })
            var index_wallet = data[index].Wallet.indexOf(find_wallet.ID)
            final_data.downline.push({
              ID: data[index].ID,
              F: index_wallet,
              Address: data[index].Address,
              Sponsor: sponsor.Address,
              createAt: data[index].createdAt
            })
          }
        }
      }
    }

    final_data.total_page = Math.floor(data.length / perPage)
    if (data.length % perPage != 0) {
      final_data.total_page += 1
    }
    final_data.page = pages
    final_data.perpage = perPage
    final_data.length = final_data.downline.length
    final_data.total = data.length
    final_data.totalHGB = await getToken(wallet)
    final_data.totalUSD = final_data.f1 * 2.5
    final_data.totalMember = member.length
    final_data.totalMemberActive = data.length
    return res.status(200).json({
      status: true,
      message: "",
      data: final_data
    })
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      status: false,
      message: error.message
    })
  }
}

async function Register(req, res) {
  try {
    var {
      transaction
    } = req.body
    var result = await web3.eth.getTransaction(transaction)
    var input = await decoder.decodeData(result.input);
    if (input.method != 'register' || result.to.toLowerCase() != Contract_HBG.Address)
      return res.status(200).json({
        status: false,
        message: "Transaction is not correct"
      })
    var check_account = await TreeContractModel.findOne({
      Address: result.from.toLowerCase()
    })
    if (check_account)
      return res.status(200).json({
        status: false,
        message: `Account is registed`
      })
    var sponsor = "0x" + input.inputs
    if (sponsor == "0x0000000000000000000000000000000000000000")
      sponsor = "0xeccea453a9c3926da52860a8286f8c6e9e9cdeb6"
    var find_sponsor = await TreeContractModel.findOne({
      Address: sponsor
    })
    if (!find_sponsor)
      return res.status(200).json({
        status: false,
        message: `Sponsor not found.`
      })

    var ID
    var lastest_data = await TreeContractModel.find().sort({
      ID: -1
    }).limit(1)
    lastest_data.length > 0 ? ID = lastest_data[0].ID + 1 : ID = 1

    var wallet = find_sponsor.Wallet
    wallet.unshift(ID)
    await new TreeContractModel({
      ID: ID,
      Wallet: wallet,
      Address: result.from.toLowerCase()
    }).save()
    return res.status(200).json({
      status: true,
      message: "Registed success."
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

async function infoUser(req, res) {
  try {
    var data = {
      email: req.User.Email,
      address: req.User.Address,
      ID: req.User.ID,
      Username: req.User.Username
    }
    return res.status(200).json({
      status: true,
      message: "",
      data: data
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

async function changePassword(req, res) {
  var {
    new_password,
    current_password
  } = req.body
  user = req.User
  if (!user.Password || !user.Email)
    return res.status(200).json({
      status: false,
      message: `Update email first`
    })
  try {
    await changePasswordSchema.validateAsync({
      new_password,
      current_password
    });
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message
    })
  }
  try {
    var match = await bcrypt.compareSync(current_password, user.Password);
    if (!match)
      return res.status(200).json({
        status: false,
        message: `Password is not correct.`
      })
    var salt = await bcrypt.genSaltSync(10)
    var hash = await bcrypt.hashSync(new_password, salt)
    user.Password = hash
    await user.save()
    return res.status(200).json({
      status: true,
      message: "Change password success."
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

async function changeEmail(req, res) {
  var {
    email,
    password
  } = req.body
  user = req.User
  try {
    await registerEmailSchema.validateAsync({
      email,
      password
    });
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message
    })
  }
  try {
    var check_email = await TreeContractModel.findOne({
      Email: email
    })
    if (check_email)
      return res.status(200).json({
        status: false,
        message: `Email has used.`
      })
    var match = await bcrypt.compareSync(password, user.Password);
    if (!match)
      return res.status(200).json({
        status: false,
        message: `Password is not correct.`
      })
    user.Email = email
    await user.save()
    return res.status(200).json({
      status: true,
      message: "Change email success."
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

async function changeUsername(req, res) {
  var {
    username
  } = req.body
  try {
    await changeUsernameSchema.validateAsync({
      username
    });
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message
    })
  }
  try {
    var check_user = await TreeContractModel.findOne({
      Username: username
    })
    if (check_user)
      return res.status(200).json({
        status: false,
        message: `Username is used`
      })
    user = req.User
    user.Username = username
    await user.save()
    return res.status(200).json({
      status: true,
      message: `Update success`
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

async function updateBattle() {
  var null_data = []

  var data = [`0x7dc475acfd44adf4bf20bbbef25200308a26bd60`, `0xf93a3967b29f6ee873ad02f818f6d7cb9c56aab4`, `0x041099a0622414621967ff6e273291de6ef683a7`, `0x7489a06f64163b282b3e792dd2e2d9ad121d8728`, `0xb02b5a1fb1ddb8d959a95dd20da0b844caf78f70`, `0xf1fed80c1e1e78817a284d59c605109473ccddab`, `0x6bb28f1bf4ff001e9355d105ffbc22088f95d0a9`, `0x4f9ef6e4821c4c382932d5a43efd2781f7215a63`, `0xda84d0fff003267d273295a6a37fa15d0d57f92f`, `0x28724ce67dfe5a6be5172066b67744aa4e9cdce3`, `0x93cfe3711c5c2436a814187adcc2af165f8da16a`, `0xaf8fdcf3ce8f9bce7bdc07442f071ad27e77f279`, `0xbb7df262de5a360f12c01dc947cca8906103dc42`, `0xbdb6c1ca008ed8810c845e19730a4d63b7acd327`, `0xb083b9efd1d8a896383dbc339acd3c7c48873bed`, `0x3feb4a32ea00221e190463d041e0fecf594bb5c8`, `0xd628313da7f9fae2ff2341e75b325cb7b564158c`, `0x7c2d01391f0897fec4ed6675dc739b8bdb6aae6f`, `0x6ee44cc3bd3bd0b027dafc6b7c6543823c05b97b`, `0xd689d18bbc020e59b312c25577d821654d24aebc`, `0x007a1e5e568fda1cdf542c875a5a3918d194f2c1`, `0xf47bc3e35d6498bc4462677d2245104d67c8c64b`, `0xf7d4c8cfd1c91f92562f5c7166defe570ff68693`, `0x38030b94c719e6bdb4034a2cdb10171f35a60ef2`, `0x02c56131462384b3cc879cf0df6daf23dad4555d`, `0xb94449cf268ef9c8f0be23337c51ca7e400f8190`, `0xba806f83a6caad54f15a1f84e45596f282de23dc`, `0x233e4ea0e8ff726f5ca06d71cbbf85fafad79896`, `0x82122521f835549d6f067ed4cb3f1769a6b304e7`, `0x1b01d5a1ab27ad380c2e8e8b751a227d4c49d257`]

  // var find = await TreeContractModel.updateMany({}, { Battle: false })
  // console.log(find)

  for (let index = 1; index <= 20; index++) {
    // var find = await TreeContractModel.updateOne({ Address: data[index] }, {Battle: true})
    var find = await TreeContractModel.updateOne({
      Email: `test${index}@herobook.io`
    }, {
      Battle: true
    })
    // if (!find)
    //     null_data.push(data[index])
  }

  console.log("done")
}
// updateBattle()

async function test(params) {
  var data
  try {
    var datas = []
    var data = await TreeContractModel.find({
      createdAt: {
        $lte: new Date(2022, 01, 9)
      }
    })
    console.log(data.length)
    var list_wallet = await TreeContractModel.find()

    for (var index = 0; index < data.length; index++) {
      // var find_wallet = await TreeContractModel.find({ "Wallet.1": data[index].ID, createdAt: { $gte: new Date(2022, 01, 10) }})
      // console.log("index ", index)
      //     if (find_wallet.length >= 50)
      //     {
      console.log(index)
      if (data[index].Wallet.length > 1) {
        var find_id = list_wallet.find(data2 => data2.ID == data[index].Wallet[1])
        datas.push({
          Address: data[index].Address,
          Parent: find_id.Address,
          registedAt: data[index].createdAt
        })
      }
      // console.log(datas)

    }
    fs.writeFile("file.json", JSON.stringify(datas), function (err) {
      if (err) throw err;
      console.log('complete');
    })
  } catch (error) {
    console.log(error)
  }
}


async function postClaim(req, res) {
  try {
    var {
      amount_hbg,
      transaction
    } = req.body
    var address = req.User.Address
    address = address.toLowerCase();
    if (!Number(amount_hbg)) {
      return res.status(200).json({
        status: false,
        message: 'Request amount is wrong! Please check again!'
      })
    }
    amount_hbg = Number(amount_hbg);
    transaction = transaction.toLowerCase();
    check_trans = await PresaleClaim.findOne({
      Transaction: transaction
    });
    if (check_trans) {
      return res.status(200).json({
        status: false,
        message: 'The transaction already exists!'
      })
    }
    totalUnlocked = 0;
    totalClaimed = 0;
    totalUnlockedQuery = await Presale.aggregate([{
        $match: {
          Status: {
            $in: [1]
          },
          Address: address,
          Unlock: {
            $lte: new Date()
          }
        }
      },
      {
        "$unwind": {
          "path": "$Amount",
          "preserveNullAndEmptyArrays": true
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$Amount.HBG"
          }
        }
      }
      // { $group: { _id: null, "Total": { "$sum": "$firstPayment.HBG" }, } }
    ]);
    totalClaimedQuery = await PresaleClaim.aggregate([{
        $match: {
          Status: {
            $in: [1]
          },
          Address: address
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$Amount"
          }
        }
      }
    ]);
    if (totalUnlockedQuery.length)
      totalUnlocked = totalUnlockedQuery[0].total;
    if (totalClaimedQuery.length)
      totalClaimed = totalClaimedQuery[0].total;
    RemainClaim = totalUnlocked - totalClaimed;
    if (amount_hbg > RemainClaim) {
      return res.status(200).json({
        status: false,
        message: 'Amount claim is wrong!'
      })
    }
    data_presale = {
      Address: address,
      Amount: amount_hbg,
      Transaction: transaction
    };
    await new PresaleClaim(data_presale).save();
    return res.status(200).json({
      status: true,
      message: 'Success! The transaction is being confirmed!'
    })
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      status: false,
      message: error.message
    })
  }
}
async function postBuyToken(req, res) {
  try {
    var {
      type,
      amount_usdt,
      amount_bnb,
      amount_hbg,
      transaction
    } = req.body
    if (type != 'public' && type != 'presale') {
      return res.status(200).json({
        status: false,
        message: 'The form of buying tokens is wrong!'
      })
    }
    if (!Number(amount_usdt) || !Number(amount_bnb) || !Number(amount_hbg)) {
      return res.status(200).json({
        status: false,
        message: 'Request amount is wrong! Please check again!'
      })
    }
    amount_usdt = Number(amount_usdt);
    amount_bnb = Number(amount_bnb);
    amount_hbg = Number(amount_hbg);
    transaction = transaction.toLowerCase();
    check_trans = await Presale.findOne({
      Transaction: transaction
    });
    if (check_trans) {
      return res.status(200).json({
        status: false,
        message: 'The transaction already exists!'
      })
    }
    var address = req.User.Address
    presale_setting = await PresaleSetting.findOne({})
    data_presale = {
      Address: address,
      Type: type,
      Amount: {
        HBG: amount_hbg,
        BNB: amount_bnb,
        USDT: amount_usdt,
      },
      Transaction: transaction,
      Unlock: presale_setting.ClaimDate
    };
    await new Presale(data_presale).save();
    return res.status(200).json({
      status: true,
      message: 'Success! The transaction is being confirmed!'
    })

  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message
    })
  }
}
async function getUnlockSchedule(req, res) {
  try {
    var address = req.User.Address
    address = address.toLowerCase();
    data_presale = await Presale.find({
      Address: address
    })
    totalBought = 0;
    totalUnlocked = 0;
    totalClaimed = 0;
    totalBoughtQuery = await Presale.aggregate([{
        $match: {
          Status: {
            $in: [1]
          },
          Address: address
        }
      },
      {
        "$unwind": {
          "path": "$Amount",
          "preserveNullAndEmptyArrays": true
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$Amount.HBG"
          }
        }
      }
      // { $group: { _id: null, "Total": { "$sum": "$firstPayment.HBG" }, } }
    ]);
    totalUnlockedQuery = await Presale.aggregate([{
        $match: {
          Status: {
            $in: [1]
          },
          Address: address,
          Unlock: {
            $lte: new Date()
          }
        }
      },
      {
        "$unwind": {
          "path": "$Amount",
          "preserveNullAndEmptyArrays": true
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$Amount.HBG"
          }
        }
      }
      // { $group: { _id: null, "Total": { "$sum": "$firstPayment.HBG" }, } }
    ]);
    TotalRemaining = await PresaleClaim.aggregate([{
        $match: {
          Status: {
            $in: [1]
          },
          Address: address
        }
      },
      // { "$unwind": { "path": "$Amount", "preserveNullAndEmptyArrays": true } },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$Amount"
          }
        }
      }
    ]);
    if (totalBoughtQuery.length)
      totalBought = totalBoughtQuery[0].total;
    if (totalUnlockedQuery.length)
      totalUnlocked = totalUnlockedQuery[0].total;
    if (TotalRemaining.length)
      totalRemaining = TotalRemaining[0].total;
    var dataResponse = {
      UnlockSchedule: data_presale,
      TotalBought: totalBought,
      TotalRemaining: totalRemaining,
      TotalUnlocked: totalUnlocked - totalClaimed,
      TotalLocking: totalBought - totalRemaining,
    };
    return res.status(200).json({
      status: true,
      data: dataResponse
    })

  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message
    })
  }
}
async function getInfo(req, res) {
  try {
    data_presale = await PresaleSetting.findOne({});
    if (!data_presale) {
      time_start = new Date('2022-03-17');
      time_end = new Date('2022-04-17');
      time_claim = new Date('2022-05-17');
      data_presale = {
        Price: 0.044,
        MaxPresale: 90000000,
        TimeStart: time_start,
        TimeEnd: time_end,
        Requirement: ' Whitelisted Wallet',
        Vesting: 'Released at the time of TGE',
        ClaimDate: time_claim
      };
      await new PresaleSetting(data_presale).save()
    } else {
      data_presale = data_presale.toObject();
    }
    totalSaled = await Presale.aggregate([{
        $match: {
          Status: {
            $in: [0, 1]
          }
        }
      },
      // { $project: { firstPayment: {"$arrayElemAt":["$HBG",0]} } },
      {
        "$unwind": {
          "path": "$Amount",
          "preserveNullAndEmptyArrays": true
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$Amount.HBG"
          }
        }
      }
      // { $group: { _id: null, "Total": { "$sum": "$firstPayment.HBG" }, } }
    ]);
    if (totalSaled.length) {
      data_presale.TotalBought = totalSaled[0].total;
    } else {
      data_presale.TotalBought = 0;
    }
    return res.status(200).json({
      status: true,
      data: data_presale
    })
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message
    })
  }
}


module.exports = {
  register,
  login,
  inputCode,
  logout,
  // refreshTokens,
  // forgotPassword,
  // resetPassword,
  // sendVerificationEmail,
  // verifyEmail,
  registerEmail,
  LoginEmail,
  loginAddress,
  updateEmail,
  listUser,
  Register,
  infoUser,
  changePassword,
  changeEmail,
  changeUsername,
  registerSystem,
  getInfo, getUnlockSchedule, postBuyToken, postClaim
};

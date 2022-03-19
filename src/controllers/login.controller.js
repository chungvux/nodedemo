const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { TreeContract } = require('../models')
const bcrypt = require('bcrypt')
const web3 = require('../config/web3')
const { generateToken } = require('../middlewares/jwtAuth')

const loginWithEmail = catchAsync(async (req, res) => {
    try {
        var { email, password, battle } = req.body
        var find_Email = await TreeContract.findOne({ Email: email })
        if (!find_Email)
            return res.status(200).json({ status: false, message: `Email don't exist in system.` })
        if (!password)
            return res.status(200).json({ status: false, message: `Password required` })
        var match = await bcrypt.compareSync(password, find_Email.Password);
        if (!match)
            return res.status(200).json({ status: false, message: `Password is not correct.` })
        if (find_Email.Battle == undefined)
            find_Email.Battle = false
        if ((battle || battle == false) && find_Email.Battle == false)
        // if (battle == true || battle == false)
            return res.status(200).json({ status: false, message: "You cant join battle" })
        find_Email.Jwt_Token = await generateJWT({ Address: find_Email.Address })
        await find_Email.save()
        return res.status(200).json({ status: true, data: { token: find_Email.Jwt_Token } })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message })
    }
});

const loginWithAddress =catchAsync(async(req,res) => {
    try {
        var { wallet, sign } = req.body
        console.log(wallet,sign)
        wallet = wallet?.toLowerCase()
        var is_registed = await TreeContract.findOne({ Address: wallet })
        if (!is_registed)
            return res.status(200).json({ status: false, message: `Unregistered account` })
        if (!sign)
            return res.status(200).json({ status: false, message:'Sign should be required' })
        var data = await web3.eth.accounts.recover(process.env.LOGIN_SIGN, sign)
        if (data.toLowerCase() != wallet.toLowerCase()) {
            data = await web3.eth.accounts.recover(await web3.utils.toChecksumAddress(wallet), sign);//process.env.SIGN
            if (data.toLowerCase() != wallet.toLowerCase())
                return res.status(200).json({ status: false, message: "Sign is not correct", data: { registed: false } })
        }
        if (is_registed.Battle == undefined)
            find_Email.Battle = false
        is_registed.Jwt_Token = await generateToken(is_registed.Address)
        await is_registed.save()
        return res.status(200).json({ status: true, data: { token: is_registed.Jwt_Token } })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message })
    }
})


module.exports = {
    loginWithEmail,
    loginWithAddress
};

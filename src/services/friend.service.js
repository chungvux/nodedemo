const { Cart, SmallLand, BigLand, TreeContract } = require('../models');

const addFriend = async (req) => {
    const newFriend = await TreeContract.findOne({Address:req.body.address})
    if(!newFriend){
        return {
            status:false,
            message:`Don't find this user in the system`
        }
    }
    if(req.wallet.ListFriend.includes(req.body.address)){
        return {
            status:false,
            message:'Friend has been exist in your list'
        }
    }
    req.wallet.ListFriend.push(req.body.address)
    await req.wallet.save()
    return {
        status:true,
        message:'Add new friend sucessfully'
    }
};

const removeFriend = async (req) => {
    const newFriend = await TreeContract.findOne({Address:req.body.address})
    if(!newFriend){
        return {
            status:false,
            message:`Don't find this user in the system`
        }
    }
    if(!req.wallet.ListFriend.includes(req.body.address)){
        return {
            status:false,
            message:'Friend has been exist in your list'
        }
    }
    let index = req.wallet.ListFriend.indexOf(req.body.address)
    req.wallet.ListFriend.splice(index,1)
    await req.wallet.save()
    return {
        status:true,
        message:'Remove friend sucessfully'
    }
};

const listFriend = async(address) => {
    const data = await TreeContract.findOne({Address:address})
    return {
        status:true,
        listFriend:data.ListFriend
    }
}

const search = async(address) => {
    const data = await TreeContract.findOne({Address:address})
    return {
        status:true,
        listFriend:data.ListFriend
    }
}

module.exports = {
    addFriend,
    removeFriend,
    listFriend,
    search
};

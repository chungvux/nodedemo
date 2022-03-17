const { landSocket } = require('../config/Contract')
const { TreeContract, SmallLand, HistoryTransaction, BigLand } = require('../models')
const { TYPE_TRANSACTION, TYPE_ITEM  } = require('../constants/history')

landSocket.events.buyNewLand({filter:{},fromBlock :'latest'},async(err,data)=>{
    console.log("data : ",data)
    console.log("err : ",err)
    if(err){
        return
    }

    let parendId=data.returnValues[2].split('_')[0]
    let childId=data.returnValues[2].split('_')[1]

    if(parseInt(childId)<1||parseInt(childId)>100){
        console.log(`ID small land Invalid`)
    }
    const wallet = await TreeContract.findOne({Address:data.returnValues[0]})
    if(!wallet){ // check address invalid in system
        return console.log(`Address buy land don't exist in database`)
    }

    //check Small land
    const findSmallLand = await SmallLand.findOne({_id:data.returnValues[2]})
    if(findSmallLand){
        return console.log(`${data.returnValues[2]} has been belong to another user`)
    }

    //check big land
    const findBigLand = await BigLand.findOne({_id:parendId})
    if(!findBigLand){
        return console.log(`ID big land invalid`)
    }

    const newLand = new SmallLand({
        _id:data.returnValues[2],
        tokenId:data.returnValues[1],
        ownerAddress:data.returnValues[0],
        status:1,
        parentId:parendId
    })
    await newLand.save()

    const newHistory=new HistoryTransaction({
        address:data.returnValues[0],
        transactionTime:new Date(),
        transaction:TYPE_TRANSACTION.buy,
        item: TYPE_ITEM.smallland,
        status:true
    })
    await newHistory.save()
}) 

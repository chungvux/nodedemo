const express = require('express');
const { landController } = require('../../controllers');
const landValidation = require('../../validations/land.validation');
const validate = require('../../middlewares/validate');
const {
  generateJWT,
  authJwt
} = require('../../middlewares/jwtAuth');
const { LandId, BigLand,Mineral } =require('../../models')

const router = express.Router();

router
  .route('/')
  .get(validate(landValidation.getBigLands), landController.getCustomBigLand)
  .post(validate(landValidation.postAllSmallLands), landController.getCustomSmallLand);


router.route('/small/:idSmallLand').get(validate(landValidation.getOneSmallLands), landController.getOneSmallLand);

router.route('/mineral/:idMineral').get(validate(landValidation.getOneMineral), landController.getOneMineral);

router.route('/mineral').get(landController.getAllMineral);

router.route('/create-token/:address').get((req, res) => {
  const token = generateJWT(req.params.address);
  res.status(200).json({ token });
});

// router.route('/auth-token').get(authJwt, (req, res) => {
//   res.status(200).json({ success: true, data: req.wallet });
// });

// router.route('/test').post(async(req,res)=>{
//   const data= await LandId.find({})
//   //console.log(req.body.data)
//   //data[0].array=data[0].array.slice(0,54988)
//   //await data[0].save()
//   //console.log(data[0].array.length)
//   //console.log(new Set(data[0].array).size)
//   data[0].array=data[0].array.sort((a,b)=>a<b)
//   // let dataLand=data[0].array
//   // let n = dataLand.length
//   // for(let i=0;i<n-1;i++){
//   //   for(let j=i+1;j<n;){
//   //     if(dataLand[i]===dataLand[j]){
//   //       n-=1;
//   //       for(let k=j;k<n-1;k++){
//   //         dataLand[k]=dataLand[k+1]
//   //       }
//   //     }else{
//   //       j++;
//   //     }
//   //   }
//   // }
//   // console.log(n)
//   // data[0].array=dataLand.slice(0,n)
//   await data[0].save()
//   // if(data.length===0){
//   //   const newData= new LandId({
//   //     array:req.body.data
//   //   })
//   //   await newData.save()
//   // }
//   // else{
//   //   data[0].array=[...data[0].array,...req.body.data]
//   //   await data[0].save()
//   // }
//   res.status(200).json({status:'ok'})
// })

// router.route('/mineral/test').post(async(req,res)=>{
//   console.log(req.body.data)
//   const newMine=new Mineral({
//     position:req.body.data,
//     isOpen:true
//   }).save()
//   res.status(200).json({message:'ok'})
// })

router.get('/:tokenId',landController.getNFTLand)

module.exports = router;

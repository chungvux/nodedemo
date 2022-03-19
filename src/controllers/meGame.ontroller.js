const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { meService } = require('../services');

const getAllHero = catchAsync(async (req, res) => {
    const data = await meService.getMyHero(req.wallet.Address)
    console.log(data)
    res.status(httpStatus.OK).json({ status: true, heros: data });
});

const getOneHero = catchAsync(async (req, res) => {
    const data = await meService.getOneMyHero(req.wallet.Address,req.params.idHero)
    res.status(httpStatus.OK).json({ status: true, heros: data });
});


module.exports = {
    getAllHero,
    getOneHero
};

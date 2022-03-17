const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { miningService } = require('../services');

const claim = catchAsync(async (req, res) => {
    const data = await miningService.claim(req)
    res.status(httpStatus.OK).json(data);
});

const start = catchAsync(async (req, res) => {
    const data = await miningService.start(req)
    res.status(httpStatus.OK).json(data);
});

const end = catchAsync(async (req, res) => {
    const data = await miningService.end(req)
    res.status(httpStatus.OK).json(data);
});

const changeHero = catchAsync(async (req, res) => {
const data = await miningService.changeHero(req)
    res.status(httpStatus.OK).json(data);
});


module.exports = {
    claim,
    start,
    end,
    changeHero
};

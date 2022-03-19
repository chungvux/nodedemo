const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { friendService } = require('../services');

const addFriend = catchAsync(async (req, res) => {
    const data = await friendService.addFriend(req);
    res.status(httpStatus.OK).json(data);
});

const removeFriend = catchAsync(async (req, res) => {
    const data = await friendService.removeFriend(req);
    res.status(httpStatus.OK).json(data);
});

const listFriend = catchAsync(async (req, res) => {
    const data = await friendService.listFriend(req.wallet.Address);
    res.status(httpStatus.OK).json(data);
});

const search = catchAsync(async (req, res) => {
    const data = await friendService.search();
    res.status(httpStatus.OK).json(data);
});

module.exports = {
    addFriend,
    removeFriend,
    listFriend,
    search
};

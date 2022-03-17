const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cartService } = require('../services');

const getCart = catchAsync(async (req, res) => {
  console.log(req.wallet.Address)
  console.log('vo day ko')
  const carts = await cartService.getCartUser(req.wallet.Address);
  res.status(httpStatus.OK).json({ status: true, data: carts });
});

const deleteAll = catchAsync(async (req, res) => {
  const data = await cartService.deleteAll(req.wallet.Address);
  res.status(httpStatus.OK).json({ status: true, data });
});

const addSmallLand = catchAsync(async (req, res) => {
  const data = await cartService.addToCart(req.wallet.Address, req.params.idSmallLand);
  if (!data.status) {
    return res.status(httpStatus.BAD_REQUEST).send(data);
  }
  res.status(httpStatus.OK).json({ status: true, message: `Add ${req.params.idSmallLand} into your cart successfully` });
});

const deleteSmallLand = catchAsync(async (req, res) => {
  const data = await cartService.deleteToCart(req.wallet.Address, req.params.idSmallLand);
  if (!data.status) {
    return res.status(httpStatus.BAD_REQUEST).send(data);
  }
  res.status(httpStatus.OK).json({ status: true, message: `Delete ${req.params.idSmallLand} from your Cart successfully` });
});

module.exports = {
  getCart,
  addSmallLand,
  deleteSmallLand,
  deleteAll
};

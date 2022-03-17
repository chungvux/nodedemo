const { Cart, SmallLand, BigLand } = require('../models');

const getCartUser = async (address) => {
  const carts = await Cart.findOne({ address });
  return carts?carts.landList:[];
};

const deleteAll = async (address) => {
  const data = await Cart.deleteMany({ address });
  return data;
};

const addToCart = async (address, idSmallLand) => {
  const cart = await Cart.findOne({ address });
  if (!cart) {
    await new Cart({
      address,
      landList: [idSmallLand],
    }).save();
    return {
      status: true,
    };
  }
  if (cart.landList.includes(idSmallLand)) {
    return {
      status: false,
      message: 'Land has been exist in your Cart',
    };
  }
  cart.landList.push(idSmallLand);
  await cart.save();
  return {
    status: true,
    message:'Add to cart successful'
  };
};

const deleteToCart = async (address, idSmallLand) => {
  const cart = await Cart.findOne({ address });
  if (!cart) {
    return {
      status: false,
    };
  }
  if (cart.landList.includes(idSmallLand)) {
    cart.landList.splice(cart.landList.indexOf(idSmallLand), 1);
    await cart.save();
    return {
      status: true,
    };
  }
  return {
    status: false,
    message: 'Land has been not exit in your Cart',
  };
};

module.exports = {
  getCartUser,
  addToCart,
  deleteToCart,
  deleteAll
};

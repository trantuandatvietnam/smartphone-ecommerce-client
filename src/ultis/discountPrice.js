const discountPrice = (rootPrice, salePercents) => {
    return rootPrice - (rootPrice * salePercents) / 100;
};

export default discountPrice;

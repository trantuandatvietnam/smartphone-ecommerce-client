const formatPrice = (price = 0) => {
    return price.toLocaleString() + ' đ';
};

export default formatPrice;

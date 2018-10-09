module.exports.Count = function totalCount(cart) {
    var total = 0;
    for(key in cart) {
        total+= cart[key].count * cart[key].cost;
    }
    return total;
}
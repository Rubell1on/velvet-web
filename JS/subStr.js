
module.exports.splitStr = function splitStr(caption){
    var 
        discriptionStart = 0,
        priceStart = 0,
        dificultStart = 0,
        rubStart = 0;

    discriptionStart = caption.indexOf('Описание: ');
    priceStart = caption.indexOf('Цена: ');
    rubStart = caption.indexOf(' руб.;');
    dificultStart = caption.indexOf('Сложность изготовления: ');
    heshStart = caption.indexOf('#');

    var capObj = {
        "name": caption.substring(10, discriptionStart - 2),
        "description": caption.substring(discriptionStart + 10, priceStart - 1),
        "price": Number(caption.substring(priceStart + 6, rubStart)),
        "dificult": caption.substring(dificultStart + 24, heshStart-2),
        }
    return capObj
}

// console.log(splitStr('Название: Топ торт 228 Описание: Очень вкусный торт.Всем советую. Цена: 1000 руб.; Сложность изготовления: Высокая; #Топчик'));
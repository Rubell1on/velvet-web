var 
    cart = {},
    // split = require('./subStr');
    splitted = {},
    goodsCount;

$('document').ready(function() {
    cart = checkCart();
    // $('.cart').html(JSON.stringify(out));
    $('.table').html(loadgoods());
    goodsCount = localStorage.getItem('goodsCount');
    $('.cartLink').text("Корзина: "+goodsCount);
});

$(this).on('click', function (e){
    if(e.target.className == 'delButton'){
        delGoods(e);
    }
});

$('.closeBtn').on('click', function (e){
    $('.confirm').css('display','none');
});



function loadgoods() {
    
    var out = '<tr class="cartHeader"><td class="delRow">_</td><td class="imageCol" >Изображение</td><td class="nameCol" >Название</td><td class="costCol">Цена за КГ</td><td class="countCol">Кол-во</td><td class="middleCount">Промежуточная цена</td></tr>';
    
    
    for(var elem in cart){
        
        // out+= '<div class="cartElem" id="'+elem+'">';
        // out+= '<input class="delButton" type="button" id="'+elem+'" value="X">';
        //     out+= '<div class="imageCol">';
        //         out+= '<img src="'+cart[elem].image+'">';
        //     out+= '</div>';
        //     out+= '<div class="nameCol">';
        //         out+= '<a href="'+cart[elem].pageLink+'"><p name="goodName">'+ cart[elem].name +'</p></a>';
        //     out+= '</div>';
        //     out+= '<div class="costCol">';
        //         out+= '<p name="goodCost">'+ cart[elem].cost +'</p>';
        //     out+= '</div>';
        //     out+= '<div class="countCol">';
        //         out+= '<p name="goodCount">'+ cart[elem].count +'</p>';
        //     out+= '</div>';
        //     out+= '<div class="middleCount">';
        //         out+= '<p id="totalCost" >'+ cart[elem].count * cart[elem].cost+'</p>';
        //     out+= '</div>';
        // out+= '</div>';

        out+= '<tr class="cartElem" id="'+elem+'">';
        out+= '<td class="delRow"><input class="delButton" type="button" id="'+elem+'" value="X"></td>';
            out+= '<td class="imageCol">';
                out+= '<img src="'+cart[elem].image+'">';
            out+= '</td>';
            out+= '<td class="nameCol">';
                out+= '<a href="'+cart[elem].pageLink+'"><p name="goodName">'+ cart[elem].name +'</p></a>';
            out+= '</td>';
            out+= '<td class="costCol">';
                out+= '<p name="goodCost">'+ cart[elem].cost +' &#8381;</p>';
            out+= '</td>';
            out+= '<td class="countCol">';
                out+= '<p name="goodCount">'+ cart[elem].count +' КГ</p>';
            out+= '</td>';
            out+= '<td class="middleCount">';
                out+= '<p id="totalCost" >'+ cart[elem].count * cart[elem].cost+' &#8381;</p>';
            out+= '</td>';
        out+= '</tr>';
        
    }

    // out+='<tr class="total"><td class="totalP">Итого: </td><td class="totalCount" colspan="4">'+totalCount(cart)+' &#8381;</td><td class="final-step">Оформить заказ</td></tr>';
    out+='<tr class="total"><td> </td><td class="totalCount" colspan="4">Итого:'+totalCount(cart)+' &#8381;</td><td class="final-step">Оформить</td></tr>';


    // $('.totalCount').html(totalCount(cart));
    return out;
}

function totalCount(cart) {
    var total = 0;
    for(key in cart) {
        total+= cart[key].count * cart[key].cost;
    }
    return total;
}

function delGoods(e) {
    
    delete cart[e.target.id];
    localStorage.setItem('cart', JSON.stringify(cart));
    // showCart();
    $('.cart').html(loadgoods());
    goodsCount--;
    $('.cartLink').text("Корзина: "+goodsCount);
    localStorage.setItem('goodsCount', goodsCount);
    $('#'+e.target.id).remove();


}

// $('.final-step').on('click', function(e) {
//     console.log("1");
//     $('.confirm').css('display','block');
// });

$(".table").on('click', function (e){
    if(e.target.className == 'final-step'){
        $('.confirm').css('display', 'block');
        $('.confirm').animate({opacity:1},500);
    }
});

$('.closeBtn').click(function(){
    $('.confirm').animate({opacity:0},500,$('.confirm').css('display','none'));
});

$("#submit").on('click', function(){
    var 
        userName = $('input[name="userName"]').val(),
        userTel = $('input[name="userTel"]').val(),
        userNote = $('input[name="note"]').val();
    if(userName!="" && userTel!="")
    {
        $.post({
            url: "/cart-success",
            type: 'POST',
            data: {obj: localStorage.getItem('cart'), userName: userName, userTel: userTel, userNote: userNote},
            // contentType: "applicatino/plain; charset=utf-8",
            dataType: 'json',
            success: function (resp) {
                alert(resp);
            },
            // error: function (xhr, str) {
            //     alert('Возникла ошибка: ' + xhr.responseCode);
            // }
        });
        localStorage.clear();/// Очистка локального хранилища
        $('.confirm').css('display','none');
        alert('Ваш заказ принят, ожидайте звонка для подтверждения');
    }
    else
    {
        $('input[name="userName"]').css("border-color","red");    
        $('input[name="userTel"]').css("border-color","red");    
    }
});

function spltStr(caption){
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
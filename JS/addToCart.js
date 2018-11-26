var 
    cart = {},
    curValue = 1,
    id = '',
    goodsCount = 0;

$('document').ready(function(){
    cart = checkCart();
    $('.cartLink').text("Корзина: "+goodsCount);
});

$('.toCart').on('click', addToCart);
$('.decr').on('click', cartDecr);
$('.inr').on('click', cartInr);


function cartInr() {
    curValue++;
    $('.curValue').val(String(curValue));
}

function cartDecr() {
    if (curValue <= 1) 
    {
        $('.curValue').val(String(1));
    }
    else
    {
        curValue--;
        $('.curValue').val(String(curValue));
    }
}

function addToCart() {
    id = $(this).attr('id');
    console.log(id, typeof id);
    var params =  {};
    params["image"] = $('.bigImage').attr('src');
    params["name"] = document.getElementById("name1").textContent;
    params["cost"] = Number(getCost());
    params["count"] = curValue,
    params["pageLink"] = window.location.href;
    

    cart[id] = params;
    localStorage.setItem('cart', JSON.stringify(cart));
    goodsCount = Object.keys(cart).length;
    $('.cartLink').text("Корзина: "+goodsCount);
    localStorage.setItem('goodsCount', JSON.stringify(goodsCount));

    console.log(cart);
    // alert($('h1[class="name"]').text());
    // alert(document.getElementById("name1").textContent);
}

function checkCart() {
    if(localStorage.getItem('cart')!=null) {
        if(localStorage.getItem('goodsCount') != null){
            goodsCount = localStorage.getItem('goodsCount');
        }
        else
        {
            goodsCount = 0;
        }

        return JSON.parse(localStorage.getItem('cart'))
    }
    else
    {
        return cart;
    }
    console.log(cart);
}
function getCost() {
    var
        str =  $('.cost').text(),
        startOfStr = str.indexOf(': '),
        endOfStr = str.indexOf(' за');
    return str.substring(startOfStr+2, endOfStr-2);
}

$('.close').click(function(){
    $('.content-wrapper').css("display","none");
});





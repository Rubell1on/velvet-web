$('#cat').mouseenter(function(){
    if($(window).width()>460){
        $('#cat').animate({

        }, 500, function(){
            $('#cat').css('background','#c5c5c5');
        });
        $('.subCat').css('display','block');
    }
});

$('#cat').mouseleave(function(){
    if($(window).width()>460){
        $('#cat').css('background','grey');
        $('.subCat').css('display','none');
    }
});
$('.subCat').mouseenter(function(){
    if($(window).width()>460){
        $('#cat').css('background','#c5c5c5');
        $('.subCat').css('display','block');
    }
});
$('.subCat').mouseleave(function(){
    if($(window).width()>460){
        $('#cat').css('background','grey');
        $('.subCat').css('display','none');
    }
});

// $('.minified-menu').click(function(){
//     if($('.navigation ul').css('display')!='block'){
//         $('.navigation ul').css('display','block');
//         $('.minified-menu').animate({opacity: 0}, 250, function(){
//             $('.minified-menu').css({'background-position':'32px 0'});
//         });
//         $('.navigation').animate({opacity: 1},250);
//         $('.minified-menu').animate({opacity: 1}, 250);
//         $('.navigation ul').animate({opacity: 1},500);
//     }
//     else{
//         $('.navigation ul').animate({opacity: 0},500,function(){
//             $('.navigation ul').css('display','none');
//         });
//         $('.minified-menu').animate({opacity: 0}, 250, function(){
//             $('.minified-menu').css({'background-position':'0px 0'});
//         });
//         $('.navigation').animate({opacity: 0.8},250);
//         $('.minified-menu').animate({opacity: 1},250);
//     }   
// });

$('.minified-menu').click(function(){
    // console.log($('.navigation ul').css('margin-left'));
    if($('.navigation ul').css('margin-left')!='0px'){
        // $('.navigation ul').css('margin-left', "0px");
        $('.minified-menu').animate({opacity: 0}, 250, function(){
            $('.minified-menu').css({'background-position':'32px 0'});
        });
        $('.navigation ul').animate({'margin-left': "0px"}, 250, function(){
            $('.minified-menu').css({'background-position':'32px 0'});
        });
        // $('.navigation').animate({opacity: 1},250);
        $('.minified-menu').animate({opacity: 1}, 250);
        // $('.navigation ul').animate({opacity: 1},500);
    }
    else{
        $('.navigation ul').animate({'margin-left': "-200px"},250);
        $('.minified-menu').animate({opacity: 0}, 250, function(){
            $('.minified-menu').css({'background-position':'0px 0'});
        });
        $('.navigation').animate({opacity: 0.8},250);
        $('.minified-menu').animate({opacity: 1},250);
    }   
});

document.addEventListener("DOMContentLoaded", profile);

function profile() {
    
    if(localStorage.getItem("resp")!=null) {
        var respond = JSON.parse(localStorage.getItem("resp"));
        console.log(respond);
        $('.pic').html(respond.name[0]);
        $('.profLink').attr({'href': "/nastochka"});
    }
}

$('.profLink').click(function(){
    var temp = JSON.parse(localStorage.getItem("resp"));
    console.log(temp.id);
    $.post({
        url: "/nastochka",
        type: 'post',
        data: {id: temp.id},
        // contentType: "applicatino/plain; charset=utf-8",
        dataType: 'json',
        success: function (resp) {
            alert(resp);
            
        }
        // error: function (xhr, str) {
        //     alert('Возникла ошибка: ' + xhr.responseCode);
        // }
    });
});

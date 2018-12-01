if(/\/nastochka/.test(window.location.pathname)===true) {
    $('.searchForm').submit(function(){

        if($('.admSearch').val()!=""){
            var posting = $.post({
                url: "/nastochka-searching",
                type: 'POST',
                data: {searchReq:$('.admSearch').val()},
                // contentType: "application/plain; charset=utf-8",
                dataType: 'text',
                success: function (resp) {
                    // alert(resp);
                    // refreshTable();
                    // $('table[id="undone"]').remove();
    
    
                    //Трабла в том что только при первом переходе получается получить инфу
                    // alert(window.location);
                    location.href = '/nastochka-searching';
                    window.location.assign();
                    ///////////////////////////////////////
    
                },
                error: function (xhr, str) {
                    alert('Возникла ошибка: ' + xhr.responseCode);
                }
            });
            
        }
    });
}
else {
    $('.searchForm').attr("action","/search");
    $('.searchForm').attr("method","POST");

    // $('.searchForm').submit(function(){
    //     var temp = $('.admSearch').val();
    //     temp = temp.replace(/ /, "|");

    //     if($('.admSearch').val()!=""){
    //         var posting = $.post({
    //             url: "/search",
    //             type: 'POST',
    //             data: {searchReq: temp},
    //             // contentType: "application/plain; charset=utf-8",
    //             dataType: 'text',
    //             success: function (resp) {
    //                 // alert(resp);
    //                 // refreshTable();
    //                 // $('table[id="undone"]').remove();
    
    
    //                 //Трабла в том что только при первом переходе получается получить инфу
    //                 // alert(window.location);
    //                 // location.href = '/search';
    //                 // window.location.assign();
    //                 ///////////////////////////////////////
    
    //             },
    //             error: function (xhr, str) {
    //                 alert('Возникла ошибка: ' + xhr.responseCode);
    //             }
    //         });
            
    //     }
    // });
}

$('.searchButton').on('click', function(){
    $('.admSearch').css('display','block');
    $('.admSearch').focus();
    $('.searchButton').css('background-position','24px 0');
    if($(window).width()>460)
        $('.admSearch').animate({width: '128px'}, 350);
    else
        $('.admSearch').animate({width: '45%'}, 350);
    
});
$('.admSearch').on('focusout', function(){
    $('.admSearch').animate({width: '0px'}, 350, function(){
        $('.admSearch').css('display','none');
        $('.searchButton').css('background-position','0px 0');
    });
});


//Возможно истина где-то тут:D

function refreshTable(){
    if($('table[id="undone"]').css('display')!= 'none'){
        $('table[id="undone"]').remove();
    }
}


$('.expandAll').on('click', function() {
    if($('.goodsInfo').css("display")!= "table-row"){
        $('.expandAll').val("Свернуть все");
        $('.goodsInfo').css("display","table-row");
    }
    else
    {
        $('.expandAll').val("Развернуть все");
        $('.goodsInfo').css("display","none");
    }
});

$('input[class="ready"]').on('click', function(e){
    if($('#undone').css("display")!= "none")
    {
        $('input[class="ready"]').val("Не выполненные");
        $('#undone').css("display","none");
        $('#done').css("display","table");
    }
    else
    {
        $('input[class="ready"]').val("Выполненные");
        $('#undone').css("display","table");
        $('#done').css("display","none");
    }
});

$('tbody[class="full-row"]').on('click', function(e){
    if($('tr[id="'+$(this).attr("id")+'"][class="goodsInfo"]').css('display')!='none'){
        $('tr[id="'+$(this).attr("id")+'"][class="goodsInfo"]').css('display','none');
    }
    else
    {
        $('tr[id="'+$(this).attr("id")+'"][class="goodsInfo"]').css('display','table-row');
    }
});
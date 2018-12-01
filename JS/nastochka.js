var context;
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
    context = this;
    console.log('111');
    if($('tr[id="'+$(this).attr("id")+'"][class="goodsInfo"]').css('display')!='none'){
        $('tr[id="'+$(this).attr("id")+'"][class="goodsInfo"]').css('display','none');
    }
    else
    {
        $('tr[id="'+$(this).attr("id")+'"][class="goodsInfo"]').css('display','table-row');
    }
});

// $("#inReady option:selected" ).text();
$('table[class="table"] tbody[class="full-row"] tr[class="userInfo"] select[id="isReady"]').change(function(){
    console.log($('#isReady option:selected').val());
    console.log($(context).attr("id"));
    console.log(context);

    $.post({
        url: "/change",
        type: 'POST',
        data: {id: $(context).attr("id"), value: $('#isReady option:selected').val()},
        // contentType: "applicatino/plain; charset=utf-8",
        dataType: 'json',
        success: function (resp) {
            alert(resp);
        },
        // error: function (xhr, str) {
        //     alert('Возникла ошибка: ' + xhr.responseCode);
        // }
    });
});
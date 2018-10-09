$('a[class="element"]').each(function(index, element){
    console.log($(element).attr('id'));
    $('a[class="element"][id="'+$(element).attr('id')+'"] > .image').load($('a[class="element"][id="'+$(element).attr('id')+'"] > .image').attr('src'),function(){
        $('a[id="'+$(element).attr('id')+'"]').animate({opacity:1},500);
    });
    
});

$('.bigImage').load($('.bigImage').attr('src'), function(){
    $('.wrapper').animate({opacity:1},500);
});
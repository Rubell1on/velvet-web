$('.content > .image > .photos > .smallImage').on('click', function(){
    // alert($(this).attr('src'));
    // $('.bigImage').animate({opacity: 0}, 250, function(){
        $('.bigImage').attr('src',$(this).attr('src'));
        // $('.bigImage').animate({opacity: 1}, 250);
    // });
    
});
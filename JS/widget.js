var pos,
    size,
    blockSize = parseInt($(".instaPhoto").css("width"));;

    document.addEventListener("DOMContentLoaded", ready);
 function ready(){
    
    console.log(window.innerHeight, window.innerWidth);
    if(window.innerWidth<=460) {
        
        $('.insta-frame').css("height", window.innerWidth);
        $('.instaPhoto').css("width", parseInt(window.innerWidth)+"px");
        $('.caption').css("line-height", window.innerWidth-10+"px");
        // $(".line").css("width", (parseInt($(".line").css("width"))/305)*(parseInt(window.innerWidth)+5)+"px");
        blockSize = parseInt($(".instaPhoto").css("width"));
    }
    else {
        $(".left-btn").click(function(){
            pos = parseInt($('.line').css("left"));
            size = parseInt($(".line").css("width"));
        
            if(pos+blockSize<=0) 
                $(".line").animate({"left": (pos+blockSize)+"px"}, 200);
        
            else if(pos+blockSize >= blockSize)
                $(".line").animate({"left": -size+window.innerWidth+"px"});
            else if(pos+blockSize>0 && pos>-blockSize)
                $(".line").animate({"left": 0}, 200);
            // console.log($('.line').css("right"));
        });
        
        $(".right-btn").click(function(){
            console.log(window.innerWidth, window.innerHeight);
            pos = parseInt($('.line').css("left"));
            size = parseInt($(".line").css("width"));
            console.log(Math.abs(pos-window.innerWidth-blockSize));
        
            if(Math.abs(pos-window.innerWidth)>=size) 
                $(".line").animate({"left": 0});
            else if(Math.abs(pos-window.innerWidth)+blockSize<=size)
                $(".line").animate({"left": (pos-blockSize)+"px"}, 200);
            else if(Math.abs(pos-window.innerWidth)<size && Math.abs(pos-window.innerWidth)>size-blockSize)
                $(".line").animate({"left": -size+window.innerWidth+"px"}, 200);
            // console.log($('.line').css("right"));
        });
    }
};


var 
    fs = require('fs'),
    express = require('express');
    bodyParser = require('body-parser');
    translate = require('./JS/translate');
    split = require('./JS/subStr');
    totalCount = require('./JS/totalCount');
    
app = express();

app.listen(3000,"127.1.1.1");
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use('/JS', express.static('JS'));

app.use(bodyParser.urlencoded({extended: false}));
console.log("Слушаю порт 3000");

// var goods = JSON.parse(fs.readFileSync("goods.json"));
var arrOfGoods = JSON.parse(fs.readFileSync("insta.json"));



// console.log(goods);
app.get("/index", function(req, res){
    res.render("index.ejs");
});

app.get("/categories",function(req, res){
    res.render("categories-page.ejs");
});

app.get("/categories/:goods",function(req, res){


    function select(){
        var selected = {

        }

        for (key in arrOfGoods){
            for(elem in arrOfGoods[key].tags){
                if( translate.tran(req.params.goods, true).toLowerCase() == arrOfGoods[key].tags[elem]){
                    selected[key] = arrOfGoods[key];
                    var splitted = split.splitStr(arrOfGoods[key].caption);
                    selected[key].name = splitted.name;
                    selected[key].cost = splitted.price;
                    console.log(selected[key]);
                    selected[key].name = splitted.name;
                }
            }
        }
        return selected;
    }

    sel = select();
    // select();
    //  console.log(sel);

    res.render("goods-page.ejs",{ data:req.params.goods, arr:select(), trn: translate.tran(req.params.goods, true)});
    // console.log(req.params.goods);
    // console.log(translate.tran(req.params.goods, true));
});

app.get("/categories/:goods/:idOfGood",function(req, res){

    var bool = Boolean(false);
    
    for (key in arrOfGoods){

        if( req.params.idOfGood == key){

            bool = true;
            key0 = key;
            break;
        }
    }

    if (bool == true)
    {

        var splitted = split.splitStr(arrOfGoods[req.params.idOfGood].caption);

        res.render("single-good.ejs",{ data:req.params.goods, id:req.params.idOfGood, arr:splitted, sourceArr: arrOfGoods});

        console.log(req.params.idOfGood);
        console.log(key);
    }
    else
    {
        res.render("404.ejs");
    }
    
});

app.get("/generator", function(req, res){
    res.render("generator.ejs");
});


app.get("/about", function(req, res){
    res.render("about.ejs");
});

app.get("/cart", function(req, res){
    res.render("cart.ejs");
});

app.post("/cart-success", function (req, res){

    dt=[];
    [dt.y, dt.m, dt.d, dt.h, dt.i, dt.s] = (new Date).toISOString().split(/[-T:.Z]/);
    var time = dt.y+'-'+dt.m+'-'+dt.d+'-'+dt.h+'-'+dt.i+'-'+dt.s;

    if(fs.readFileSync('./deal.json')!= "")
    {
        deal = JSON.parse(fs.readFileSync('./deal.json'));
    }
    else deal = {};

    post = JSON.parse(req.body.obj);
    // console.log(post);


   
    deal[time] = post;
    deal[time]['total'] = totalCount.Count(post);
    deal[time]['userName'] = req.body.userName;
    deal[time]['userTel'] =  req.body.userTel;
    deal[time]['userNote'] = req.body.userNote;
    deal[time]['ready'] = false;

    
    fs.writeFileSync("./deal.json", JSON.stringify(deal));
    
    res.render("categories-page.ejs");
});

app.get('/nastochka', function(req, res){
    // res.render('nastochka.ejs');
    var deal = JSON.parse(fs.readFileSync('./deal.json'));
    res.render('nastochka-logged.ejs',{data:deal});
});

var searchResult = {};
//Возможно истина и где-то тут:D
app.route("/nastochka-searching")

    .get( function (req, res){
        res.render('nastochka-logged.ejs',{data:searchResult});
        searchResult = {};
    })

    .post(function (req, res){

    var deal = JSON.parse(fs.readFileSync('./deal.json'));
    

    for(date in deal){
        for(key in deal[date]){
            // console.log(deal[date][key]);
            if(req.body.searchReq == deal[date][key]){
                searchResult[date] = deal[date];
            }
            // console.log('Match!');
        }
    }
    deal = searchResult;
    // console.log(deal);
    res.send(searchResult);
    });

// app.post("/nastochka-search", function (req, res){

//     var deal = JSON.parse(fs.readFileSync('./deal.json'));
//     var searchResult = {};

//     for(date in deal){
//         for(key in deal[date]){
//             // console.log(deal[date][key]);
//             if(req.body.searchReq == deal[date][key]){
//                 searchResult[date] = deal[date];
//             }
//             // console.log('Match!');
//         }
//     }
//     deal = searchResult;
//     // console.log(deal);
//     res.send(searchResult);
    
// });

/////////////////////////////////////////////

// app.post('/nastochka-logged', function(req, res){
//     // res.render('nastochka.ejs');
// });

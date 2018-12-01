var 
    fs = require('fs'),
    express = require('express');
    bodyParser = require('body-parser');
    translate = require('./JS/translate');
    split = require('./JS/subStr');
    totalCount = require('./JS/totalCount'),
    // InstaPars = require('./server');
    
app = express();

app.listen(3000,"192.168.0.101");
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use('/JS', express.static('JS'));
app.use('/cakeEditor', express.static('cakeEditor'));

app.use(bodyParser.urlencoded({extended: false}));
console.log("Слушаю порт 3000");

// var goods = JSON.parse(fs.readFileSync("goods.json"));
var arrOfGoods = JSON.parse(fs.readFileSync("insta.json"));



// console.log(goods);
app.get("/", function(req, res){
    var obj = {},
    remain = getNumOfProp(arrOfGoods)-1;

    for(var i = remain; i>=0; i--) {
        obj[i] = {};
    }
    for(var elm in arrOfGoods) {
        obj[remain].image = arrOfGoods[elm].image;
        obj[remain].caption = arrOfGoods[elm].caption.substring(10,arrOfGoods[elm].caption.indexOf("."));
        obj[remain].link = arrOfGoods[elm].link;
        remain--;
    }
    console.log(obj['0'].caption);
    // console.log(obj);
    res.render("index.ejs",{object:obj, count: (getNumOfProp(arrOfGoods))*305});
});

app.post("/search", function(req, res){
    // console.log(req.body.searchReq);
    // console.log(req.body.request);

    // var temp = req.body.searchReq;
    var temp = req.body.request;
    

    temp = temp.replace(/ /g, "|");
    console.log("Значениевввв темпа"+temp+"  "+req.body.request);

    var reg = new RegExp(temp, "ig");


    function select(){
        var selected = {};

        for (key in arrOfGoods){
            // for(elem in arrOfGoods[key]){
                if(reg.test(arrOfGoods[key].caption)){
                    selected[key] = {};
                    var splitted = split.splitStr(arrOfGoods[key].caption);
                    selected[key].name = splitted.name;
                    selected[key].cost = splitted.price;
                    selected[key].comments = arrOfGoods[key].comments;
                    selected[key].likes = arrOfGoods[key].likes;
                    selected[key].link = arrOfGoods[key].link;
                    selected[key].image = arrOfGoods[key].image;
                    // console.log(selected[key]);
                    // selected[key].name = splitted.name;
                }
            // }
        }
        return selected;
    }

    sel = select();
    // console.log("Массив: "+sel);
    res.render("search.ejs",{arr: sel});
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

app.get("/cake-editor", function(req, res){
    res.render("cakeEditor.ejs");
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

app.route('/nastochka')

    // .get(function(req, res){
    //     // res.render('nastochka.ejs');
    //     console.log(typeof req.body.id, req.body.id);
    //     // var db = JSON.parse(fs.readFileSync('./db.json'));
    //     // if(db[req.body.id].role === admin) {
    //         var deal = JSON.parse(fs.readFileSync('./deal.json'));
    //         res.render('nastochka-logged.ejs',{data:deal});
    //     // }
    // })

    .post(function(req, res){
        // res.render('nastochka.ejs');
        console.log(typeof req.body.id, req.body.id);
        // var db = JSON.parse(fs.readFileSync('./db.json'));
        // if(db[req.body.id].role === admin) {
            var deal = JSON.parse(fs.readFileSync('./deal.json'));
            res.render('nastochka-logged.ejs',{data:deal});
        // }
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

app.route("/login")
    .get(function(req, res){
        res.render("login.ejs");
    })

    .post(function(req, res){            
        var 
            db = JSON.parse(fs.readFileSync("./db.json")),
            deal = JSON.parse(fs.readFileSync('./deal.json'));
        for(var id in db) {
            if(((db[id].login === req.body.login && db[id].password === req.body.password)|| (db[id].email === req.body.login && db[id].password === req.body.password))&&db[id].role === "admin"){
                res.send({id:id, name: db[id].name});
                // res.render("nastochka-logged.ejs",{data: deal});
            }
        }
        res.render("404.ejs");
    });

app.route("/register")
    .get(function(req, res){
        res.render("register.ejs");
    })

    .post(function(req, res){
        var 
            db = JSON.parse(fs.readFileSync("./db.json")),
            counter = getNumOfProp(db);
        
            db[counter+1] = {};
            db[counter+1].login = req.body.login;
            db[counter+1].name = req.body.name;
            db[counter+1].lastName = req.body.lastName;
            db[counter+1].phoneNumber = req.body.phoneNumber;
            db[counter+1].email = req.body.email;
            db[counter+1].password = req.body.password;

            fs.writeFileSync("./db.json", JSON.stringify(db));
    });

app.post("/change", function(req, res){
    var 
        deal = JSON.parse(fs.readFileSync('./deal.json')),
        bool = (req.body.value==="true");
    // console.log(req.body.value);
    deal[req.body.id].ready = bool;
    fs.writeFileSync("./deal.json", JSON.stringify(deal));
});

function getNumOfProp(obj) {
    var counter = 0;
    for(var elm in obj) {
        counter++;
    }
    return counter;
}

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

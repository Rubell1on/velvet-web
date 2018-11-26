// module.exports.InstaParser = function(){
var 
    fs = require('fs'),
    http = require('http'),
    url = require('url'),
    querystring = require('querystring'),
    request = require('request'),
    cheerio = require('cheerio'),
    count = 1,
    instURL = 'https://api.instagram.com/v1/users/self/media/recent?access_token=';
    //token = '2189806640.91ac702.6fb3e465385b4063a08c2d54d7697302';
    token = '7911095082.4d195ae.3ef5631abfb140ca82039e2d1d4e639a';

    setInterval(function getFile() {
        console.log('Таймер запущен!');
        request(instURL+token, true, function(error, response, body){
    
            fs.writeFileSync('./list1.json', body);
            addToList();
    
        });
    }, 1000);
// };

function addToList(){
    var insta = JSON.parse(fs.readFileSync('insta.json'));
    
    var temp = JSON.parse(fs.readFileSync('list1.json'));
    //console.log(JSON.parse(temp));

    for(var key in temp.data) {

        var newPhoto = Boolean(false);

        for(var secondKey in insta) {

            if(temp.data[key].id != insta[secondKey]){
                newPhoto = true;
            }

            else{

                newPhoto = false;
            }
        }

        if(newPhoto == true){
            var postObj = {

                "image": temp.data[key].images.standard_resolution.url,
                "carousel": temp.data[key].carousel_media,
                "caption": temp.data[key].caption.text,
                "likes": temp.data[key].likes.count,
                "comments": temp.data[key].comments.count,
                "tags": temp.data[key].tags,
                "link": temp.data[key].link

            }

            insta[temp.data[key].id] = postObj;
            fs.writeFileSync('./insta.json', JSON.stringify(insta));

        }
    }    
        //     data = JSON.parse(file);
        //     data['7'] = obj;
        //     //out = data['2'].name + ' ' + data['2'].last;

        //     //$('.json-block').html(JSON.stringify(data));
            
        // fs.writeFileSync('./list.json', JSON.stringify(data));
        // //loadList();
};




//addToList();
//getFile();


//console.log(JSON.parse(fs.readFileSync('./singlephoto.json')));




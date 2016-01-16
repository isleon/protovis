var request = require('request')
var url = 'http://localhost:8081/keymap?city=%E5%B9%BF%E5%B7%9E%E5%B8%82&year=2013'

request.get(url, function (err, origin){
    var result = {}

    for (var i = 0; i < origin.length; i++) {
        var eo1 = origin[i]
        var en1 = result[eo1.name] = {}

        // console.log(eo1)

        for (var j = 0; j < eo1.children.length; j++) {

            var eo2 = eo1.children[j]
            var en2 = en1[eo2.name] = {}
            // console.log(eo2)

            for (var k = 0; k < eo2.children.length; k++) {
                var eo3 = eo2.children[k]
                var en3 = en2[eo3.name] = 100
            }
        }
    };
    console.log(JSON.stringify(result))
})

// var origin = require('./keypoints.json')
// var result = {}

// for (var i = 0; i < origin.length; i++) {
//     var eo1 = origin[i]
//     var en1 = result[eo1.name] = {}

//     // console.log(eo1)

//     for (var j = 0; j < eo1.children.length; j++) {

//         var eo2 = eo1.children[j]
//         var en2 = en1[eo2.name] = {}
//         // console.log(eo2)

//         for (var k = 0; k < eo2.children.length; k++) {
//             var eo3 = eo2.children[k]
//             var en3 = en2[eo3.name] = 100
//         }
//     }
// };

// console.log(JSON.stringify(result))
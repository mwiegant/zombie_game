/*
    Example use
    var input = require ("input.js");
    input.listen (UP_ARROW, function (data){
        data['up_value'] += 1;
    });


    .....
    var input = require ("input.js");
    var cur_up_value = input.getData ('up_value');



*/
(function (){

    var key_codes = {};
    var init = false;
    var data = {};

    var _interface = {

        listen: function (key_code, cb){
            if (!init){
                document.addEventListener('keydown', function (e){
                    if (key_codes[e.keyCode]){
                        key_codes[e.keyCode].forEach(function(cb){
                            cb (data);
                        });
                    }
                });
                init = true;
            }
            if (!key_codes[key_code]){
                key_codes[key_code] = [];
            }
            key_codes[key_code].push (cb);
        },
        getData: function (name) {
            if(data[name] != undefined){
                return data[name];
            }
            return undefined;
        },
        getAllData: function() {
            return data;
        },
        setData: function (name, value) {
            data[name] = value;
        }
    };

    // export all our functions in the interface
    for (var key in _interface){
        exports ("public/js/input.js", key, _interface[key]);
    }
})();



//todo find out if I can put an object into exports

/*
                   -----DOCUMENTATION-----

   ------------CONFIGURATION--------------------------------------------------------------------------------------------

    To make use of this module, import this file as a script into your html file.  Be sure to include this script BEFORE
    your main program driver script. Example: (Notice that your src attributes will differ from mine)

        <body>                                                          <----- the top of the body of your html document

            <!-- All of your html content... -->

            <script src="public/js/require.js"></script>                <----- the require file (this file)
            <script src="index.js"></script>                            <----- main driver script

        </body>


 ------------USING THIS MODULE, WRITING CODE----------------------------------------------------------------------------

    Modules should conform to the following look:

            (function() {

                function _Shooter( name, age) {

                    // your functionality goes here

                    // good practice is creating an object and giving it properties, before returning it below

                    return shooter;
                }

            exports("shooter.js", "Shooter", _Shooter);

            })();


    the format for exports is: ( <file name>, <the name you want your function to be called by>, <your function> )

        ** NOTE: If you can't get exports to work, it is almost certainly because you did not follow the format EXACTLY,
        ** look again at the sample code above.


------------USING THIS MODULE, USING YOUR CODE--------------------------------------------------------------------------

    To use your modules (which must follow the format described above), call them like so:

    var shooter = require("shooter.js");

    var newShooter = new shooter.Shooter( "John Doe", 42);
    
 */

window.requireDebug = true;

function require(url, cb, type) {
    if (!require.load_count) { require.load_count = 0; }
    if (!require.doc_frag) { require.doc_frag = document.createDocumentFragment(); }
    var doc_frag = require.doc_frag;
    var type_map = {image:'img', video:'video', audio:'audio', js:'script'};

    // handle generic loading stuff
    function loaded (url){
        --require.load_count;
        if(window.requireDebug) console.log("loaded: " + url + ", count: " + require.load_count);
        if (require.load_count === 0) {
            var done_cbs = window.modules._done_cbs || [];
            done_cbs.forEach(function (cb) { cb(); });
            done_cbs = [];
        }
    }

    if (url && url.toLowerCase) {
        var module = window.modules && window.modules[url];
        if (!module) {
            window.modules = window.modules || {};
            window.modules[url] = window.modules[url] || {};
            module = window.modules[url];
            // if a js file (That's really all we can load on the client side)
            if (url.toLowerCase().indexOf('.js') !== -1 && type !== 'worker') {
                var script = document.createElement('script');
                script.src = url;
                script.async = false;
                script.onload = function () {
                    if (cb) { cb(module); }
                    loaded (url);
                };
                if(window.requireDebug)  console.log("starting to load: " + url);
                ++require.load_count;
                document.body.appendChild(script);
            }
            else if (type && type_map[type]) { // else handle types
                var e = document.createElement (type_map[type]);
                e.src = url;
                e.onload = function () {
                    module[type_map[type]] = e;
                    if (cb) { cb(module); }
                    loaded (url);
                };
                if(window.requireDebug)  console.log("starting to load: " + url);
                ++require.load_count;
                doc_frag.appendChild(e);
            }
            // handle requiring workers. Some silly hoops that we have to jump through here
            else if (type && type === 'worker'){
                var href = window.location.href.slice(0, window.location.href.lastIndexOf ('/') + 1);
                var _url = href + url;
                var blob = new Blob([
                    "importScripts('" + _url + "');"
                ]);
                if(window.requireDebug)  console.log("creating worker:" + _url);
                return new Worker(window.URL.createObjectURL(blob));
            }
            else if (cb) {
                if(window.requireDebug)  console.log("failed to load: " + url);
                cb (null);
            }
        }
        else if (cb) { cb(module);  }
        return module;
    }
}

// function that modules use to export their methods and members
function exports(file_name, func_name, func) {
    window.modules = window.modules || {};
    window.modules[file_name] = window.modules[file_name] || {};
    if (func_name) {
        window.modules[file_name][func_name] = func;
    }
    else { // else do a shallow copy
        var dest = window.modules[file_name];
        for (var k in func){
            dest[k] = func[k];
        }
    }
}

function preloadImages(arr, cb) {
    var newImages = [];
    var loadedImages = 0;
    var arr = (typeof arr!="object")? [arr] : arr;
    function imageloadpost() {
        loadedImages++;
        if(loadedImages==arr.length) {
            if(window.requireDebug)  console.log("All images have loaded, beginning program execution");
        }
    }
    for(var i=0; i<arr.length; i++) {
        newImages[i] = new Image();
        newImages[i].src = arr[i];
        newImages[i].onload = function() {
            imageloadpost();
        };
        newImages[i].onerror = function() {
            imageloadpost();
        };
    }
    return cb();
};

// register a callback when everything is loaded
function requireDone (cb) {
    window.modules._done_cbs = window.modules._done_cbs || [];
    window.modules._done_cbs.push(cb);
}

function toggleRequireDebug() {
    if(window.requireDebug)     window.requireDebug = false;
    else                        window.requireDebug = true;
}
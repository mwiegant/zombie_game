/*
 * Another file for my code library
 */

//todo: rewrite this code as needed

(function(){
    var _widget = require("public/js/widget.js");

    function _Counter(_params, _ctx){
        var widget = _widget.create(_params, _ctx);
        widget.textInfo = _params.textInfo || "16px sans-serif";
        widget.text = _params.text || 'Frame Rate: ';
        widget.textColor = _params.bgColor || 'black';

        var values = new Array(100);
        var numValues = 0;
        var average = 0;
        var sum = 0;
        var currentPos = 0;
        var newVal = Date.now();
        var oldVal = Date.now();

        widget.update = function(data){
            newVal = Date.now();
            var elapsed = newVal - oldVal;
            oldVal = newVal;

            if(numValues < 100){
                values[numValues] = elapsed;
                numValues++;
                sum += elapsed;
            }
            else{
                sum -= values[currentPos];
                sum += elapsed;
                values[currentPos] = elapsed;
                currentPos++;
                if(currentPos >= 100)
                    currentPos = 0;
            }
            average = sum / numValues;
        };

        widget.draw = function(){
            var offset = widget.text.length * 9;

            widget.ctx.fillStyle = widget.textColor;
            widget.ctx.font = widget.textInfo;
            widget.ctx.fillText(widget.text, widget.dx, widget.dy);
            widget.ctx.fillText(Math.round(1000 / average), widget.dx + offset, widget.dy);
        };

        console.log("Just created the fps counter");
        return widget;

    }

    exports("public/js/framecounter.js", "create", _Counter);
})();




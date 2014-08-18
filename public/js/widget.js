/*
 * Another file for the library
 */

    //todo: rewrite this code as needed

(function() {

    function _Widget(_params, _ctx) {

        var widget = {
            ctx: _ctx,
            dx: _params.dx || 0,
            dy: _params.dy || 0,
            xScale: _params.xScale || 20,
            yScale: _params.yScale || 20,
            dataName: _params.dataName || 'NONE',
            dataMultiplier: _params.dataMultiplier || 1,
            maxDataValue: _params.maxDataValue || 100,

            bgColor: _params.bgColor || "yellow",
            fgColor: _params.fgColor || "green"

        };
        return widget;
    }

    exports("public/js/widget.js", "create", _Widget);
})();


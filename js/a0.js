define(["require", "exports", './pointset'], function (require, exports, ps) {
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    function getOffset(e) {
        e = e || window.event;
        var target = e.target || e.srcElement, rect = target.getBoundingClientRect(), offsetX = e.clientX - rect.left, offsetY = e.clientY - rect.top;
        return { x: offsetX, y: offsetY };
    }
    var Drawing = (function () {
        function Drawing(canv) {
            var _this = this;
            this.canv = canv;
            this.clickStart = undefined;
            this.clickStart = undefined;
            this.ctx = canv.getContext("2d");
            this.rects = new Array(0);
            this.points = new ps.PointSet();
            canv.onmousedown = function (ev) {
                _this.clickStart = getOffset(ev);
            };
            canv.onmouseup = function (ev) {
                if (_this.clickStart != undefined) {
                    var clickEnd = getOffset(ev);
                    var rect = {
                        p1: _this.clickStart,
                        p2: clickEnd,
                        color: getRandomColor()
                    };
                    _this.rects.push(rect);
                    _this.clickStart = undefined;
                }
            };
            canv.onmousemove = function (ev) {
                var m = getOffset(ev);
                _this.mousePosition = m;
            };
            canv.onmouseout = function (ev) {
                _this.mousePosition = undefined;
                _this.clickStart = undefined;
            };
        }
        Drawing.prototype.render = function () {
            var _this = this;
            this.ctx.save();
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.fillStyle = "lightgrey";
            this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
            this.ctx.restore();
            if (this.mousePosition != null) {
                if (this.mousePosition.x < this.canv.width) {
                    if (this.mousePosition.y < this.canv.height) {
                        this.points.addPoint(this.mousePosition);
                        for (var i = 0; i < this.points.buffer.length; i++) {
                            this.ctx.beginPath();
                            this.ctx.arc(this.points.getPoint(i).x, this.points.getPoint(i).y, 3, 0, 2 * Math.PI, false);
                            this.ctx.fillStyle = "rgba(125,25, 125, 0.5)";
                            this.ctx.fill();
                        }
                    }
                }
            }
            var rectCount = this.rects.length;
            var pointCount = this.points.getCount();
            if (this.clickStart) {
            }
            requestAnimationFrame(function () { return _this.render(); });
        };
        return Drawing;
    })();
    var myDrawing;
    function exec() {
        var div = document.getElementById("drawing");
        var canv = document.createElement("canvas");
        canv.id = "main";
        canv.width = 512;
        canv.height = 512;
        div.appendChild(canv);
        myDrawing = new Drawing(canv);
        myDrawing.render();
    }
    exec();
});
//# sourceMappingURL=a0.js.map
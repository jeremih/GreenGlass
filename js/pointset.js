define(["require", "exports"], function (require, exports) {
    var PointSet = (function () {
        function PointSet() {
            this.buffer = [];
            this.start = 0;
            this.count = 0;
        }
        PointSet.prototype.addPoint = function (m) {
            if (this.count == 39) {
                this.buffer[this.start] = m;
                this.start++;
                this.start %= this.buffer.length;
            }
            else {
                this.buffer.push(m);
                this.count++;
            }
        };
        PointSet.prototype.dropPoint = function () {
            this.buffer[this.start] = null;
        };
        PointSet.prototype.getCount = function () {
            return this.count;
        };
        PointSet.prototype.getPoint = function (i) {
            return this.buffer[i];
        };
        return PointSet;
    })();
    exports.PointSet = PointSet;
});
//# sourceMappingURL=pointset.js.map
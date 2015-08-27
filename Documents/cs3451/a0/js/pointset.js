define(["require", "exports"], function (require, exports) {
    var PointSet = (function () {
        function PointSet() {
            this.buffer = [];
            this.start = 0;
            this.count = 0;
        }
        PointSet.prototype.addPoint = function (m) {
            if (this.count < 30 && this.buffer.length < 30) {
                this.buffer[this.count] = m;
                this.count++;
            }
            else if (this.count == 30) {
                this.buffer[this.start] = m;
                this.start++;
                this.start %= this.buffer.length;
            }
            else {
                this.buffer[(this.start + this.count) % this.buffer.length] = m;
                this.count++;
            }
        };
        PointSet.prototype.dropPoint = function () {
            if (this.buffer[this.start] != null) {
                this.buffer[this.start] = null;
                this.start++;
                this.start %= this.buffer.length;
                if (this.count > 0) {
                    this.count--;
                }
            }
        };
        PointSet.prototype.getCount = function () {
            return this.count;
        };
        PointSet.prototype.getPoint = function (i) {
            var index = (this.start + i) % this.buffer.length;
            return this.buffer[index];
        };
        return PointSet;
    })();
    exports.PointSet = PointSet;
});
//# sourceMappingURL=pointset.js.map
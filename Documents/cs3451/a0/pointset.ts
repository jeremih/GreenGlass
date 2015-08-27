// @author Joseph Nam
// the MousePosition interface
export interface MousePosition {
    x: number;
    y: number;
}

// The PointSet class needs to be created here.
//
// PointSet should be implemented as a circular buffer of fixed size
// (the size is fixed at compile time), and when the buffer is full and a new point is added
// it overwrites the oldest point.
//
// The key feature of a cicular buffer is that internally, it is implemented with an array,
// and with a "start" and "count" indices that show you were the first element is, and how many
// elements are in the buffer.  When the buffer is full, "count" is the size of the array.
//
// When an element is removed from either end of the buffer, the "start" and "count" indices are
// updated.  When a new element is added, "count" is incremented.  When an element is added to
// a full buffer, the oldest element is overwritten (and the "start" is incremented).
//
// Care must be taken to deal with wrapping around the end.
//
// You should implement these methods, at least:
//      addPoint(m: MousePosition) { ... }           // add a new point, overwritting the oldest if full
//   	dropPoint() { ... }                          // remove the oldest point
//  	getCount(): number { ... }                   // get the current count
//  	getPoint(i: number): MousePosition { ... }   // get point number "i" (not array element "i")
export class PointSet {
    buffer: Array<MousePosition> = [];
    start: number = 0;
    count: number = 0;
    addPoint(m: MousePosition) {
        if (this.count < 30 && this.buffer.length < 30) {
            this.buffer[this.count] = m;
            this.count++;
        } else if (this.count == 30) {
            this.buffer[this.start] = m;
            this.start++;
            this.start %= this.buffer.length;
        } else {
            this.buffer[(this.start + this.count) % this.buffer.length] = m;
            this.count++;
        }
    }
    dropPoint() {
        if(this.buffer[this.start] != null) {
            this.buffer[this.start] = null;
            this.start++;
            this.start %= this.buffer.length;
            if (this.count > 0) {
                this.count--;
            }
        }
    }
    getCount(): number {
        return this.count;
    }
    getPoint(i: number): MousePosition {
        var index: number = (this.start + i) % this.buffer.length;
        return this.buffer[index];
    }
}

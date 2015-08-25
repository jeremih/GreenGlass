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
        // console.log("point added x: " + m.x + " , y: " + m.y);
        if (this.count == 39) {
            this.buffer[this.start] = m;
            this.start++;
            this.start %= this.buffer.length;
        } else {
            this.buffer.push(m);
            this.count++;
        }
    }
    dropPoint() {
        this.buffer[this.start] = null;
    }
    getCount(): number {
        return this.count;
    }
    getPoint(i: number): MousePosition {
        return this.buffer[i];
    }
}

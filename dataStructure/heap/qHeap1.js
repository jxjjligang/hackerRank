'use strict'
function processData(input) {
    class TinyQueue {
        constructor(data = [], compare = ascendCompare) {
            this.data = data;
            this.length = this.data.length;
            this.compare = compare;

            if (this.length > 0) {
                for (let i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
            }
        }

        push(item) {
            this.data.push(item);
            this.length++;
            this._up(this.length - 1);
        }

        pop() {
            if (this.length === 0)
                return undefined;

            const top = this.data[0];
            const bottom = this.data.pop();
            this.length--;

            if (this.length > 0) {
                this.data[0] = bottom;
                this._down(0);
            }

            return top;
        }

        delete(item) {
            if (this.length === 0)
                return undefined;

            let index = this.data.findIndex(element => element === item);
            if (index === -1)
                return undefined;

            if (index === 0)
                return this.pop();
            else if (index === (this.data.length - 1)) {
                const bottom = this.data.pop();
                this.length--;
                return bottom;
            }
            else {
                const value = this.data[index];
                const bottom = this.data.pop();
                this.length--;

                if (this.length > 0) {
                    this.data[index] = bottom;
                    this._down(index);
                }

                return value;
            }
        }

        peek() {
            return this.data[0];
        }

        _up(pos) {
            const { data, compare } = this;
            const item = data[pos];

            while (pos > 0) {
                const parent = (pos - 1) >> 1;
                const current = data[parent];
                if (compare(item, current) >= 0) break;
                data[pos] = current;
                pos = parent;
            }

            data[pos] = item;
        }

        size() {
            return this.length;
        }

        _down(pos) {
            const { data, compare } = this;
            const halfLength = this.length >> 1;
            const item = data[pos];

            while (pos < halfLength) {
                let left = (pos << 1) + 1;
                let best = data[left];
                const right = left + 1;

                if (right < this.length && compare(data[right], best) < 0) {
                    left = right;
                    best = data[right];
                }
                if (compare(best, item) >= 0) break;

                data[pos] = best;
                pos = left;
            }

            data[pos] = item;
        }
    }

    function ascendCompare(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }

    function descendCompare(a, b) {
        return a < b ? 1 : a > b ? -1 : 0;
    }

    let arr = input.split('\n').map(s => s.trim()).filter(s => s !== '');
    arr = arr.map(s => s.split(' ').map(v => parseInt(v)));
    let minHeap = new TinyQueue();
    for (let i = 1; i < arr.length; i++) {
        let command = arr[i][0], value = arr[i][1];
        if (command === 1)
            minHeap.push(value);
        else if (command === 2)
            minHeap.delete(value);
        else if (command === 3)
            console.log(minHeap.peek());
    }
}

function main() {
    let input = `22
    1 286789035
    1 255653921
    1 274310529
    1 494521015
    3

    2 255653921
    2 286789035
    3
    1 236295092
    1 254828111
    2 254828111
    1 465995753
    1 85886315
    1 7959587
    1 20842598
    2 7959587
    3
    1 -51159108
    3
    2 -51159108
    3
    1 789534713`;

    processData(input);
}

main();


function countTime(func) {
    let savedThis = this;
    return function (...args) {
        let start = new Date();
        let result = func.apply(savedThis, args);
        let end = new Date();
        console.log(`${((end - start) / 1000).toFixed(1)} seconds spent.`);
        return result;
    }
}
'use strict'

class MinHeap {
    constructor() {
        this.harr = [];
        this.heap_size = 0;

        // this.parent = this.parent.bind(this);
        // this.left = this.left.bind(this);
        // this.right = this.right.bind(this);
        // this.swap = this.swap.bind(this);
        // this.insertKey = this.insertKey.bind(this);
        // this.decreaseKey = this.decreaseKey.bind(this);
        // this.extractMin = this.extractMin.bind(this);
        // this.minHeapify = this.minHeapify.bind(this);
        // this.deleteKey=this.deleteKey.bind(this);
        // this.getMin=this.getMin.bind(this);
    }

    parent(i) {
        return Math.floor((i - 1) / 2);
    }

    left(i) {
        return 2 * i + 1;
    }

    right(i) {
        return 2 * i + 2;
    }

    swap(index1, index2) {
        let temp = this.harr[index1];
        this.harr[index1] = this.harr[index2];
        this.harr[index2] = temp;
    }

    insertKey(k) {
        let position = this.heap_size;
        this.harr[position] = k;
        this.heap_size++;

        while (position !== 0 && this.harr[this.parent(position)] > this.harr[position]) {
            this.swap(this.parent(position), position);
            position = this.parent(position);
        }
    }

    // Decreases value of key at index 'i' to new_val.  It is assumed that new_val is smaller than harr[i]. 
    decreaseKey(i, new_val) {
        this.harr[i] = new_val;

        let position = i;
        while (position !== 0 && this.harr[this.parent(position)] > this.harr[position]) {
            this.swap(this.parent(position), position);
            position = this.parent(position);
        }
    }

    getMin() {
        if (this.heap_size === 0)
            return undefined;
        else
            return this.harr[0];
    }

    // Method to remove minimum element (aka root) from min heap 
    extractMin() {
        if (this.heap_size === 0)
            return undefined;
        else if (this.heap_size === 1) {
            let root = this.harr[0];
            this.heap_size = 0;
            this.harr = [];
            return root;
        }
        else {
            let root = this.harr[0], tail = this.harr[this.heap_size - 1];
            this.harr[0] = tail;
            this.heap_size--;
            this.minHeapify(0);

            return root;
        }
    }

    deleteKey(i) {
        this.decreaseKey(i, Number.MIN_SAFE_INTEGER);
        this.extractMin();
    }

    minHeapify(i) {
        let left = this.left(i), right = this.right(i), smallest = i;
        if (this.harr[left] !== undefined && this.harr[left] < this.harr[smallest])
            smallest = left;

        if (this.harr[right] !== undefined && this.harr[right] < this.harr[smallest])
            smallest = right;

        if (smallest !== i) {
            this.swap(i, smallest);
            this.minHeapify(smallest);
        }
    }
}

function main() {
    let h = new MinHeap();
    h.insertKey(3);
    h.insertKey(2);
    console.log(h.extractMin());
    console.log(h.extractMin());
    console.log(h.extractMin());


    h.deleteKey(1);
    h.insertKey(15);
    h.insertKey(5);
    h.insertKey(4);
    h.insertKey(45);

    console.log(h.extractMin());
    console.log(h.getMin());
    h.decreaseKey(2, 1);
    console.log(h.getMin());
}

main();
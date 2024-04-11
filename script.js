class MinHeap {
    constructor() {
        this.heap = [];
    }

    parent(i) {
        return Math.floor((i - 1) / 2);
    }

    leftChild(i) {
        return 2 * i + 1;
    }

    rightChild(i) {
        return 2 * i + 2;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(value) {
        this.heap.push(value);
        let index = this.heap.length - 1;
        while (index > 0 && this.heap[this.parent(index)] > this.heap[index]) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapify(0);
        return min;
    }

    heapify(index) {
        const left = this.leftChild(index);
        const right = this.rightChild(index);
        let smallest = index;

        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }
        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapify(smallest);
        }
    }

    size() {
        return this.heap.length;
    }
}

function mincost(arr) {
    const minHeap = new MinHeap();

    for (let rope of arr) {
        minHeap.insert(rope);
    }

    let totalCost = 0;

    while (minHeap.size() > 1) {
        const first = minHeap.extractMin();
        const second = minHeap.extractMin();

        const combinedLength = first + second;
        totalCost += combinedLength;

        minHeap.insert(combinedLength);
    }

    return totalCost;
}

module.exports = mincost;

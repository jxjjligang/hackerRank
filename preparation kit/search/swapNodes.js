'use strict'

function swapNodes(indexes, queries) {
    class Node {
        constructor(data, level) {
            this.data = data;
            this.level = level;
            this.left = undefined;
            this.right = undefined;
        }

        swap() {
            let temp = this.right;
            this.right = this.left;
            this.left = temp;
        }
    }

    function constructTree(indexes) {
        let root = new Node(1, 1), queue = [root], index = 0;

        while (queue.length > 0) {
            let parent = queue.shift(), left = indexes[index][0], right = indexes[index][1];
            if (left !== -1) {
                parent.left = new Node(left, parent.level + 1);
                queue.push(parent.left);
            }
            if (right !== -1) {
                parent.right = new Node(right, parent.level + 1);
                queue.push(parent.right);
            }
            index++;
        }

        return root;
    }

    function inOrderVisit(node, array) {
        if (!node)
            return;

        inOrderVisit(node.left, array);
        array.push(node.data);
        inOrderVisit(node.right, array);
    }

    function swapNode(node, level) {
        if (!node)
            return;

        if (node.level % level === 0)
            node.swap();
        swapNode(node.left, level);
        swapNode(node.right, level);
    }

    let root = constructTree(indexes), finalResult = [], oneTimeResult;
    for (let i = 0; i < queries.length; i++) {
        let query = queries[i];
        swapNode(root, query);

        oneTimeResult = [];
        inOrderVisit(root, oneTimeResult);
        finalResult.push(oneTimeResult);
    }

    return finalResult;
}

let indexes = `2 3
4 -1
5 -1
6 -1
7 8
-1 9
-1 -1
10 11
-1 -1
-1 -1
-1 -1`;

// swapNodes(indexes.split('\n').map(l => l.split(' ').map(v => parseInt(v))), [2]);       // expects 4 2 1 5 3

let r = swapNodes(indexes.split('\n').map(l => l.split(' ').map(v => parseInt(v))), [2, 4]);       // expects 4 2 1 5 3
console.log(r.map(x => x.join(' ')).join("\n") + "\n");

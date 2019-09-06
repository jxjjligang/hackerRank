'use strict'

function processData(input) {
    let lines = input.split('\n'), queueData = [];
    let count = parseInt(lines[index++]);
    for (let i = 0; i < count; i++) {
        let line = lines[index++].trim(), cmdAndValue = line.split(' ');
        let command = parseInt(cmdAndValue[0]);
        switch (command) {
            case 1:         // Enqueue element  into the end of the queue.
                queueData.push(parseInt(cmdAndValue[1]));
                break;
            case 2:         // Dequeue the element at the front of the queue.
                queueData.shift();
                break;
            case 3:         // Print the element at the front of the queue.
                console.log(queueData[0]);
                break;
            default:
                break;
        }
    }
}
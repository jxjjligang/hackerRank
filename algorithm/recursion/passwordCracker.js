'use strict'

main();

function passwordCracker(pass, attempt) {
    // Complete this function
}

function main() {
    var t = parseInt(readLine());
    for (var a0 = 0; a0 < t; a0++) {
        var n = parseInt(readLine());
        pass = readLine().split(' ');
        var attempt = readLine();
        var result = passwordCracker(pass, attempt);
        process.stdout.write("" + result + "\n");
    }

}

function main() {
    let inputs = [`3
6
because can do must we what
wedowhatwemustbecausewecan
2
hello planet
helloworld
3
ab abcd cd
abcd`, `3
4
ozkxyhkcst xvglh hpdnb zfzahm
zfzahm
4
gurwgrb maqz holpkhqx aowypvopu
gurwgrb
10
a aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaa
aaaaaaaaaab`]; 
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const passwords = readLine().replace(/\s+$/g, '').split(' ');

        const loginAttempt = readLine();

        const result = passwordCracker(passwords, loginAttempt);

        ws.write(result + '\n');
    }

    ws.end();
}
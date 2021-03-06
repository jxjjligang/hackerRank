'use strict'
main();

/* From [xdavidliu]
First, lets compute some auxiliary quantities. Define M[i] as the number of nodes after the i-th iteration. We then have

M[0] = 6
M[i] = 4 M[i-1] + 2

Also, define D[i] as the length of the longest path after the i-th iteration, e.g. that between one corner and the other. We then have

D[0] = 3 A[0]
D[i] = 3 A[i] + 2 D[i-1]

Also, define B[i] as the sum of paths ending at the southeast corner (we can pick any corner of course, but to be clear and definitely, 
    let's pick the southeast one). This is slightly tricky to compute, so let's draw a picture:

W  X
|  |
g--h
|  |
Y  Z

Suppose this is the tree after the i-th iteration, so that the edges here have length A[i], while g and h are nodes, 
and W, X, Y, and Z are all equivalent, e.g. the tree after the (i-1)th iteration. We use different letters for convenience in referring to them.

We want to compute B[i], which is the sum of all paths that end at the bottom right, e.g. southeast corner of Z. Let's look at the picture and 
list all contributions:

- M[i-1] - 1 paths originating from within Z = B[i-1]

- the path starting from node h = A[i] + D[i-1]

- the path starting from g = 2 A[i] + D[i-1]

- M[i-1] paths starting from within X:
    = B[i-1] + M[i-1] * (2 A[i] + D[i-1])

- 2 M[i-1] paths starting from within W or Y
    = 2 * (B[i-1] + M[i-1] * (3 A[i] + D[i-1]))

Summing all these up, we have

B[i] = 4 B[i-1] + 3 A[i] + 2 D[i-1] + M[i-1] * (8 A[i] + 3 D[i-1])


Finally, let's compute the value of C[i], e.g. the sum of all the pairwise paths after the i-th iteration. For convenience,
let's repeat the same picture again:

W  X
|  |
g--h
|  |
Y  Z


- 1 path from g to h = A[i]
- paths within W, within Y, within X, or within Z = 4 C[i-1]
- paths from g to W, g to Y, h to X, or h to Z:
    = 4 (B[i-1] + A[i] * M[i-1])
- paths from g to X, g to Z, h to W, or h to Y:
    = 4 (B[i-1] + 2 A[i] * M[i-1])
- 2 paths from W to Y or X to Z:
    = 4 M[i-1] B[i-1] + 4 A[i] M[i-1]^2
- 4 paths from W to Z or W to X or Y to Z or Y to X
    = 8 M[i-1] B[i-1] + 12 A[i] M[i-1]^2

The last two are non obvious and merit explanation: let
B[i-1] = sum p_k where p_k is the length of a path ending at a corner. A path from W to Y, where path k is chosen in W 
and path k' is chosen in Y, has distance
    = p_k + p_k' + 2 A[i-1]

Take this quantity and perform a double sum over k and k'. The sum of p_k is given by M[i-1] B[i-1], and the sum of A[i-1] is given by M[i-1]^2 A[i-1].

Hence, taking every item above and summing, we end up with

C[i] = A[i] + 4 C[i-1] + 8 B[i-1] + 12 A[i] M[i-1] + 12 M[i-1] B[i-1] + 16 A[i] M[i-1]^2

To obtain C[0], we note that C[-1] = 0, B[-1] = 0, and M[-1] = 1, so we have
C[0] = 29 A[0]
*/
function hackerrankCity(A) {
    const MOD = 1000000007n;
    A = A.map(a => BigInt(a));

    function calculateB(i) {
        let prevD = (i === 0) ? 0n : D[i - 1], prevB = (i === 0) ? 0n : B[i - 1], prevM = (i === 0) ? 1n : M[i - 1];

        return (4n * prevB + 3n * A[i] + 2n * prevD + prevM * (8n * A[i] + 3n * prevD)) % MOD;
    }

    function calculateCost(i) {
        let prevC = (i === 0) ? 0n : C[i - 1], prevB = (i === 0) ? 0n : B[i - 1], prevM = (i === 0) ? 1n : M[i - 1];

        return (A[i] + 4n * prevC + 8n * prevB + 12n * A[i] * prevM + 12n * prevM * prevB + 16n * A[i] * prevM * prevM) % MOD;
    }

    // M: nuber of count of all nodes, 
    let M = [6n], D = [3n * A[0]], B = [calculateB(0)], C = [calculateCost(0)];
    for (let i = 1; i < A.length; i++) {
        M[i] = (4n * M[i - 1] + 2n) % MOD;
        D[i] = (3n * A[i] + 2n * D[i - 1]) % MOD;

        //     4   B[i-1]   + 3   A[i] + 2   D[i-1]   + M[i-1]   * (8   A[i] + 3   D[i-1])
        B[i] = (4n * B[i - 1] + 3n * A[i] + 2n * D[i - 1] + M[i - 1] * (8n * A[i] + 3n * D[i - 1])) % MOD;

        C[i] = calculateCost(i);
    }

    return C[A.length - 1].toString();
}

function hackerrankCityCPP(A) {
    const mod = 1000000007;
    let a = 0, b = 0, c = 0, d = 0, m = 1;
    for (let i = 0; i < A.length; ++i) {
        let bp = b, cp = c, dp = d, mp = m;
        a = A[i];
        m = add(2, mul(4, mp));
        d = add(3 * a, mul(2, dp));

        b = mul(mp, add(8 * a, mul(3, dp)));
        let bterm = [mul(4, bp), 3 * a, mul(2, dp)];
        for (let term of bterm)
            b = add(b, term);

        c = mul(mul(12, mp), add(a, bp));
        let cterm = [a, mul(4, cp), mul(8, bp), mul(16 * a, mul(mp, mp))];
        for (let term of cterm)
            c = add(c, term);
    }

    return c;

    function add(a, b) {
        return (a + b) % mod;
    }

    function mul(a, b) {
        return (a * b) % mod;
    }
}

function main() {
    let inputs = [`1
    1`, `2
    2 1`];
    for (let i = 1; i < 2; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const ACount = parseInt(lines[index++], 10), A = lines[index++].split(' ').map(ATemp => parseInt(ATemp, 10));

        let result = hackerrankCity(A);
        console.log(result + "\n");
    }
}
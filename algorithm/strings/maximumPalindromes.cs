/**
    Source code from discussion board of the challenge
 */
using System.Collections;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text.RegularExpressions;
using System.Text;
using System;
using System.Numerics;

class Result
{
private static int M = 1000000007;
    private static List<BigInteger> F = new List<BigInteger>();
    private static List<BigInteger> I = new List<BigInteger>();
    private static List<int[]> chars = new List<int[]>();

    public static void initialize(string s){
        F.Add(1);
        I.Add(1);
        for(var i = 1; i < s.Length; ++i){
            F.Add(F[i-1] * i % M);
            I.Add(BigInteger.ModPow(F[i], M-2, M));
        }
        var arrA = new int[26];
        chars.Add(new int[26]);
        for(var i = 0; i < s.Length; ++i){
            ++arrA[s[i]-'a'];
            var arrB = new int[26];
            Array.Copy(arrA, arrB, 26);
            chars.Add(arrB);
        }
    }

    public static int answerQuery(int l, int r){
    // Return the answer for this query modulo 1000000007.
        var array = new int[26];
        for(var i = 0; i < 26; ++i){
            array[i] = chars[r][i] - chars[l-1][i];
        }
        var odd = 0;
        var sum = 0;
        var divider = F[0];
        foreach(var a in array){
            if(a%2 != 0){
                ++odd;
            }
            sum += a/2;
            divider *= I[a/2];
            divider %= M;
        }
        odd = odd > 0 ? odd : 1;
        var result = F[sum] * divider * odd;
        return (int)(result % M);
    }
}

class Solution
{
    public static void Main(string[] args)
    {
        TextWriter textWriter = new StreamWriter(@System.Environment.GetEnvironmentVariable("OUTPUT_PATH"), true);

        string s = Console.ReadLine();

        Result.initialize(s);

        int q = Convert.ToInt32(Console.ReadLine().Trim());

        for (int qItr = 0; qItr < q; qItr++)
        {
            string[] firstMultipleInput = Console.ReadLine().TrimEnd().Split(' ');

            int l = Convert.ToInt32(firstMultipleInput[0]);

            int r = Convert.ToInt32(firstMultipleInput[1]);

            int result = Result.answerQuery(l, r);

            textWriter.WriteLine(result);
        }

        textWriter.Flush();
        textWriter.Close();
    }
}

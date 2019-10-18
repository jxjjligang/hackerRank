using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChallengeConsoleApp
{
    class PasswordCracker
    {
        /*
     * Complete the 'passwordCracker' function below.
     *
     * The function is expected to return a STRING.
     * The function accepts following parameters:
     *  1. STRING_ARRAY passwords
     *  2. STRING loginAttempt
     */

        private static string WRONG_PASSWORD = "WRONG PASSWORD";

        public static string passwordCracker(List<string> passwords, string loginAttempt)
        {
            List<string> pwds = RemoveCombinedPasswords(passwords);
            string result = NestedCrack(pwds, loginAttempt, new List<string>(), 0,  new Dictionary<int, HashSet<string>>());
            return result;
        }

        private static List<string> RemoveCombinedPasswords(List<string> passwords)
        {
            List<string> ordered = passwords.OrderBy(p => p.Length).ToList();
            // step 1: remove password which is the repeat(s) of another password
            for (int i = ordered.Count - 1; i >= 1; i--)
            {
                string current = ordered[i];
                for (int j = i - 1; j >= 0; j--)
                {
                    string previous = ordered[j];
                    int residual = current.Length % previous.Length, times = current.Length / previous.Length;
                    if (residual == 0 && string.Join("", Enumerable.Repeat(previous, times)) == current)
                    {
                        ordered.RemoveAt(i);
                        break;
                    }
                }
            }

            // step 1: remove password which is combination of other 2 passwords
            HashSet<string> setPass = new HashSet<string>(ordered);
            for (int i = 0; i < ordered.Count - 1; i++)
            {
                string stringI = ordered[i];
                for (int j = i + 1; j < ordered.Count - 1; j++)
                {
                    string stringJ = ordered[j], combinedIJ = stringI + stringJ, combinedJI = stringJ + stringI;
                    if (setPass.Contains(combinedIJ))
                        setPass.Remove(combinedIJ);
                    if (setPass.Contains(combinedJI))
                        setPass.Remove(combinedJI);
                }
            }

            return setPass.ToList();
        }

        private static void AddToDictionary(Dictionary<int, HashSet<string>> dic, int index, string pass)
        {
            HashSet<string> passwords = null;
            if (dic.ContainsKey(index))
                passwords = dic[index];
            else
            {
                passwords = new HashSet<string>();
                dic[index] = passwords;
            }

            passwords.Add(pass);
        }

        private static string NestedCrack(List<string> passwords, string loginAttempt, List<string> found, int index, Dictionary<int, HashSet<string>> dic)
        {
            if (index == loginAttempt.Length)
                return string.Join(" ", found);

            for (int i = 0; i < passwords.Count; i++)
            {
                string pass = passwords[i];
                int passLength = pass.Length;
                if (index + passLength <= loginAttempt.Length && loginAttempt.Substring(index, passLength) == pass)
                {
                    if (dic.ContainsKey(index) && dic[index].Contains(pass))
                        return WRONG_PASSWORD;

                    found.Add(pass);
                    string result = NestedCrack(passwords, loginAttempt, found, index + pass.Length, dic);
                    if (result == WRONG_PASSWORD)
                    {
                        AddToDictionary(dic, index, pass);
                        found.RemoveAt(found.Count - 1);
                        continue;
                    }
                    else
                        return result;
                }
            }

            return WRONG_PASSWORD;
        }
    }
}

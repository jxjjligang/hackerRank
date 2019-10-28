using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChallengeConsoleApp
{
    class PlayOnBenders
    {
        static Dictionary<int, int> nimValueMap = new Dictionary<int, int>();
        static HashSet<int> nonLeaves = null;
        static Dictionary<int, List<int>> parent2Children = null;

        static int getNimValue(int location, int[][] paths)
        {
            if (nimValueMap.ContainsKey(location))
                return nimValueMap[location];

            if (!parent2Children.ContainsKey(location))
            {
                nimValueMap.Add(location, 0);
                return 0;
            }

            IEnumerable<int> nextLocations = parent2Children[location];
            List<int> nextNimSet = new List<int>();
            foreach (int nextLocation in nextLocations)
            {
                int nextNimValue = -1;
                if (nimValueMap.ContainsKey(location))
                    nextNimValue = nimValueMap[location];
                else
                    nextNimValue = getNimValue(nextLocation, paths);
                nextNimSet.Add(nextNimValue);
            }

            int nimValue = nextNimSet.Count;
            for (int i = 0; i < nextNimSet.Count; i++)
            {
                if (!nextNimSet.Contains(i))
                {
                    nimValue = i;
                    break;
                }
            }

            nimValueMap.Add(location, nimValue);
            return nimValue;
        }

        public static string bendersPlay(int n, int[][] paths, int[] query)
        {
            if (nonLeaves == null)
            {
                nonLeaves = new HashSet<int>(paths.Select(p => p[0]));
                foreach (int location in paths.Select(p => p[1]).Distinct())
                {
                    if (!nonLeaves.Contains(location))
                        nimValueMap.Add(location, 0);
                }
                parent2Children = paths.GroupBy(p => p[0]).ToDictionary(g => g.Key, g => g.Select(p => p[1]).ToList());
            }

            int xorResult = 0, nimValue = -1;
            foreach (int location in query)
            {
                if (!nimValueMap.ContainsKey(location))
                    nimValue = getNimValue(location, paths);
                else
                    nimValue = nimValueMap[location];
                xorResult = xorResult ^ nimValue;
            }

            return ((xorResult != 0) ? "Bumi" : "Iroh");
        }
    }
}

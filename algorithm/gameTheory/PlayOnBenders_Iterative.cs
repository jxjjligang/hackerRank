using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChallengeConsoleApp
{
    class PlayOnBendersIterative
    {
        static Dictionary<int, int> nimValueMap = new Dictionary<int, int>();
        static HashSet<int> nonLeaves = null;
        static Dictionary<int, List<int>> parent2Children = null;

        static void calculateNimNumber(int parentNum, List<int> childNumbers)
        {
            if (childNumbers.Count == 0)
                nimValueMap[parentNum] = 0;
            else
            {
                var nimValueSet = new HashSet<int>(childNumbers.Select(c => nimValueMap[c]));
                int nimValue = nimValueSet.Count;
                for (int i = 0; i < nimValueSet.Count; i++)
                {
                    if (!nimValueSet.Contains(i))
                    {
                        nimValue = i;
                        break;
                    }
                }

                nimValueMap[parentNum] = nimValue;
            }
        }

        static void calculateNimValue(int location, int[][] paths)
        {
            // use BFS to save all the intermediate access of nodes    
            Stack<LocationObject> queue = new Stack<LocationObject>();
            List<LocationObject> locationsBFS = new List<LocationObject>();
            List<int> nextLocations = paths.Where(p => p[0] == location).Select(p => p[1]).ToList();
            LocationObject locationObj = new LocationObject { parent = location, children = nextLocations };

            queue.Push(locationObj);
            locationsBFS.Add(locationObj);
            while (queue.Count > 0)
            {
                LocationObject loc = queue.Pop();
                bool childNimFound = true;
                foreach (int child in loc.children)
                {
                    if (nimValueMap.ContainsKey(child))
                        continue;

                    if (!nonLeaves.Contains(child))
                    {
                        nimValueMap[child] = 0;
                        continue;
                    }

                    childNimFound = false;
                    nextLocations = parent2Children[child];
                    locationObj = new LocationObject { parent = child, children = nextLocations };
                    queue.Push(locationObj);
                    locationsBFS.Add(locationObj);
                }

                if (childNimFound == true)
                    calculateNimNumber(loc.parent, loc.children);
            }

            //Console.WriteLine($"location: { location}, locationsBFS.length: { locationsBFS.Count}");
            locationsBFS.Reverse();
            foreach (LocationObject locObject in locationsBFS)
            {
                if (nimValueMap.ContainsKey(locObject.parent))
                    continue;

                calculateNimNumber(locObject.parent, locObject.children);
            }
        }

        public static string bendersPlay(int n, int[][] paths, int[] query)
        {
            int xorResult = 0;
            if (nonLeaves == null)
            {
                nonLeaves = new HashSet<int>(paths.Select(p => p[0]));
                parent2Children = paths.GroupBy(p => p[0]).ToDictionary(g => g.Key, g => g.Select(p => p[1]).ToList());
            }

            foreach (int location in query)
            {
                if (!nimValueMap.ContainsKey(location))
                    calculateNimValue(location, paths);

                int nimValue = nimValueMap[location];
                xorResult = xorResult ^ nimValue;
            }

            return ((xorResult != 0) ? "Bumi" : "Iroh");
        }
    }

    class LocationObject
    {
        public int parent { get; set; }
        public List<int> children { get; set; }
    }
}

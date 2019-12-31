using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChallengeConsoleApp
{
    public class CrabGraph
    {
        public static int crabGraphs(int n, int t, int[][] graph)
        {
            int N = n;
            int C = t;
            int M = graph.Length;

            // TODO: Is everything set to the same value?
            int[,] adjMatrix = new int[N * 2 + 2, N * 2 + 2];

            int source = N * 2;
            int dest = N * 2 + 1;

            for (int i = 0; i < M; i++)
            {
                var splitted = graph[i];
                // TODO: Add to mistakes stat - off by one
                int from = splitted[0] - 1;
                int to = splitted[1] - 1;
                adjMatrix[source, from] = Math.Min(adjMatrix[source, from * 2] + 1, C);
                adjMatrix[source, to] = Math.Min(adjMatrix[source, to * 2] + 1, C);
                adjMatrix[from, to + N] = 1;
                adjMatrix[to , from + N] = 1;
                adjMatrix[to  + N, dest] = 1;
                adjMatrix[from + N, dest] = 1;
            }

            return FindMaxFlow(adjMatrix, source, dest);
        }

        private static int FindMaxFlow(int[,] adjMatrix, int source, int dest)
        {
            int N = adjMatrix.GetLength(0);

            /// TODO: check if default is 0
            int[,] flow = new int[N, N];

            int res = 0;

            bool augPathFound;
            do
            {
                var prev = new int[N];
                // TODO: Check if it works with n-value. It shouldn't.
                //Array.ForEach(prev, n => n = -1);
                for (int i = 0; i < N; i++)
                {
                    prev[i] = -1;
                }

                augPathFound = TryFindAugPath(adjMatrix, flow, source, dest, prev);

                if (augPathFound)
                {
                    int maxFlow = Int32.MaxValue;
                    int cur = dest;
                    while (cur != source)
                    {
                        int pr = prev[cur];
                        if (adjMatrix[pr, cur] > 0)
                        {
                            maxFlow = Math.Min(maxFlow, adjMatrix[pr, cur] - flow[pr, cur]);
                        }
                        else
                        {
                            maxFlow = Math.Min(maxFlow, flow[cur, pr]);
                        }

                        cur = pr;
                    }

                    cur = dest;
                    while (cur != source)
                    {
                        int pr = prev[cur];
                        if (adjMatrix[pr, cur] > 0)
                        {
                            flow[pr, cur] += maxFlow;
                        }
                        else
                        {
                            flow[cur, pr] -= maxFlow;
                        }
                        cur = pr;
                    }

                    if (maxFlow == 0)
                    {
                        throw new InvalidOperationException("maxFlow is 0 for what was called augmenting path!");
                    }

                    res += maxFlow;
                }
            } while (augPathFound);

            return res;
        }

        private static bool TryFindAugPath(int[,] adjMatrix, int[,] flow, int source, int dest, int[] prev)
        {
            int N = adjMatrix.GetLength(0);
            // TODO: Make sure default is false
            bool[] visited = new bool[N];
            Queue<int> next = new Queue<int>();

            next.Enqueue(source);
            while (next.Any())
            {
                int newNode = next.Dequeue();

                for (int i = 0; i < N; i++)
                {
                    if (visited[i])
                        continue;

                    if ((adjMatrix[newNode, i] > 0 && flow[newNode, i] < adjMatrix[newNode, i]) ||
                        (adjMatrix[i, newNode] > 0 && flow[i, newNode] > 0))
                    {
                        prev[i] = newNode;
                        visited[i] = true;
                        next.Enqueue(i);

                        if (i == dest)
                        {
                            return true;
                        }
                    }
                }
            }

            return false;
        }
    }
}

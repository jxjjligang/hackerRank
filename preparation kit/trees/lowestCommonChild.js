// Java source code
// public static Node lca(Node root, int v1, int v2) {
//     // Write your code here.
//   int minValue = Math.min(v1, v2), maxValue = Math.max(v1, v2);
//   if ((minValue <= root.data && maxValue >= root.data))  
//       return root;

//   if (maxValue < root.data)
//       return lca(root.left, v1, v2);
//   else 
//       return lca(root.right, v1, v2);
// }
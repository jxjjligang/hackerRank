'use strict'

// implement source code in Java and submitted
/**
 * 	public static int height(Node root) {
      	// Write your code here.
        if (root == null)
            return -1;
        
        return 1 + Math.max(height(root.left), height(root.right));

    }
 * 
 */
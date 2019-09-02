// implement in Java
/**
 * void decode(String s, Node root) {
        int index = 0;
        Node node = root;
        String decoded = "";
        while (index < s.length()) {
            if (s.charAt(index) == '0')
                node = node.left;
            else 
                node = node.right;

            if (node.left == null && node.right == null) {
                decoded += node.data;
                node = root;
            }
            index++;
        }

        System.out.println(decoded);
    }
 */
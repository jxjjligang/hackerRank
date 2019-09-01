// code implemented in C++ 14
/**
 * bool checkBST(Node* root) {
        
        return checkBST(root, -100000, 999999);
    }

    bool checkBST(Node* root, int min, int max){
         if (root == NULL)
            return true;

        int value = root->data;
        if (value <= min)
            return false;
        
         if (value >= max)
            return false;
       
        return  checkBST(root->left, min, value) && checkBST(root->right, value, max);       
    }
 */
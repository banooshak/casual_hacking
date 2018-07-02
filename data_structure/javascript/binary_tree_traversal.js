function BinaryTree() {
	this.root = new TreeNode();

	this.getRoot = function() {
		return this.root;
	}

	this.addNode = function(data) {
		console.log("Adding value %d to the tree", data);
		this.root.addNode(data);
	};

	this.inOrderTraverse = function(node) {
		if (node != null) {
			this.inOrderTraverse(node.left);
			console.log(node.value);
			this.inOrderTraverse(node.right);
		}
		return;
	};

	this.preOrderTraverse = function(node) {
		if (node != null) {
			console.log(node.value);
			this.preOrderTraverse(node.left);
			this.preOrderTraverse(node.right);
		}
		return;
	};

	this.postOrderTraverse = function(node) {
		if (node != null) {
			this.postOrderTraverse(node.left);
			this.postOrderTraverse(node.right);
			console.log(node.value);
		}
		return;
	};

}

function TreeNode() {
	this.value = null;
	this.left = null;
	this.right = null;

	this.getValue = function() {
		return this.value;
	}

	this.addNode = function(data) {
		if (this.value == null) {
			this.value = data;
		} 
		else if (this.value > data) {
			if (this.left == null) {
				this.left = new TreeNode();
			}
			this.left.addNode(data);
		} else {
			if (this.right == null) {
				this.right = new TreeNode();
			}
			this.right.addNode(data);
		}
	}
}

function test() {
	this.btree = new BinaryTree();

	var i = 0;
	while (i < 5) {
		var rand = Math.ceil(Math.random() * 100);
		btree.addNode(rand);
		i++;
	}

	console.log("We are going to invoke inOrderTraverse: ");
	btree.inOrderTraverse(btree.getRoot());
	console.log("We are going to invoke preOrderTraverse: ");
	btree.preOrderTraverse(btree.getRoot());
	console.log("We are going to invoke postOrderTraverse: ");
	btree.postOrderTraverse(btree.getRoot());
}

test();
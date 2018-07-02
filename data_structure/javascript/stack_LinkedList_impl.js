function Node(data) {
	this.data = data;
	this.next = null;

	this.hasNext = function() {
		if (this.next == null) {
			return false;
		}
		return true;
	} 

	this.getData = function() {
		return this.data;
	}

	this.getNext = function() {
		return this.next;
	}
}

function SinglyLinkedList(data) {
	this.head = new Node(data);
	console.log("Instanciated SinglyLinkedList with head value %s", data);

	this.addNode = function(data) {
		var newNode = new Node(data);
		newNode.next = this.head;
		this.head = newNode;

		console.log("Added a new node with value %s", data);
		console.log("This new node is added to the head of the linked list");
	}

	this.getHead = function() {
		return this.head;
	}
}

function printLinkedList(linkedList) {
	var llNode = linkedList.getHead();
	while (llNode != null) {
		console.log("data = %s", llNode.getData());
		llNode = llNode.getNext();
	};
}

function Stack(data) {
	this.ll = new SinglyLinkedList(data);
	
	this.push = function(data) {
		this.ll.addNode(data);
	}

	this.peek = function() {
		if (!this.ll.getHead()) {
			return null;
		}
		return this.ll.getHead().getData();
	}

	this.pop = function() {
		if (!this.ll.getHead()) {
			return null;
		}
		var newHead = this.ll.head.next;
		var oldHead = this.ll.head;
		this.ll.head = newHead;
		oldHead.next = null;
		return oldHead.getData();
	}

	this.isEmpty = function() {
		return this.ll.head == null;
	}
}

function popAndIterateStack(stack) {
	while (stack.peek() != null) {
		var nodeData = stack.pop();
		console.log("Stack poped element = %s", nodeData);
	}
}

function test() {
	var s = new Stack(0);
	console.log("Head Data = %s\n", s.peek());
	s.push(1);
	console.log("Head Data = %s\n", s.peek());
	s.push(2);
	console.log("Head Data = %s\n", s.peek());
	s.push(3);
	console.log("Head Data = %s\n", s.peek());
	s.push(4);
	console.log("Head Data = %s\n", s.peek());

	console.log("\nIs stack empty? %s\n", s.isEmpty());

	console.log("\n\niterating the stack by poping every node\n\n");

	popAndIterateStack(s);

	console.log("\nIs stack empty? %s\n", s.isEmpty());
}

test();
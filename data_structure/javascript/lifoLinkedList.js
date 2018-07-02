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

function test() {
	var ll = new SinglyLinkedList(0);
	console.log("Head Data = %s\n\n", ll.getHead().getData());
	ll.addNode(1);
	ll.addNode(2);
	ll.addNode(3);
	ll.addNode(4);

	console.log("\n\nNow time to iterate over the Singly Linked List\n\n");

	printLinkedList(ll);
}

test();
function Node(data) {
	this.data = data;
	this.next = null;
	this.prev = null;

	this.hasNext = function() {
		if (this.next == null) {
			return false;
		}
		return true;
	} 

	this.hasPrevious = function() {
		if (this.prev == null) {
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

	this.getPrev = function() {
		return this.prev;
	}
}

function DoublyLinkedList(data) {
	this.head = new Node(data);
	this.tail = this.head;

	console.log("Instanciated DoublyLinkedList with head value %s", data);

	this.addNode = function(data) {
		var newNode = new Node(data);
		if (this.head == null) {
			this.head = this.tail = newNode;
		} else {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}	

		console.log("Added a new node with value %s", data);
		console.log("This new node is added to the end of the linked list");
	}

	this.getHead = function() {
		return this.head;
	}

	this.doesExist = function(data) {
		var llNode = this.head;
		while (llNode != null) {
			if (llNode.getData() == data) {
				console.log("Node with data value of %s exists", data);
				return true;
			}
			llNode = llNode.getNext();
		};
		return false;
	}

	this.removeNode = function(data) {
		var llNode = this.head;

		while (llNode != null) {
			if (llNode.getData() == data) {
				console.log("Found the node with value %s, time to remove it.", data);
				if (llNode.getPrev() == null && llNode.getNext() == null) {
					console.log("Head is the only element, head data = %s", data);
					this.head = null;	

				} else if (llNode.getPrev() == null && llNode.getNext() != null) {
					this.head = this.head.getNext();
					this.head.prev = null;
					console.log("Head is the element to be removed, old head = %s, new head = %s", data, this.head.getData());

				} else if (llNode.getPrev() != null && llNode.getNext() != null) {
					llNode.prev.next = llNode.next;
					llNode.next.prev = llNode.prev;
					console.log("Removing an element in the middle of the linkedList, prev.next (%s)<--> next.prev (%s)", llNode.prev.data, llNode.next.data);
					llNode = null;
				} else {
					// this is similar to saying (prev != null && llNode.getNext() == null) {
					llNode.prev.next = null;
					console.log("Removing the tail element with value %s", data);
				}

				break;
			}
			prev = llNode;
			llNode = llNode.getNext();
		}
	}

}

function printLinkedList(linkedList) {
	var llNode = linkedList.getHead();
	while (llNode != null) {
		console.log("data = %s", llNode.getData());
		llNode = llNode.getNext();
	};
}


function removeFromMiddle(data, linkedList) {
	var llNode = linkedList.getHead();
	var prev = null;

	if (llNode.getData() == data) {
		console.log("Cannot delete head!");
		return;
	}

	while(llNode != null){
		if (llNode.getData() == data){
			if (llNode.getNext() == null) {
				console.log("Cannot delete tail!");
				return;
			}

			prev.next = llNode.getNext();
			return;
		}
		prev = llNode;
		llNode = llNode.getNext();
	}
}



function test() {
	var ll = new DoublyLinkedList("a");
	ll.addNode("b");
	ll.addNode("c");
	ll.addNode("d");
	ll.addNode("e");
	ll.addNode("f");

	printLinkedList(ll);

	ll.removeNode("a");
	ll.removeNode("d");
	ll.removeNode("f");

	console.log("\n\nprinting the linked list again\n\n");
	printLinkedList(ll);


}

test();
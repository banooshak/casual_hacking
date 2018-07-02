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
	this.tail = this.head;

	console.log("Instanciated SinglyLinkedList with head value %s", data);

	this.addNode = function(data) {
		var newNode = new Node(data);
		if (this.head == null) {
			this.head = this.tail = newNode;
		} else {
			this.tail.next = newNode;
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
		var prev = null;

		while (llNode != null) {
			if (llNode.getData() == data) {
				console.log("Found the node with value %s, time to remove it.", data);
				if (prev == null && llNode.getNext() == null) {
					console.log("Head is the only element, head data = %s", data);
					this.head = null;					
				} else if (prev == null && llNode.getNext() != null) {
					this.head = this.head.getNext();
					console.log("Head is the element to be removed, old head = %s, new head = %s", data, this.head.getData());
				} else if (prev != null && llNode.getNext() != null) {
					prev.next = llNode.next;
					llNode = null;
					console.log("Removing an element in the middle of the linkedList, prev.next --> currentNode.next(%s)", prev.next.getData());
				} else {
					// this is similar to saying (prev != null && llNode.getNext() == null) {
					prev.next = null;
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



function findKthElementFromLast(ll, k) {
	console.log("Going to find the %s%s element from last", k, (k==1)? "st" : (k==2) ? "nd" : (k==3) ? "rd" : "th");
	var a = ll.getHead();
	var b = ll.getHead();
	var counter = 1;
	while (counter <= k) {
		b = b.getNext();
		if (b == null) {
			console.log("length of the linked list (%) is lower than k (%)", counter, k);
			return -1;
		}
		counter++;
	}

	while (b != null) {
		a = a.getNext();
		b = b.getNext();
	}

	return a;
}


function test() {
	var ll = new SinglyLinkedList(1);
	ll.addNode(5);
	ll.addNode(4);
	ll.addNode(5);
	ll.addNode(2);
	ll.addNode(4);

	printLinkedList(ll);

	k = 3;

	console.log("\n\nLet's find the kth element from last, k = %s\n\n", k);
	var kthFromLastNode = findKthElementFromLast(ll, k);
	console.log("%s is the value of the %s%s from last\n\n", kthFromLastNode.getData(), k, (k==1)? "st" : (k==2) ? "nd" : (k==3) ? "rd" : "th");
}

test();
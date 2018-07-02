function Stack(data) {
	this.initialSize = 10;
	this.arr = new Array(this.initial_size);

	this.tailIndex = 0;
	this.arr[this.tailIndex] = data;

	this.push = function(data) {
		this.tailIndex++;
		this.arr[this.tailIndex] = data;

		// Upsizing the array for better memory management
		if (this.tailIndex > this.arr.length / 2) {
			var tempArr = new Array(this.arr.length * 2);
			for (var i = 0; i < this.arr.length; i++) {
				tempArr[i] = this.arr[i];
			}
			this.arr = tempArr;
		}
	};

	this.peek = function() {
		return this.arr[this.tailIndex];
	}

	this.pop = function() {
		if (this.tailIndex < 0) {
			return null;
		}
		var last = this.arr[this.tailIndex];
		this.arr[this.tailIndex] = null;
		this.tailIndex--;

		// Downsizing the array for better memory management
		if (this.tailIndex < this.arr.length / 4) {
			var tempArr = new Array(this.arr.length / 2);
			for (var i = 0; i < this.arr.length; i++) {
				tempArr[i] = this.arr[i];
			}
			this.arr = tempArr;
		}
		return last;
	}

	this.isEmpty = function() {
		return this.tailIndex < 0;
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
	console.log("Head Data = %s", s.peek());
	s.push(1);
	console.log("Head Data = %s", s.peek());
	s.push(2);
	console.log("Head Data = %s", s.peek());
	s.push(3);
	console.log("Head Data = %s", s.peek());
	s.push(4);
	console.log("Head Data = %s", s.peek());

	console.log("\nIs stack empty? %s\n", s.isEmpty());

	console.log("\nIterating the stack by poping every node\n");

	popAndIterateStack(s);

	console.log("\nIs stack empty? %s\n", s.isEmpty());
}

test();
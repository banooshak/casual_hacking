function Stack() {
	this.initialSize = 10;
	this.arr = new Array(this.initial_size);

	this.tailIndex = -1;

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
		if (this.tailIndex < Math.ceil(this.arr.length / 4)) {
			var tempArr = new Array(Math.ceil(this.arr.length / 2));
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

	this.printValues = function() {
		for (var i = this.arr.length; i >= 0; i--) {
			if (!this.arr[i]) {
				continue;
			}
			console.log("Stack Value = %d", this.arr[i]);
		}
	}

}

function StackMinSorted() {
	this.mainStack = new Stack();
	this.tempStack = new Stack();

	this.init = function() {
		var i = 0
		while (i < 14) {
			var rand = Math.ceil(Math.random() * 14);
			this.mainStack.push(rand);
			console.log("Added %d to the stack", rand);
			i++;
		}
	}

	this.init();

	this.sort = function() {
		var valueAtHand = this.mainStack.pop();

		while (!this.mainStack.isEmpty()) {
			if (this.tempStack.isEmpty()) {
				this.tempStack.push(valueAtHand);
				valueAtHand = this.mainStack.pop();
			} else if (valueAtHand >= this.tempStack.peek()) {
				this.tempStack.push(valueAtHand);
				valueAtHand = this.mainStack.pop();
			} else {
				this.mainStack.push(this.tempStack.pop());
			}
		}

		while (!this.tempStack.isEmpty()) {
			this.mainStack.push(this.tempStack.pop());
		}
	}

	this.isEmpty = function() {
		return this.mainStack.isEmpty();
	}

	this.printValues = function() {
		return this.mainStack.printValues();
	}
}

function test() {
	var s = new StackMinSorted();

	console.log("\nIs main stack empty? %s\n", s.isEmpty());
	// s.mainStack.printValues();
	s.printValues();
	s.sort();
	
	console.log("\nIterating the SORTED STACK by poping every node\n");		
	s.mainStack.printValues(s);

	console.log("\nIs temp stack empty? %s\n", s.tempStack.isEmpty());
}

test();
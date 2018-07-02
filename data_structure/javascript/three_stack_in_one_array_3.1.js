function ThreeStacksInOneArray() {
	this.initialSize = 10;
	this.arr = new Array(3 * this.initialSize);

	this.s1Size = this.s2Size = this.s3Size = 10;
	
	this.s1HeadIndex = 0;
	this.s1TailIndex = -1;
	this.s2HeadIndex = 10;
	this.s2TailIndex = -1;
	this.s3HeadIndex = 20;
	this.s3TailIndex = -1;

	this.push = function(stackNo, data) {
		if (stackNo == 1) {
			if (this.s1TailIndex == -1) {
				this.s1TailIndex = 0;
			} else {
				this.s1TailIndex++;
			}
			this.arr[this.s1TailIndex] = data;
		}
		if (stackNo == 2) {
			if (this.s2TailIndex == -1) {
				this.s2TailIndex = this.s2HeadIndex;
			} else {
				this.s2TailIndex++;
			}
			this.arr[this.s2TailIndex] = data;
		}
		if (stackNo == 3) {
			if (this.s3TailIndex == -1) {
				this.s3TailIndex = this.s3HeadIndex;
			} else {
				this.s3TailIndex++;
			}
			this.arr[this.s3TailIndex] = data;
		}

		// Upsizing the array for better memory management
		// if (this.tailIndex > this.arr.length / 2) {
		// 	var tempArr = new Array(this.arr.length * 2);
		// 	for (var i = 0; i < this.arr.length; i++) {
		// 		tempArr[i] = this.arr[i];
		// 	}
		// 	this.arr = tempArr;
		// }
	};

	this.peek = function(stackNo) {
		if (stackNo == 1) {
			if (this.s1TailIndex < this.s1HeadIndex) {
				return null;
			}
			return this.arr[this.s1TailIndex];				
		} else if (stackNo == 2) {
			if (this.s2TailIndex < this.s2HeadIndex) {
				return null;
			}
			return this.arr[this.s2TailIndex];				
		} else if (stackNo == 3) {
			if (this.s3TailIndex < this.s3HeadIndex) {
				return null;
			}
			return this.arr[this.s3TailIndex];
		} 
		return null;
	}

	this.pop = function(stackNo) {
		if (stackNo == 1) {
			if (this.s1TailIndex < this.s1HeadIndex) {
				return null;
			}
			var last = this.arr[this.s1TailIndex];
			this.arr[this.s1TailIndex] = null;
			this.s1TailIndex--;

			return last;
		}

		if (stackNo == 2) {
			if (this.s2TailIndex < this.s2HeadIndex) {
				return null;
			}
			var last = this.arr[this.s2TailIndex];
			this.arr[this.s2TailIndex] = null;
			this.s2TailIndex--;

			if (this.s2TailIndex < this.s2HeadIndex) {
				this.s2TailIndex = -1;
			}

			return last;
		}

		if (stackNo == 3) {
			if (this.s3TailIndex < this.s3HeadIndex) {
				return null;
			}
			var last = this.arr[this.s3TailIndex];
			this.arr[this.s3TailIndex] = null;
			this.s3TailIndex--;

			if (this.s3TailIndex < this.s3HeadIndex) {
				this.s3TailIndex = -1;
			}

			return last;
		}

		// Downsizing the array for better memory management
		// if (this.tailIndex < this.arr.length / 4) {
		// 	var tempArr = new Array(this.arr.length / 2);
		// 	for (var i = 0; i < this.arr.length; i++) {
		// 		tempArr[i] = this.arr[i];
		// 	}
		// 	this.arr = tempArr;
		// }
	}

	this.isEmpty = function(stackNo) {
		if (stackNo == 1) {
			return this.s1TailIndex < 0;				
		} else if (stackNo == 2) {
			return this.s2TailIndex < 0;				
		} else if (stackNo == 3) {
			return this.s3TailIndex < 0;				
		} 
		return null;
	}

}

function popAndIterateStack(stack) {
	for (var i = 1; i < 4; i++) {
		console.log("\n\n-------------- Iteration over stack no (%d) ------------", i);
		while (stack.peek(i) != null) {
			var nodeData = stack.pop(i);
			console.log("Stack No (%d) poped element = %s", i, nodeData);
		}		
	}
}

function test() {
	var s = new ThreeStacksInOneArray();
	for (var i = 1; i < 4; i++) {
		console.log("\n************* PUSHING INTO STACK NO(%d) ***********\n", i);
		console.log("\nIs stack no (%d) empty? %s\n", i, s.isEmpty(i));
		console.log("Head Data = %s", s.peek(i));
		s.push(i, 0 * i);
		console.log("Head Data = %s", s.peek(i));
		s.push(i, 1 * i);
		console.log("Head Data = %s", s.peek(i));
		s.push(i, 2 * i);
		console.log("Head Data = %s", s.peek(i));
		s.push(i, 3 * i);
		console.log("Head Data = %s", s.peek(i));
		s.push(i, 4 * i);
		console.log("Head Data = %s", s.peek(i));

		console.log("\nIs stack no (%d) empty? %s\n", i, s.isEmpty(i));
	}

	console.log("\nIterating the stack by poping every node\n");		

	popAndIterateStack(s);
}

test();
function DirectionalGraph() {
	this.nodes = new Array();
	this.adjacencyList = {};

	this.connect = function(nodeFrom, nodeTo) {
		console.log("Connecting %s to %s", nodeFrom, nodeTo);
		if (nodeFrom in this.adjacencyList) {
			var currentDestinations = this.adjacencyList[nodeFrom];
			
			if (currentDestinations.indexOf(nodeTo) == -1) {
				currentDestinations.push(nodeTo);
				// this.adjacencyList[nodeFrom] = currentDestinations;
			}

		} else {
			this.adjacencyList[nodeFrom] = [nodeTo];
		}

		if (this.nodes.indexOf(nodeFrom) == -1) {
			this.nodes.push(nodeFrom);
		}

		if (this.nodes.indexOf(nodeTo) == -1) {
			this.nodes.push(nodeTo);
		}
	}

	this.printAllNodes = function() {
		for (var i = 0; i < this.nodes.length; i++) {
			console.log("Graph contains node with value %s", this.nodes[i]);
		}
	}

	this.printAllLinks = function() {
		for (var sourceVertex in this.adjacencyList) {
			var destVertices = this.adjacencyList[sourceVertex];
			console.log("%s ---> [%s]", sourceVertex, destVertices.join(", "));
		}
	}

	this.getOutgoingVertices = function(sourceVertex) {
		return this.adjacencyList[sourceVertex];
	} 
}


function search(graph, sourceVertex, destVertex, method) {
	var alreadyVisited = {sourceVertex: true};
	var pathExists = false;

	if (method == "DFS") {
		pathExists = areNodesConnectedUsingDFS(graph, sourceVertex, destVertex, alreadyVisited);
	}

	if (method == "BFS") {
		pathExists = areNodesConnectedUsingBFS(graph, sourceVertex, destVertex, alreadyVisited);		
	}

	return pathExists;
}

function areNodesConnectedUsingDFS(graph, sourceVertex, destVertex, alreadyVisited) {
	var outGoingVertices = graph.getOutgoingVertices(sourceVertex);

	if (outGoingVertices == undefined || outGoingVertices == null) {
		console.log("Vertex %s has no outging vertices, therefore it is not a source vertex", sourceVertex);
		return false;
	}

	for (var i = 0; i < outGoingVertices.length; i++) {
		var outGoingVertex = outGoingVertices[i];

		if (outGoingVertex in alreadyVisited) {
			continue;
		}

		alreadyVisited[outGoingVertex] = true;

		if (outGoingVertex == destVertex) {
			console.log("Path Found from source vertex (%s) to destination vertex (%s)", sourceVertex, destVertex);
			return true;
		}
		var pathExists = areNodesConnectedUsingDFS(graph, outGoingVertex, destVertex, alreadyVisited);

		if (pathExists) {
			return pathExists;
		}
	}

	return false;
}

function areNodesConnectedUsingBFS(graph, sourceVertex, destVertex, alreadyVisited) {
	var queue = new Queue();
	var outGoingVertices = graph.getOutgoingVertices(sourceVertex);

	if (outGoingVertices == undefined || outGoingVertices == null) {
		console.log("Vertex %s has no outging vertices, therefore it is not a source vertex", sourceVertex);
		return false;
	}

	queue.enqueue(outGoingVertices);

	while (!queue.isEmpty()) {
		var outGoingVertex = queue.dequeue();

		if (outGoingVertex in alreadyVisited) {
			continue;
		}

		alreadyVisited[outGoingVertex] = true;

		if (outGoingVertex == destVertex) {
			console.log("Path Found from source vertex (%s) to destination vertex (%s)", sourceVertex, destVertex);
			return true;
		}
		var deeperOutGoingVertices = graph.getOutgoingVertices(outGoingVertex);
		if (deeperOutGoingVertices != undefined || deeperOutGoingVertices != null) {
			queue.enqueue(deeperOutGoingVertices);
		}
	}
	return false;	
}


function Queue() {
	this.arr = new Array();
	this.headIndex = 0;
	this.tailIndex = 0;

	this.enqueue = function(data) {
		if (Array.isArray(data)) {
			for (var i = 0; i < data.length; i++) {
				this.arr.push(data[i]);
			}
			this.tailIndex += data.length;
		} else {
			this.arr.push(data);
			this.tailIndex++;			
		}
	}

	this.dequeue = function() {
		if (this.headIndex > this.tailIndex) {
			return null;
		}
		var node = this.arr[this.headIndex];
		this.arr[this.headIndex] = undefined;
		this.headIndex++;
		return node;
	}

	this.isEmpty = function() {
		if (this.headIndex == this.tailIndex) {
			return true;
		}
		return false;
	}
}

function test() {
	var graph = new DirectionalGraph();
	graph.connect("a", "b");
	graph.connect("a", "d");

	graph.connect("b", "f");
	graph.connect("d", "c");
	graph.connect("d", "e");
	graph.connect("d", "i");
	graph.connect("c", "j");
	graph.connect("c", "a");
	graph.connect("e", "h");
	graph.connect("e", "f");
	graph.connect("f", "g");
	graph.connect("i", "j");

	graph.printAllNodes();
	graph.printAllLinks();

	console.log("Using DFS, Is (a) connected to (b) = %s\n\n", search(graph, "a", "b", "DFS"));
	console.log("Using DFS, Is (a) connected to (f) = %s\n\n", search(graph, "a", "f", "DFS"));
	console.log("Using DFS, Is (a) connected to (g) = %s\n\n\n", search(graph, "c", "g", "DFS"));
	console.log("Using DFS, Is (i) connected to (g) = %s\n\n\n", search(graph, "i", "g", "DFS"));

	console.log("Using BFS, Is (a) connected to (b) = %s\n\n", search(graph, "a", "b", "BFS"));
	console.log("Using BFS, Is (a) connected to (f) = %s\n\n", search(graph, "a", "f", "BFS"));
	console.log("Using BFS, Is (a) connected to (g) = %s\n\n\n", search(graph, "c", "g", "BFS"));
	console.log("Using BFS, Is (i) connected to (g) = %s\n\n\n", search(graph, "i", "g", "BFS"));

}

test();
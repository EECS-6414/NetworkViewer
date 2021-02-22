const nodeFilterSelector = document.getElementById("nodeFilterSelect");
const nodeFilterSelectorApp = document.getElementById("nodeCount");
const edgeFilters = document.getElementsByName("edgesFilter");

function startNetwork(data) {

    var data2 = getScaleFreeNetwork(10);

    const container = document.getElementById("mynetwork");

    var options = {
        groups: {
            app: {
                shape: "circle",
            },
            author: {
                shape: "icon",
                icon: {
                    face: "'FontAwesome'",
                    code: "\uf007",
                    size: 50,
                    color: "gray",
                },
            },
        }
    };

    new vis.Network(container, data, options);
}

/**
 * In this example we do not mutate nodes or edges source data.
 */
const nodes = new vis.DataSet([
    { id: 1, label: "Google Photos", group: "app", value: 200},
    { id: 2, label: "Facebook", group: "app", value: 500},
    { id: 3, label: "Jaime", group: "author" },
    { id: 4, label: "Alex", group: "author" },
    { id: 5, label: "Arun", group: "author" },
    { id: 6, label: "Twitter", group: "app" , value: 100},
    { id: 7, label: "Mister", group: "author"},
    { id: 8, label: "Prof", group: "author"},
]);

const edges = new vis.DataSet([
    {
        from: 1,
        to: 3,
        relation: "negative",
        color: { color: "red" },
    },
    {
        from: 7,
        to: 2,
        relation: "negative",
        color: { color: "red" },
    },
    {
        from: 8,
        to: 2,
        relation: "positive",
        color: { color: "red" },
    },
    {
        from: 2,
        to: 3,
        relation: "positive",
        color: { color: "blue" },
    },
    {
        from: 5,
        to: 2,
        relation: "neutral",
        color: { color: "black" },
    },
    {
        from: 4,
        to: 1,
        relation: "positive",
        color: { color: "blue" },
    },
    {
        from: 4,
        to: 2,
        relation: "negative",
        color: { color: "red" },
    },
]);

/**
 * filter values are updated in the outer scope.
 * in order to apply filters to new values, DataView.refresh() should be called
 */
let nodeFilterValue = "";
let nodeCount = "";
const edgesFilterValues = {
    positive: true,
    negative: true,
    neutral: true,
};

/*
      filter function should return true or false
      based on whether item in DataView satisfies a given condition.
    */
const nodesFilter = (node) => {
    console.log(nodeCount)
    if (nodeFilterValue === "") {
        return true;
    }
    if (nodeFilterValue !== "custom") {
        switch (nodeFilterValue) {
            case "app":
                return node.group === "app";
            case "author":
                return node.group === "author";
            default:
                return true;
        }
    } else {
        return node.label === nodeCount
    }
};

function getEdgesOfNode(nodeId) {
    return edges.get().filter(function (edge) {
        return edge.from === nodeId || edge.to === nodeId;
    });
}

const edgesFilter = (edge) => {
    return edgesFilterValues[edge.relation];
};

const nodesView = new vis.DataView(nodes, { filter: nodesFilter });
const edgesView = new vis.DataView(edges, { filter: edgesFilter });

nodeFilterSelector.addEventListener("change", (e) => {
    // set new value to filter variable
    nodeFilterValue = e.target.value;

    /*
          refresh DataView,
          so that its filter function is re-calculated with the new variable
        */
    nodesView.refresh();
});

nodeFilterSelectorApp.addEventListener("change", (e) => {
    // set new value to filter variable
    nodeCount = e.target.value;
    console.log("change")
    /*
          refresh DataView,
          so that its filter function is re-calculated with the new variable
        */
    nodesView.refresh();
});

edgeFilters.forEach((filter) =>
    filter.addEventListener("change", (e) => {
        const { value, checked } = e.target;
        edgesFilterValues[value] = checked;
        edgesView.refresh();

    })
);

startNetwork({ nodes: nodesView, edges: edgesView });



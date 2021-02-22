const nodeFilterSelector = document.getElementById("nodeFilterSelect");
const nodeFilterSelectorApp = document.getElementById("nodeCount");
const edgeFilters = document.getElementsByName("edgesFilter");

function startNetwork(data) {

    var data2 = getScaleFreeNetwork(10);

    const container = document.getElementById("mynetwork");

    var options = {
        physics: {
            barnesHut: {
                springLength: 100, 
                springConstant: 0.04
            },
        },
        groups: {
            app: {
                shape: "dot",
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
    { id: 1, label: "Google Photos", group: "app", value: 600},
    { id: 2, label: "Google Duo - High Quality Video Calls", group: "app", value: 280},
    { id: 3, label: "Candy Crush Soda Saga", group: "app",value: 200 },
    { id: 4, label: "Google Play Music", group: "app",value: 180 },
    { id: 5, label: "Candy Crush Saga", group: "app", value: 150 },
    { id: 6, label: "Mini Militia - Doodle Army 2", group: "app" , value: 130},
    { id: 7, label: "Candy Crush Jelly Saga", group: "app", value: 110},
    { id: 8, label: "Castle Clash: Heroes of the Empire US", group: "app", value: 100},
    { id: 9, label: "MX Player", group: "app", value: 100},
    { id: 10, label: "Google Docs", group: "app",value: 100},
    { id: 11, group: "author", label: "Lim Yen Ping"},
    { id: 12, group: "author", label: "Emanuel Seuneke"},
    { id: 13, group: "author", label: "Rhonda Paschal"},
    { id: 14, group: "author", label: "Filipe Governa"},
    { id: 15, group: "author", label: "Janko Kinčeš"},
    { id: 16, group: "author", label: "Christina Reed"},
    { id: 17, group: "author", label: "Josh Clark"},
    { id: 18, group: "author", label: "Samuel Smith"},
    { id: 19, group: "author", label: "Andri Untoro"},
    { id: 20, group: "author", label: "William Howard"},
]);

const edges = new vis.DataSet([
    {
        from: 1,
        to: 11,
        relation: "negative",
        color: { color: "red" },
    },
    {
        from: 1,
        to: 16,
        relation: "negative",
        color: { color: "red" },
    },
    {
        from: 3,
        to: 17,
        relation: "negative",
        color: { color: "red" },
    },
    {
        from: 5,
        to: 19,
        relation: "negative",
        color: { color: "red" },
    },
    {
        from: 11,
        to: 10,
        relation: "negative",
        color: { color: "red" },
    },
    {
        from: 1,
        to: 14,
        relation: "negative",
        color: { color: "red" },
    },
    {
        from: 7,
        to: 11,
        relation: "negative",
        color: {color: "red" },
    },
    {
        from: 8,
        to: 13,
        relation: "positive",
        color: { color: "blue" },
    },
    {
        from: 2,
        to: 15,
        relation: "positive",
        color: { color: "blue" },
    },
    {
        from: 5,
        to: 20,
        relation: "neutral",
        color: { color: "black" },
    },
    {
        from: 4,
        to: 11,
        relation: "positive",
        color: { color: "blue" },
    },
    {
        from: 4,
        to: 18,
        relation: "negative",
        color: { color: "red" },
    },
    {
        from: 5,
        to: 16,
        relation: "negative",
        color: { color: "red" },
    },
       {
        from: 1,
        to: 18,
        relation: "negative",
        color: { color: "red" },
    },
    {
        from: 8,
        to: 12,
        relation: "negative",
        color: { color: "red" },
    },
    {
        from: 9,
        to: 12,
        relation: "positive",
        color: { color: "blue" },
    },
    {
        from: 4,
        to: 13,
        relation: "positive",
        color: { color: "blue" },
    },
    {
        from: 2,
        to: 20,
        relation: "neutral",
        color: { color: "black" },
    },
    {
        from: 8,
        to: 11,
        relation: "positive",
        color: { color: "blue" },
    },
    {
        from: 1,
        to: 17,
        relation: "negative",
        color: { color: "red" },
    },
    {
        from: 6,
        to: 11,
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



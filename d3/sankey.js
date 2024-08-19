const svg = d3.select("#sankey"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

const sankey = d3.sankey()
    .nodeWidth(20)
    .nodePadding(10)
    .size([width, height]);

const color = d3.scaleOrdinal(d3.schemeCategory10);

// Example data for the Sankey diagram
const data = {
    "nodes": [
        { "name": "Product Viewed" },
        { "name": "Add to Cart" },
        { "name": "Add to Favorites" },
        { "name": "Login" },
        { "name": "Remove from Cart" },
        { "name": "Product Viewed Again" },
        { "name": "Purchase Product" },
        { "name": "View Similar Items" },
        { "name": "Upgrade Account" },
        { "name": "View Purchases" },
        { "name": "Track Order" },
        { "name": "View Profile" },
        { "name": "Inactive" }
    ],
    "links": [
        { "source": 0, "target": 1, "value": 50 },
        { "source": 0, "target": 2, "value": 20 },
        { "source": 0, "target": 3, "value": 30 },
        { "source": 1, "target": 4, "value": 10 },
        { "source": 1, "target": 5, "value": 10 },
        { "source": 1, "target": 6, "value": 30 },
        { "source": 2, "target": 7, "value": 20 },
        { "source": 3, "target": 8, "value": 5 },
        { "source": 3, "target": 9, "value": 10 },
        { "source": 3, "target": 10, "value": 5 },
        { "source": 3, "target": 4, "value": 5 },
        { "source": 3, "target": 11, "value": 5 },
        { "source": 3, "target": 12, "value": 5 }
    ]
};

// Generate the Sankey diagram
const graph = sankey({
    nodes: data.nodes.map(d => Object.assign({}, d)),
    links: data.links.map(d => Object.assign({}, d))
});

// Draw links
const link = svg.append("g")
    .selectAll(".link")
    .data(graph.links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.sankeyLinkHorizontal())
    .style("stroke-width", d => Math.max(1, d.width))
    .style("stroke", d => color(d.source.name));

// Add titles to the links
link.append("title")
    .text(d => `${d.source.name} → ${d.target.name}\n${d.value}`);

// Draw nodes
const node = svg.append("g")
    .selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

// Draw rectangles for nodes
node.append("rect")
    .attr("height", d => d.y1 - d.y0)
    .attr("width", sankey.nodeWidth())
    .style("fill", d => color(d.name))
    .style("stroke", d => d3.rgb(color(d.name)).darker(2));

// Add text labels to the nodes
node.append("text")
    .attr("x", -6)
    .attr("y", d => (d.y1 - d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", "end")
    .text(d => d.name)
    .filter(d => d.x0 < width / 2)
    .attr("x", 6 + sankey.nodeWidth())
    .attr("text-anchor", "start");

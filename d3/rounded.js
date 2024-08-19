


function drawSemicircle(svgId, progress, widths, heights,color) {
    const width = widths;
    const height = heights;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(`#${svgId}`)
        .attr("width", width)
        .attr("height", height);

    const arc = d3.arc()
        .innerRadius(radius - 20)
        .outerRadius(radius)
        .cornerRadius(10)
        .startAngle(-Math.PI / 2)  // Start angle
        .endAngle(Math.PI / 2);    // End angle (semicircle)

    const g = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height})`);

    g.append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("fill", "#e0e0e0");

    const progressArc = d3.arc()
        .innerRadius(radius - 20)
        .cornerRadius(10)
        .outerRadius(radius)
        .startAngle(-Math.PI / 2)
        .endAngle(-Math.PI / 2 + (Math.PI * progress));

    g.append("path")
        .attr("class", "arc")
        .attr("d", progressArc)
        .attr("fill", color);

    // svg.append("text")
    //     .attr("x", width / 2)
    //     .attr("y", height - 10)
    //     .attr("text-anchor", "middle")
    //     .attr("font-size", "24px")
    //     .attr("fill", "#333")
    // .text(`${Math.round(progress * 100)}%`);
}

// Draw three SVGs with different progress values
drawSemicircle("svg1", 77 / 100, 400,250,'rgb(23, 203, 191)');  // Example progress 44%
drawSemicircle("svg2", 75 / 100, 400,200,'blue');  // Example progress 75%
drawSemicircle("svg3", 85 / 100, 400,150,'green');  // Example progress 25%
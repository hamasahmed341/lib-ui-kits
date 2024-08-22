function drawSemicircle(svgId, progress, widths, heights, color) {
    const width = widths;
    const height = heights;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(`#${svgId}`)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${widths} ${heights / 2}`)
        // .attr("preserveAspectRatio", "xMidYMid meet");
    const arc = d3.arc()
        .innerRadius(radius - 80)
        .outerRadius(radius)
        .startAngle(-Math.PI / 2)  // Start angle
        .endAngle(Math.PI / 2);    // End angle (semicircle)

    const g = svg.append("g")
        // .attr("height", 300)
        // .attr("width", 300)
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    g.append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("fill", "#e0e0e0");

    const progressArcRed = d3.arc()
        .innerRadius(radius - 20)
        .outerRadius(radius)
        .startAngle(-Math.PI / 2)
        .endAngle(-Math.PI / 2.2 + (Math.PI * 70 / 100));

    g.append("path")
        .attr("class", "arc")
        .attr("d", progressArcRed)
        .attr("fill", 'red');


    const progressArcGray = d3.arc()
        .innerRadius(radius - 40)
        .outerRadius(radius)
        .startAngle(-Math.PI / 2)
        .endAngle(-Math.PI / 2.2 + (Math.PI * 50 / 100));

    g.append("path")
        .attr("class", "arc")
        .attr("d", progressArcGray)
        .attr("fill", 'gray')
        .attr("stroke", "white")       // Border color
        .attr("stroke-width", 1);

    const progressArc = d3.arc()
        .innerRadius(radius - 80)
        .outerRadius(radius)
        .startAngle(-Math.PI / 2)
        .endAngle(-Math.PI / 2.2 + (Math.PI * 30 / 100));

    g.append("path")
        .attr("class", "arc")
        .attr("d", progressArc)
        .attr("fill", 'green')
        .attr("stroke", "white")       // Border color
        .attr("stroke-width", 1);

}
drawSemicircle("svg3", 1 / 100, 400, 400, 'gray');  // Example progress 25%

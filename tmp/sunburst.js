var svgns = "http://www.w3.org/2000/svg";
var radiuses = [100, 200, 300]

function partition(root) {
    root.startAngle = 0
    root.angle = Math.PI*2
    root.endAngle = Math.PI*2
    calcNodes(root.nodes, 0, Math.PI*2)

    root.level = 0
    var nodes = []
    push(nodes, root)
    return nodes
}

function push(nodes, parent) {
    nodes.push(parent)
    if (!parent.nodes) return;

    // nodes.push.apply(nodes, parent.nodes)
    for (var i=0; i<parent.nodes.length; i++) {
        parent.nodes[i].level=parent.level+1
        push(nodes, parent.nodes[i])
    }
}

function calcNodes(nodes, startAngle, totalAngle) {
    if (!nodes) return

    // 计算每个节点的角度和起始角度
    var sum = nodes.reduce(function(s, d){ return s+d.value }, 0)
    nodes.forEach(function(d, i) {d.angle = totalAngle * d.value/sum})
    nodes.reduce(function(s, d){
        d.startAngle = s
        d.endAngle = d.startAngle + d.angle
        calcNodes(d.nodes, d.startAngle, d.angle)

        return d.endAngle
    }, startAngle)
}


var size = 200

function drawPie(chart, d) {
    // primary wedge
    var path = document.createElementNS(svgns, "path");
    var startAngle = d.startAngle;
    var endAngle = d.endAngle;
    var radius = (d.level+1)*25

    var x1 = 0 + radius * Math.sin(startAngle);
    var y1 = 0 - radius * Math.cos(startAngle);
    var x2 = 0 + radius * Math.sin(endAngle);
    var y2 = 0 - radius * Math.cos(endAngle);
    var big = (endAngle - startAngle > Math.PI) ? 1 : 0;

    var dd = "M 0,0" +  // Start at circle center
        " L " + x1 + "," + y1 +     // Draw line to (x1,y1)
        " A " + radius + "," + radius +       // Draw an arc of radius r
        " 0 " + big + " 1 " +       // Arc details...
        x2 + "," + y2 +             // Arc goes to to (x2,y2)
        " Z";                       // Close path back to (cx,cy)
    path.setAttribute("d", dd); // Set this path 
    path.setAttribute("fill", d.color);
    path.setAttribute("stroke", "rgb(255,255,255)")
    path.setAttribute("stroke-width", 1)
    path.setAttribute("transform", "translate("+size/2+","+size/2+")")
    chart.appendChild(path); // Add wedge to chart
}

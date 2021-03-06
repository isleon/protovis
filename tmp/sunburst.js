var svgns = 'http://www.w3.org/2000/svg';

function Sunburst(container, data, size) {
    var svg = document.createElementNS(svgns, 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    // svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);

    var gr = document.createElementNS(svgns, 'g');
    gr.setAttribute('transform', 'translate('+size/2+','+size/2+')')
    svg.appendChild(gr);

    var gn = document.createElementNS(svgns, 'g');
    // gn.setAttribute('transform', 'translate('+size/2+','+size/2+')')
    gr.appendChild(gn);

    var nodes = partition(root)
    for (var i=nodes.length-1; i>=0; i--) {
        var path = createPie(nodes[i])
        gn.appendChild(path); // Add wedge to svg
    };

    var gt = document.createElementNS(svgns, 'g');
    gr.appendChild(gt);

    for (var i=root.nodes.length-1; i>=0; i--){
        var text = createLabel(root.nodes[i])
        gt.appendChild(text)
    }

    var c = document.getElementById(container);
    c.appendChild(svg);

    function partition(root) {
        root.level = 0
        root.startAngle = 0
        root.angle = Math.PI*2
        root.endAngle = Math.PI*2

        calcNodes(root.nodes, 0, Math.PI*2)

        var nodes = []
        push(nodes, root)
        return nodes
    }

    function push(nodes, parent) {
        parent.radius = (parent.level+1)*size/8

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

    function createPie(d) {
        // primary wedge
        var path = document.createElementNS(svgns, 'path');
        var startAngle = d.startAngle;
        var endAngle = d.endAngle;
        var radius = d.radius

        var x1 = 0 + radius * Math.cos(startAngle);
        var y1 = 0 - radius * Math.sin(startAngle);
        var x2 = 0 + radius * Math.cos(endAngle);
        var y2 = 0 - radius * Math.sin(endAngle);
        var big = (endAngle - startAngle > Math.PI) ? 1 : 0;

        var dd = 'M 0,0' +  // Start at circle center
            ' L ' + x2 + ',' + y2 +     // Draw line to (x1,y1)
            ' A ' + radius + ',' + radius +       // Draw an arc of radius r
            ' 0 ' + big + ' 1 ' +       // Arc details...
            x1 + ',' + y1 +             // Arc goes to to (x2,y2)
            ' Z';                       // Close path back to (cx,cy)
        path.setAttribute('d', dd); // Set this path 
        path.setAttribute('fill', d.color);
        path.setAttribute('stroke', 'rgb(255,255,255)')
        path.setAttribute('stroke-width', 1)
        // path.setAttribute('transform', 'translate('+size/2+','+size/2+')')
        return path
    }

    function createLabel(d) {
        var ma = (d.startAngle+d.endAngle)/2 //中间角度
        var cx = 0 + d.radius*Math.cos(ma)/2
        var cy = 0 - d.radius*Math.sin(ma)/2
        var dg = 360-180*ma/Math.PI
        if (dg > 90 && dg<270) dg += 180 

        var text = document.createElementNS(svgns, 'text')
        text.setAttribute('pointer-events', 'none')
        text.setAttribute('fill', 'rgb(0,0,0)')
        text.setAttribute('text-anchor', 'middle')
        text.setAttribute('transform',  'translate('+cx+','+cy+')' + 'rotate('+dg+')')

        if (text.firstChild) text.firstChild.nodeValue = d.label;
        else text.appendChild(document.createTextNode(d.label));

        return text
    }

}

async function createVisualization() {

    let parent = document.getElementById("svg-drawing")
    while(parent.hasChildNodes())
    {
        parent.removeChild(parent.firstChild)
    }


    const data = await fetchData();

    var g = new dagre.graphlib.Graph();
    g.setGraph({marginx: 100, marginy: 100, nodesep:200, ranksep: 100});
    g.setDefaultEdgeLabel(function() { return {}; });

    data.nodes.forEach(node => {
        g.setNode(node.id, { jobname: node.jobname, status: node.status, isHold: node.isHold });
      });

    data.edges.forEach(edge => {
        g.setEdge(edge.from, edge.to);
    });
    
    dagre.layout(g);

    console.log("Nodes Length : ", g.nodes().length);
    console.log("Edges Length : ", g.edges().length);

    //   g.nodes().forEach(function(v) {
    //     console.log("Node " + v + ": " + JSON.stringify(g.node(v)));
    // });
    // g.edges().forEach(function(e) {
    //     console.log("Edge " + e.v + " -> " + e.w + ": " + JSON.stringify(g.edge(e)));
    // });


    for (let i=1; i<=g.nodes().length; i++)
    {   
        let newElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        if (g.node(i)["status"] == 1)
        {
            newElement.setAttribute('fill', 'lightgreen');
        }
        if (g.node(i)["status"] == -1)
        {
            newElement.setAttribute('fill', 'lightgrey');
        }
        if (g.node(i)["status"] == 0)
        {
            newElement.setAttribute('fill', 'lightcoral');  
        }
        if (g.node(i)["status"] == 4)
        {
            newElement.setAttribute('fill', 'gold');  
        }
        newElement.setAttribute('width', '50');
        newElement.setAttribute('height', '50');
        newElement.setAttribute('x', g.node(i)["x"]-25);
        newElement.setAttribute('y', g.node(i)["y"]-25);
        newElement.setAttribute('id', 'node-' + g.nodes()[i-1]);
        //newElement.addEventListener('contextmenu', rightClickNode);
        document.getElementById('svg-drawing').appendChild(newElement);


        let newJobname = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        newJobname.setAttribute('x', g.node(i)["x"]-75);
        newJobname.setAttribute('y', g.node(i)["y"]);
        newJobname.setAttribute('id', 'jobname-' + g.nodes()[i-1]);
        let textNode = document.createTextNode(g.node(i)["jobname"]);
        newJobname.appendChild(textNode);
        document.getElementById('svg-drawing').appendChild(newJobname);
        
        
        let foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');    
        foreignObject.setAttribute('height', 10);
        foreignObject.setAttribute('width', 10);
        foreignObject.setAttribute('x', g.node(i)["x"] - 20);
        foreignObject.setAttribute('y', g.node(i)["y"] + 10);
        var spann = document.createElement('span');
        spann.setAttribute('id', 'hold-' +  + g.nodes()[i-1]);
        if (g.node(i)["isHold"] == true)
        {   
            spann.innerHTML = "<i class='fa fa-lock' style='font-size:10px;'></i>";
            foreignObject.appendChild(spann);    
        }
        else 
        {
            spann.innerHTML = "";
            foreignObject.appendChild(spann);
        }
        document.getElementById('svg-drawing').appendChild(foreignObject);

    }
    
    for (let i=1; i<=g.edges().length; i++) 
    {   
        let newElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newElement.setAttribute('x1', g.node(g.edges()[i-1]["v"]).x);
        newElement.setAttribute('y1', (g.node(g.edges()[i-1]["v"]).y) + 25);
        newElement.setAttribute('x2', g.node(g.edges()[i-1]["w"]).x);
        newElement.setAttribute('y2', (g.node(g.edges()[i-1]["w"]).y) -25);
        newElement.setAttribute('stroke', 'black');
        newElement.setAttribute('stroke-width', 1);
        document.getElementById('svg-drawing').appendChild(newElement);
        
        
    }

    // let newElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // newElement.setAttribute('x', '50');
    // newElement.setAttribute('y', '50');
    // newElement.setAttribute('fill', 'black');
    // newElement.setAttribute('font-size', '16');
    // //newElement.textContent = "<i class='fa fa-lock'></i>";

    // let iconTspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    // iconTspan.innerHTML = "<tspan><i class='fa fa-lock'></i></tspan>";
    // newElement.appendChild(iconTspan);

    // document.getElementById('svg-drawing').appendChild(newElement);


    // if(document.getElementById("node-10")) 
    // {
    //     console.log("Element with id found");
    // }
    // else {
    //     console.log("Element with id not found");
    // }
   
} 


createVisualization();

// function startDataUpdateInterval() {
//     setInterval(createandUpdateVisualization, 50000); // Update every 5 seconds
// }
// startDataUpdateInterval();

// function reloadPage() {
//     location.reload();
// }

// function startReloadInterval() {
//     setInterval(reloadPage, 60000); // Reload every 1 minute (60 seconds * 1000 milliseconds)
// }
// startReloadInterval();




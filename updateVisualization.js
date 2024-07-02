
async function updateVisualization() {

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

    //console.log("Hello from update");
    for (let i=1; i<=g.nodes().length; i++)
    {
        
        if(document.getElementById('node-' + g.nodes()[i-1]))
        {
            //document.getElementById('node-' + g.nodes()[i-1]).setAttribute()
            if (g.node(i)["status"] == 1)
            {
                document.getElementById('node-' + g.nodes()[i-1]).setAttribute('fill', 'lightgreen');
            }
            if (g.node(i)["status"] == -1)
            {
                document.getElementById('node-' + g.nodes()[i-1]).setAttribute('fill', 'lightgrey');
            }
            if (g.node(i)["status"] == 0)
            {
                document.getElementById('node-' + g.nodes()[i-1]).setAttribute('fill', 'lightcoral');
            }
            if (g.node(i)["status"] == 4)
            {
                document.getElementById('node-' + g.nodes()[i-1]).setAttribute('fill', 'gold');
            }
        } 

        if(document.getElementById('hold-' + g.nodes()[i-1]))
        {
            //console.log(g.nodes()[i-1]);
            if (g.node(i)["isHold"] == true)
            {
                document.getElementById('hold-' + g.nodes()[i-1]).innerHTML="<i class='fa fa-lock' style='font-size:10px;'></i>";
            }
            else
            {
                document.getElementById('hold-' + g.nodes()[i-1]).innerHTML="";
            }
        }
    }

}


function startDataUpdateInterval() {
    setInterval(updateVisualization, 5000); // Update every 5 seconds
}
startDataUpdateInterval();



//Want page refresh every 10 mins
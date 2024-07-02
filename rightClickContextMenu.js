


document.onclick = hideMenu; 
    document.oncontextmenu = rightClick; 
      
    function hideMenu() { 
        document.getElementById("contextMenu") 
                .style.display = "none" 
    } 
  
    function rightClick(e) { 
        e.preventDefault(); 
        var menu = document.getElementById("contextMenu");
        menu.innerHTML = ""; // Clear previous menu items
        

        if (e.target.id.startsWith('node'))
        {
            var targetId = e.target.id;
            console.log(targetId.slice(5));
            menu.style.display = 'block';
            menu.style.left = e.pageX + "px";
            menu.style.top = e.pageY + "px";

            var ul = document.createElement("ul");
            var liId = document.createElement("li");
            var liHold = document.createElement("li");
            var liJobName = document.getElementById('jobname-' + targetId.slice(5)).innerHTML
            var liMarkasOk = document.createElement("li");
            var liReRun = document.createElement("li");

            //console.log(document.getElementById('node-5').getAttribute('fill'));

            liId.innerHTML = "<a href='#'>" + "Id : " + targetId.slice(5) + "</a>";

            if (document.getElementById('hold-' + targetId.slice(5)).innerHTML.includes('lock')) {
                //liHold.innerHTML = "<button onClick='confirmationonHold(id = targetId.slice(5), statusToUpdate = 'Hold')'>" + "Release " + "</button>";
                liHold.innerHTML = "<button onClick=\"confirmationonHold('" + targetId.slice(5) + "', '" + liJobName + "', 'Release')\">" + "Release " + "</button>";

            }
            else {
                //liHold.innerHTML = "<a href='#'> " + "Hold " + "</a>"; 
                liHold.innerHTML = "<button onClick=\"confirmationonHold('" + targetId.slice(5) + "', '" + liJobName + "', 'Hold')\">" + "Hold " + "</button>";
            }


            ul.appendChild(liId);
            ul.appendChild(liHold);

            let fillValue = document.getElementById('node-' + targetId.slice(5)).getAttribute('fill');
            if (fillValue == 'lightcoral' || fillValue == 'lightgrey') {
                console.log("Job failed or Job not started");
                liMarkasOk.innerHTML = "<button onClick=\"confirmationonMarkasOk('" + targetId.slice(5) + "', '" + liJobName + "')\">" + "Mark as OK" + "</button>";
                ul.appendChild(liMarkasOk);
            }

            if (fillValue == 'lightcoral' || fillValue == 'lightgreen') {
                liReRun.innerHTML = "<button onClick=\"confirmationonReRun('" + targetId.slice(5) + "', '" + liJobName + "')\">" + "Re-Run" + "</button>";
                ul.appendChild(liReRun);
            }

            
            menu.appendChild(ul);

        }
    } 

    function confirmationonHold(id, jobName, statusToUpdate) {
        if (confirm("Are you sure to " + statusToUpdate + " job with Id : " + id + " and Jobname : " + jobName)) {
            console.log("Sure");
            toggleHold(id);
        } else {
            console.log("Cancel");
        }

    }

    function confirmationonMarkasOk(id, jobName) {
        if (confirm("Are you sure to Mark as OK job with Id : " + id + " and Jobname : " + jobName)) {
            console.log("Marked as Ok");
            changeStatus(id, '1');
        } else {
            console.log("Cancelled Mark as OK");
        }
    }

    function confirmationonReRun(id, jobName) {
        if (confirm("Are you sure to Re-Run job with Id : " + id + " and Jobname : " + jobName)) {
            console.log("Re-Run Done");
            changeStatus(id, '-1');
        } else {
            console.log("Re-Run Cancelled");
        }
    }





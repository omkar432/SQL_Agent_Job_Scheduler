
var bttn = document.getElementById("startorpausebutton");
bttn.innerHTML = "Restart"; // Clear previous menu items

 async function fetchjobStartorStop() {
            try {
                const response_server = await fetch('http://127.0.0.1:8000/getStartorStop');
				const data = await response_server.json();
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
      }
}
 

 
 function confirmationonStartorPause() {
        if (confirm("Are you sure to update the status?")) {
            console.log("Sure");
			toggleStartPause();
        } else {
            console.log("Cancel");
        }

		
//if (confirm("Are you sure to " + statusToUpdate + " job with Id : " + id + " and Jobname : " + jobName)) {
//            console.log("Sure");
//            toggleHold(id);
//        } else {
//            console.log("Cancel");
//        }
    }
	
	
async function toggleStartPause() {
    try {
        const response = await fetch(`http://127.0.0.1:8000/toggleStartPauseStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        //console.log("Response logging : ", response);   
        if (response.ok) {
            //console.log('Node held successfully:', jobid);
            // You can perform any additional actions here if needed
			updateVisualization();
        } else {
            console.error('Hold request failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error holding node:', error);
    }
}

// Function to hold a node via API
async function toggleHold(jobid) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/toggleHold?jobid=${jobid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        //console.log("Response logging : ", response);   
        if (response.ok) {
            //console.log('Node held successfully:', jobid);
            // You can perform any additional actions here if needed
            updateVisualization()
        } else {
            console.error('Hold request failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error holding node:', error);
    }
}
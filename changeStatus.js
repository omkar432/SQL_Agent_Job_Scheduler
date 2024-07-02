

async function changeStatus(jobid, status) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/changeStatus?jobid=${jobid}&status=${status}`, {
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
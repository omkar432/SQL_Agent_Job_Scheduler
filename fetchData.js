async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:8000/runandViewJobData');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
      }
}
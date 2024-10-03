async function fetchServerName() {
            try {
                const response_server = await fetch('http://127.0.0.1:8000/serverName');
				const data = await response_server.json();
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
      }
}
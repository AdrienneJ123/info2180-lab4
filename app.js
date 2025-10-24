window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('btn');
  const resultDiv = document.getElementById('result');
  const input = document.getElementById('search');

  button.addEventListener('click', () => {
    const query = input.value.trim();
    const url = query 
      ? `superheroes.php?query=${encodeURIComponent(query)}`
      : `superheroes.php`; // If blank, show full list

    // Clear previous results
    resultDiv.innerHTML = "<p>Loading...</p>";

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then(data => {
        const cleanData = data.trim();

        // Handle blank or not found responses more clearly
        if (cleanData === "") {
          resultDiv.innerHTML = `<p style="color:red;">Superhero not found</p>`;
        } else if (cleanData.toLowerCase().includes("superhero not found")) {
          resultDiv.innerHTML = `<p style="color:red;">Superhero not found</p>`;
        } else {
          resultDiv.innerHTML = cleanData;
        }
      })
      .catch(error => {
        resultDiv.innerHTML = `<p style="color:red;">Error fetching data: ${error.message}</p>`;
      });
  });

  // Optional: Allow Enter key to trigger the search
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      button.click();
    }
  });
});

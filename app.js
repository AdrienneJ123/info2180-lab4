window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('btn');
  const resultDiv = document.getElementById('result');
  const input = document.getElementById('search');

  button.addEventListener('click', () => {
    const query = input.value.trim();
    const url = `superheroes.php?query=${encodeURIComponent(query)}`;

    fetch(url)
      .then(response => response.text())
      .then(data => {
        resultDiv.innerHTML = data;
      })
      .catch(error => {
        resultDiv.innerHTML = `<p style="color:red;">Error fetching data: ${error}</p>`;
      });
  });
});

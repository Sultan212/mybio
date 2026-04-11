let data = [];

fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
  });

function search() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "";

  const results = data.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    resultsDiv.innerHTML = "Sonuç bulunamadı.";
    return;
  }

  results.forEach(item => {
    resultsDiv.innerHTML += `
      <div class="result">
        <a href="${item.url}" target="_blank"><h3>${item.title}</h3></a>
        <p>${item.description}</p>
      </div>
    `;
  });
}

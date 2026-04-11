let data = [];

fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
  });

const input = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

// Yazarken otomatik arama
input.addEventListener("input", search);

function search() {
  const query = input.value.toLowerCase();
  resultsDiv.innerHTML = "";

  if (query === "") return;

  const results = data.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>Sonuç bulunamadı.</p>";
    return;
  }

  results.forEach(item => {
    resultsDiv.innerHTML += `
      <div class="result">
        <a href="${item.url}" target="_blank">
          <h3>${item.title}</h3>
        </a>
        <p>${item.description}</p>
      </div>
    `;
  });
}

let data = [];

// Sayfa açılınca mevcut veriyi çek
fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    render();
  });

function addData() {
  const title = document.getElementById("title").value;
  const url = document.getElementById("url").value;
  const desc = document.getElementById("desc").value;

  if (!title || !url) {
    alert("Boş bırakma!");
    return;
  }

  data.push({
    title: title,
    url: url,
    description: desc
  });

  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((item, index) => {
    list.innerHTML += `
      <div class="result">
        <b>${item.title}</b>
        <p>${item.description}</p>
        <button onclick="deleteItem(${index})">Sil</button>
      </div>
    `;
  });
}

function deleteItem(index) {
  data.splice(index, 1);
  render();
}

function downloadJSON() {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.json';
  a.click();
}

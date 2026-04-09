let currentUser = localStorage.getItem('currentUser');
updateUI();

function showRegister() {
    document.getElementById('registerSection').style.display = 'block';
    document.getElementById('loginSection').style.display = 'none';
}
function showLogin() {
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
}

function register() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    if(!username || !password) return;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if(users.find(u => u.username === username)){
        document.getElementById('regMessage').innerText = 'Kullanıcı adı zaten var!';
        return;
    }
    users.push({username, password});
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('regMessage').innerText = 'Kayıt başarılı! Giriş yapabilirsiniz.';
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => u.username === username && u.password === password);
    if(user){
        localStorage.setItem('currentUser', username);
        currentUser = username;
        updateUI();
    } else {
        document.getElementById('loginMessage').innerText = 'Kullanıcı adı veya şifre hatalı!';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateUI();
}

function updateUI() {
    if(currentUser){
        document.getElementById('auth').style.display = 'none';
        document.getElementById('user').style.display = 'block';
        document.getElementById('usernameDisplay').innerText = currentUser;
        document.getElementById('feedSection').style.display = 'block';
        showPosts();
    } else {
        document.getElementById('auth').style.display = 'block';
        document.getElementById('user').style.display = 'none';
        document.getElementById('feedSection').style.display = 'none';
    }
}

function addPost() {
    const caption = document.getElementById('postCaption').value;
    const file = document.getElementById('postImage').files[0];
    if(!file) return alert('Fotoğraf seçiniz.');

    const reader = new FileReader();
    reader.onload = function(e){
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        posts.unshift({username: currentUser, caption, image: e.target.result});
        localStorage.setItem('posts', JSON.stringify(posts));
        showPosts();
        document.getElementById('postCaption').value = '';
        document.getElementById('postImage').value = '';
    }
    reader.readAsDataURL(file);
}

function showPosts() {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `<strong>${post.username}</strong><br>
                         <img src="${post.image}" alt=""><br>
                         <p>${post.caption}</p>`;
        postsDiv.appendChild(div);
    });
}

let score = 0;
let gameInterval;

function startGame() {
    score = 0;
    document.getElementById('score').innerText = score;
    clearInterval(gameInterval);
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '';

    gameInterval = setInterval(() => {
        createBox();
    }, 1000);
}

function createBox() {
    const gameArea = document.getElementById('gameArea');
    const box = document.createElement('div');
    box.className = 'box';
    box.style.backgroundColor = getRandomColor();
    box.style.top = Math.random() * (gameArea.offsetHeight - 50) + 'px';
    box.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';

    box.addEventListener('click', () => {
        score++;
        document.getElementById('score').innerText = score;
        box.remove();
    });

    gameArea.appendChild(box);

    // 3 saniye sonra kutu kaybolsın
    setTimeout(() => {
        if(box.parentElement) box.remove();
    }, 3000);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i=0;i<6;i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

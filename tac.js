let p = 1;
let p1 = 0;
let p2 = 0;
let isGameOver = false;

const winConditions = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]             
];

function handleClick(id) {
    if (isGameOver || document.getElementById(id).innerText !== '') return;

    const cell = document.getElementById(id);
    cell.innerText = p === 1 ? 'X' : 'O';
    cell.style.color = p === 1 ? '#00bfff' : '#ffffff';
    
    checkWinner();
    
    if (!isGameOver) {
        p = p === 1 ? 0 : 1;
        updateTurnUI();
    }
}

function updateTurnUI() {
    const sX = document.getElementById('scoreX');
    const sO = document.getElementById('scoreO');
    
    if (p === 1) {
        sX.classList.add('active');
        sO.classList.remove('active');
    } else {
        sO.classList.add('active');
        sX.classList.remove('active');
    }
}

function checkWinner() {
    const statusDisplay = document.getElementById('status-message');

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        const valA = document.getElementById(a).innerText;
        const valB = document.getElementById(b).innerText;
        const valC = document.getElementById(c).innerText;

        if (valA !== '' && valA === valB && valA === valC) {
            isGameOver = true;
            statusDisplay.innerText = `PLAYER ${valA} WINS!`;
            statusDisplay.classList.add('show');
            
            if (valA === 'X') p1++; else p2++;
            updateScores();
            return;
        }
    }

    let cells = [];
    for(let i=1; i<=9; i++) cells.push(document.getElementById(i).innerText);
    
    if(!cells.includes('')) {
        isGameOver = true;
        statusDisplay.innerText = "IT'S A DRAW!";
        statusDisplay.classList.add('show');
    }
}

function updateScores() {
  document.getElementById('scoreP1').innerText = p1;
  document.getElementById('scoreP2').innerText = p2;
}

function reset() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(i).innerText = '';
    }
    isGameOver = false;
    p = 1;
    const statusDisplay = document.getElementById('status-message');
    statusDisplay.innerText = '';
    statusDisplay.classList.remove('show');
    updateTurnUI();
}

function newGame() {
  p1 = 0; p2 = 0;
  updateScores();
  reset();
}
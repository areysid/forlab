        function openPlayerConfig(event) {
            editedPlayer = +event.target.dataset.playerid;
            playerConfigOverlayElement.style.display = 'block';
            backDropElement.style.display = 'block';
        }
        
        function closePlayerConfig() {
            playerConfigOverlayElement.style.display = 'none';
            backDropElement.style.display = 'none';
            formElement.firstElementChild.classList.remove('error');
            errorOutputElement.textContent = '';
            formElement.firstElementChild.lastElementChild.value = '';
        }
        
        function savePlayerConfig(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const enteredPlayerName = formData.get('PlayerName').trim();
            
            if (!enteredPlayerName) {
                event.target.firstElementChild.classList.add('error');
                errorOutputElement.textContent = 'Please enter a valid name!';
                
                return;
            }

            const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data');
            updatedPlayerDataElement.children[1].textContent = enteredPlayerName;
            
            player[editedPlayer - 1].name = enteredPlayerName;
            closePlayerConfig();
        }
        
        function resetGameStatus() {
            activePlayer = 0;
            currentRound = 1;
            gameIsOver = false;
            gameOverElement.firstElementChild.innerHTML = 'You Won! <span id="winner-name">PLAYER NAME</span>';
            gameOverElement.style.display = 'none';
            let gameBoardIndex = 0;

            for (let i = 0; i <= 2; i++) {
                for (let j = 0; j <= 2; j++) {
                    gameData[i][j] = 0;
                    const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
                    gameBoardItemElement.textContent = '';
                    gameBoardItemElement.classList.remove('disabled');
                    gameBoardIndex++;
                }
            }

        }

        function startNewGame() {

            if (player[0].name === '' || player[1].name === '') {
                alert('Please set custom name for both players!')
                return;
            }

            document.getElementById('player2-score').textContent = 'Player O  : ' + player2Score
            document.getElementById('player1-score').textContent = 'Player X  : ' +player1Score
            resetGameStatus();
            activePlayerNameElement.textContent = player[activePlayer].name;
            document.getElementById('active-game').style.display = 'block';
        }





        function switchPlayer() {
            if (activePlayer === 0) {
                activePlayer = 1;
            } else {
                activePlayer = 0;
            }
            activePlayerNameElement.textContent = player[activePlayer].name;
        }



        function selectGameField(event) {

            if (event.target.tagName !== 'LI' || gameIsOver) {
                return;
            }

            const selectedField = event.target;

            const selectedColumn = selectedField.dataset.col - 1;
            const selectedRow = selectedField.dataset.row - 1;

            if (gameData[selectedColumn][selectedRow] > 0) {
                alert("Please select an empty field!");
                return;
            }

            selectedField.textContent = player[activePlayer].symbol;
            selectedField.classList.add('disabled');

            gameData[selectedColumn][selectedRow] = activePlayer + 1;

            const winnerId = checkForGameOver();
            if (winnerId !== 0) {
                endGame(winnerId);
            }
            currentRound++;
            switchPlayer();
        }

        function checkForGameOver() {
            for (let i = 0; i <= 2; i++) {
                if (gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]) {
                    return gameData[i][0];
                }
            }
            for (let i = 0; i <= 2; i++) {
                if (gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[1][i] === gameData[2][i]) {
                    return gameData[0][i];
                }
            }
         
            if (gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) {
                return gameData[0][0];
            }

            if (gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]) {
                return gameData[2][0];
            }

            if (currentRound === 9) {
                return -1;
            }

            return 0;
        }

        function endGame(winnerId) {
            gameIsOver = true;
            gameOverElement.style.display = 'block';
            if (winnerId > 0) {
                gameOverElement.firstElementChild.firstElementChild.textContent = player[winnerId - 1].name;
            }
            else {
                gameOverElement.firstElementChild.textContent = 'it\'s a DRAW!';
            }

        }
        

        const gameData = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];


        let editedPlayer = 0;
        let activePlayer = 0;
        let currentRound = 1;
        let gameIsOver = false;
        const player = [
            {
                name: '',
                symbol: 'X'
            },
            {
                name: '',
                symbol: 'O'
            },
        ];

        const playerConfigOverlayElement = document.getElementById('config-overlay');
        const backDropElement = document.getElementById('backdrop');
        const formElement = document.querySelector('form');
        const errorOutputElement = document.getElementById('config-error');
        const activePlayerNameElement = document.getElementById('active-player-name');
        const gameOverElement = document.getElementById('game-over');

        const editPlayer1btnElement = document.getElementById('edit-player-1-btn');
        const editPlayer2btnElement = document.getElementById('edit-player-2-btn');
        const cancelConfigBtnElement = document.getElementById('cancel-config-btn');


        const startNewGameBtnElement = document.getElementById('start-game-btn');

        const gameBoardElement = document.getElementById('game-board');


        editPlayer1btnElement.addEventListener('click', openPlayerConfig);
        editPlayer2btnElement.addEventListener('click', openPlayerConfig);
        cancelConfigBtnElement.addEventListener('click', closePlayerConfig);
        backDropElement.addEventListener('click', closePlayerConfig);

        formElement.addEventListener('submit', savePlayerConfig);


        startNewGameBtnElement.addEventListener('click', startNewGame);


        gameBoardElement.addEventListener('click', selectGameField);


let player1Score = 0;
let player2Score = 0;
let drawScore = 0;
function updateScoreboard() {
    // let nm=document.getElementById("edit-player-1-btn").textContent;
    // let nm2=document.getElementById("edit-player-2-btn").textContent;
    
    document.getElementById('player1-score').textContent = `Player X : ${player1Score}`;
    document.getElementById('player2-score').textContent = `Player 0 : ${player2Score}`;
    document.getElementById('draw-score').textContent = `Draw: ${drawScore}`;
}
function endGame(winnerId) {
    gameIsOver = true;
    gameOverElement.style.display = 'block';
    if (winnerId > 0) {
        gameOverElement.firstElementChild.firstElementChild.textContent = player[winnerId - 1].name;
        if (winnerId === 1) {
            player1Score++;
        } else {
            player2Score++;
        }
    } else {
        gameOverElement.firstElementChild.textContent = 'It\'s a DRAW!';
        drawScore++;
    }
    updateScoreboard(); 
}

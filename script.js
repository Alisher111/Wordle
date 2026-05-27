var height = 6;
var width = 5;

var row = 0;
var col = 0;

var gameOver = false;

const words = [
    "APPLE",
    "BRAVE",
    "LIGHT",
    "WORLD",
    "SMILE"
];

const word = words[Math.floor(Math.random() * words.length)];

window.onload = function () {
    initialize();
};

function initialize() {

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {

            let tile = document.createElement("span");

            tile.id = r + "-" + c;

            tile.classList.add("tile");

            document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", (e) => {

        if (gameOver) return;

        // LETTERS
        if ("KeyA" <= e.code && e.code <= "KeyZ") {

            if (col < width) {

                let tile = document.getElementById(row + "-" + col);

                tile.innerText = e.code[3];

                tile.classList.remove("pop");
                void tile.offsetWidth;
                tile.classList.add("pop");

                col++;
            }
        }

        // BACKSPACE
        else if (e.code == "Backspace") {

            if (col > 0) {

                col--;

                let tile = document.getElementById(row + "-" + col);

                tile.innerText = "";
            }
        }

        // ENTER
        else if (e.code == "Enter") {

            if (col !== width) return;

            checkWord();

            row++;
            col = 0;

            if (!gameOver && row == height) {

                gameOver = true;

                setTimeout(() => {
                    window.location.href = "fail.html";
                }, 1000);
            }
        }
    });
}

function checkWord() {

    let correct = 0;

    for (let c = 0; c < width; c++) {

        let tile = document.getElementById(row + "-" + c);

        let letter = tile.innerText;

        tile.classList.add("reveal");

        if (letter == word[c]) {

            tile.classList.add("correct");

            correct++;
        }

        else if (word.includes(letter)) {

            tile.classList.add("present");
        }

        else {

            tile.classList.add("absent");
        }
    }

    if (correct === width) {

        gameOver = true;

        setTimeout(() => {
            window.location.href = "success.html";
        }, 1000);
    }
}

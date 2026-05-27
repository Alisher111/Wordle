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
word = words[Math.floor(Math.random() * words.length)];

window.onload = function () {
    initialize();
};

function initialize() {

    // CREATE BOARD
    for (let r = 0; r < height; r++) {

        for (let c = 0; c < width; c++) {

            let tile = document.createElement("span");

            tile.id = r + "-" + c;

            tile.classList.add("tile");

            document
                .getElementById("board")
                .appendChild(tile);
        }
    }

    // KEYBOARD INPUT
    document.addEventListener("keyup", (e) => {

        if (gameOver) return;

        // LETTERS
        if ("KeyA" <= e.code && e.code <= "KeyZ") {

            if (col < width) {

                let currTile = document.getElementById(
                    row + "-" + col
                );

                if (currTile.innerText == "") {

                    currTile.innerText = e.code[3];

                    currTile.classList.add("pop");

                    col++;
                }
            }
        }

        // BACKSPACE
        else if (e.code == "Backspace") {

            if (col > 0) {

                col--;

                let currTile = document.getElementById(
                    row + "-" + col
                );

                currTile.innerText = "";
            }
        }

        // ENTER
        else if (e.code == "Enter") {

            // prevent incomplete words
            if (col != width) return;

            update();

            row++;
            col = 0;

            // LOSE CONDITION
            if (!gameOver && row == height) {

                gameOver = true;

                setTimeout(() => {

                    window.location.href = "fail.html";

                }, 1200);
            }
        }
    });
}

function update() {

    let correct = 0;

    for (let c = 0; c < width; c++) {

        let currTile = document.getElementById(
            row + "-" + c
        );

        let letter = currTile.innerText;

        currTile.classList.add("reveal");

        // CORRECT POSITION
        if (word[c] == letter) {

            currTile.classList.add("correct");

            correct++;
        }

        // LETTER EXISTS
        else if (word.includes(letter)) {

            currTile.classList.add("present");
        }

        // LETTER NOT FOUND
        else {

            currTile.classList.add("absent");
        }
    }

    // WIN CONDITION
    if (correct == width) {

        gameOver = true;

        setTimeout(() => {

            window.location.href = "success.html";

        }, 1200);
    }
}

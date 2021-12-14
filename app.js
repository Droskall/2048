let line1 = document.getElementById('line1');
let line2 = document.getElementById('line2');
let line3 = document.getElementById('line3');
let line4 = document.getElementById('line4');
let result = document.getElementById('result');
let scoreT = document.getElementById('score');

let looseUp = 0;
let looseDown = 0;
let looseLeft = 0;
let looseRight = 0;
let notOK = 0;

let arrayLine1 = [];
let arrayLine2 = [];
let arrayLine3 = [];
let arrayLine4 = [];
let arrayLine = [arrayLine1, arrayLine2, arrayLine3, arrayLine4];

let newGame = document.getElementById('newGame');

for (let x = 0; x < 4; x++){
    arrayLine1.push(line1.getElementsByClassName("case")[x]);
    arrayLine2.push(line2.getElementsByClassName("case")[x]);
    arrayLine3.push(line3.getElementsByClassName("case")[x]);
    arrayLine4.push(line4.getElementsByClassName("case")[x]);
}

/**
 * Function for creat a random number between 0 and 99
 * @returns {number}
 */
function numberRandom100() {
    return Math.trunc(Math.random() * 100);
}

/**
 * Function for creat a random number case between 1 and 16
 * @returns {string}
 */
function caseRandom() {
    return "case" + (Math.trunc((Math.random() * 16) + 1))
}

/**
 * Function for creat a div
 * @param caseAdd
 * @returns {HTMLDivElement}
 */
function creat(caseAdd) {
    let div = document.createElement("div");
    div.className ="number";
    document.getElementById(caseAdd).classList.add("notEmpty");
    document.getElementById(caseAdd).append(div);
    return div;
}

/**
 * Function for choice case and number
 */
function newNumber() {
    let caseAdd = caseRandom();
    if (document.getElementById(caseAdd).className === "case notEmpty") {
        newNumber();
    }
    else {
        let div = creat(caseAdd);
        let number = numberRandom100();
        if (number >= 95) {
            div.innerHTML = "4";
            div.style.backgroundColor = "#e3b573";
        }
        else {
            div.innerHTML = "2";
            div.style.backgroundColor = "#d6c0b2";
        }
    }
}

// Button for begin a game
newGame.addEventListener("click", function () {
resetLoose();

    for(let x = 1; x <= 16; x++) {
        let caseTest = "case" + x
        document.getElementById(caseTest).classList.remove("notEmpty");
        if(document.getElementById(caseTest).getElementsByClassName("number").length > 0) {
            document.getElementById(caseTest).removeChild(document.getElementById(caseTest).lastElementChild);
        }
    }
    for(let x = 0; x < arrayLine.length; x++) {
        document.getElementsByClassName("line")[x].style.display = "flex";
    }
    result.innerHTML = "";
    result.style.display = "none";
    scoreT.innerHTML = "0";

    newNumber();
    newNumber();
    document.body.addEventListener("keypress", move);
});

/**
 * Function for keypress and execution moves
 * @param event
 */
function move(event) {
    switch(event.key) {
        case "z":
            if (checkUp() === 0){
                if (looseUp ===0) {
                    looseUp++;
                    notOK = 0;
                }
            }
            else {
                resetLoose()
                notOK = 0;
            }
            break;

        case "q":
            if(checkLeft() === 0) {
                if(looseLeft === 0) {
                    looseLeft++;
                    notOK = 0;
                }
            }
            else {
                resetLoose()
                notOK = 0;
            }
            break;

        case "s":
            if(checkDown() === 0) {
                if(looseDown === 0) {
                    looseDown++;
                    notOK = 0;
                }
            }
            else {
                resetLoose()
                notOK = 0;
            }
            break;

        case "d":
            if(checkRight() === 0) {
                if(looseRight === 0) {
                    looseRight++;
                    notOK = 0;
                }
            }
            else {
                resetLoose()
                notOK = 0;
            }
            break;
    }

    loose();
}

/**
 * Function for check and fusion cases
 * @param x
 * @param y
 * @param a
 * @param b
 */
function addCase(x, y, a, b) {
    if((arrayLine[x][y].childElementCount > 0) && (arrayLine[a][b].childElementCount > 0)) {
        if(arrayLine[x][y].lastElementChild.innerHTML === arrayLine[a][b].lastElementChild.innerHTML) {
            arrayLine[x][y].lastElementChild.innerHTML =
                ((parseFloat(arrayLine[x][y].lastElementChild.innerHTML)) +
                    (parseFloat(arrayLine[a][b].lastElementChild.innerHTML))).toString();
            arrayLine[a][b].removeChild(arrayLine[a][b].lastElementChild);
            arrayLine[a][b].classList.remove("notEmpty");
            notOK++;
            scoreT.innerHTML =  ((parseFloat(scoreT.innerHTML)) + (parseFloat(arrayLine[x][y].lastElementChild.innerHTML))).toString();
            color(arrayLine[x][y].lastElementChild);
            arrayLine[x][y].lastElementChild.classList.add("ok");
        }
    }
}

/**
 * Function for move cases up and down
 * @param x
 * @param y
 * @param a
 * @param b
 * @param c
 * @param number
 * @param empty
 */
function moveCaseX(x, y, a, b, c, number, empty) {
    if((arrayLine[x][y].childElementCount === 0) && (arrayLine[x + a][y].childElementCount > 0)) {
        if(x === number) {
            empty(x, y, x);
            notOK++;
        }

        else if((arrayLine[x + b][y].childElementCount === 0) && (arrayLine[x + a][y].childElementCount > 0)) {
            if((x + b) === number) {
                let newX = x + b;
                empty(x, y, newX);
                notOK++;
            }

            else if((arrayLine[x + c][y].childElementCount === 0) && (arrayLine[x + a][y].childElementCount > 0)) {
                let newX = x + c;
                empty(x, y, newX);
                notOK++;
            }

            else {
                let newX = x + b;
                empty(x, y, newX);
                notOK++;
            }
        }

        else {
            empty(x, y, x);
            notOK++;
        }
    }
}

/**
 * Function for move cases right and left
 * @param x
 * @param y
 * @param a
 * @param b
 * @param c
 * @param number
 * @param empty
 */
function moveCaseY(x, y, a, b, c, number, empty) {
    if((arrayLine[x][y].childElementCount === 0) && (arrayLine[x][y + a].childElementCount > 0)) {
        if(y === number) {
            empty(x, y, y);
            notOK++;
        }
        else if((arrayLine[x][y + b].childElementCount === 0)&& (arrayLine[x][y + a].childElementCount > 0)) {
            if((y + b) === number) {
                let newY = y + b;
                empty(x, y, newY);
                notOK++;
            }
            else if((arrayLine[x][y + c].childElementCount === 0)&& (arrayLine[x][y + a].childElementCount > 0)) {
                let newY = y + c;
                empty(x, y, newY);
                notOK++;
            }
            else {
                let newY = y + b;
                empty(x, y, newY);
                notOK++;
            }
        }
        else {
            empty(x, y, y);
            notOK++;
        }
    }
}

/**
 * Function for check the different cases for move up
 */
function checkUp() {
    for(let x = 0; x < 3; x++) {
        for(let y = 0; y < 4; y++) {
            moveCaseX(x, y, 1, -1, -2, 0, emptyUp);
        }
    }

    for(let x = 0; x < 3; x++) {
        for(let y = 0; y < 4; y++) {
            addCase(x, y, (x + 1), y);
        }
    }

    for(let x = 0; x < 3; x++) {
        for(let y = 0; y < 4; y++) {
            moveCaseX(x, y, 1, -1, -2, 0, emptyUp);
        }
    }

    if(notOK > 0) {
        newNumber();
    }

    else if(notOK === 0){
        return 0
    }
}

/**
 * Function for check the different cases for move down
 */
function checkDown() {
    for(let x = 3; x > 0; x--) {
        for(let y = 0; y < 4; y++) {
            moveCaseX(x, y, -1, +1, +2, 3,emptyDown);
        }
    }

    for(let x = 3; x > 0; x--) {
        for(let y = 0; y < 4; y++) {
            addCase(x, y, (x - 1), y)
        }
    }

    for(let x = 3; x > 0; x--) {
        for(let y = 0; y < 4; y++) {
            moveCaseX(x, y, -1, +1, +2, 3, emptyDown);
        }
    }

    if(notOK > 0) {
        newNumber();
    }

    else if(notOK === 0){
        return 0
    }
}

/**
 * Function for check the different cases for move left
 */
function checkLeft() {
    for(let x = 0; x < 4; x++) {
        for(let y = 0; y < 3; y++) {
            moveCaseY(x, y, 1, -1, -2, 0, emptyLeft);
        }
    }

    for(let x = 0; x < 4; x++) {
        for(let y = 0; y < 3; y++) {
            addCase(x, y, x, (y + 1));
        }
    }

    for(let x = 0; x < 4; x++) {
        for(let y = 0; y < 3; y++) {
            moveCaseY(x, y, 1, -1, -2, 0, emptyLeft);
        }
    }

    if(notOK > 0) {
        newNumber();
    }

    else if(notOK === 0){
        return 0
    }
}

/**
 * Function for check the different cases for move right
 */
function checkRight() {
    for(let x = 0; x < 4; x++) {
        for(let y = 3; y > 0; y--) {
            moveCaseY(x, y, -1, +1, +2, 3, emptyRight);
        }
    }

    for(let x = 0; x < 4; x++) {
        for(let y = 3; y > 0; y--) {
            addCase(x, y, x, (y - 1));
        }
    }

    for(let x = 0; x < 4; x++) {
        for(let y = 3; y > 0; y--) {
            moveCaseY(x, y, -1, +1, +2, 3, emptyRight);
        }
    }

    if(notOK > 0) {
        newNumber();
    }

    else if(notOK === 0){
        return 0
    }
}

/**
 * Function for creat and delete the transfers cases for move up
 * @param x
 * @param y
 * @param newX
 */
function emptyUp(x, y, newX) {
    let div = creat(arrayLine[newX][y].id);
    div.innerHTML = arrayLine[x + 1][y].lastElementChild.innerHTML;
    arrayLine[x + 1][y].removeChild(arrayLine[x + 1][y].lastElementChild);
    arrayLine[x + 1][y].classList.remove("notEmpty");
    color(div);
}

/**
 * Function for creat and delete the transfers cases for move down
 * @param x
 * @param y
 * @param newX
 */
function emptyDown(x, y, newX) {
    let div = creat(arrayLine[newX][y].id);
    div.innerHTML = arrayLine[x - 1][y].lastElementChild.innerHTML;
    arrayLine[x - 1][y].removeChild(arrayLine[x - 1][y].lastElementChild);
    arrayLine[x - 1][y].classList.remove("notEmpty");
    color(div);
}

/**
 * Function for creat and delete the transfers cases for move down
 * @param x
 * @param y
 * @param newY
 */
function emptyLeft(x, y, newY) {
    let div = creat(arrayLine[x][newY].id);
    div.innerHTML = arrayLine[x][y + 1].lastElementChild.innerHTML;
    arrayLine[x][y + 1].removeChild(arrayLine[x][y + 1].lastElementChild);
    arrayLine[x][y + 1].classList.remove("notEmpty");
    color(div);
}

/**
 * Function for creat and delete the transfers cases for move right
 * @param x
 * @param y
 * @param newY
 */
function emptyRight(x, y, newY) {
    let div = creat(arrayLine[x][newY].id);
    div.innerHTML = arrayLine[x][y - 1].lastElementChild.innerHTML;
    arrayLine[x][y - 1].removeChild(arrayLine[x][y - 1].lastElementChild);
    arrayLine[x][y - 1].classList.remove("notEmpty");
    color(div);
}

/**
 * Function for choice the color compared the number
 * @param div
 * @returns {string}
 */
function color(div) {
    switch (div.innerHTML) {
        case "2":
            div.style.backgroundColor = "#d6c0b2";
            break;

        case "4":
            div.style.backgroundColor = "#e3b573";
            break;

        case "8":
            div.style.backgroundColor = "#d2971a";
            break;

        case "16":
            div.style.backgroundColor = "#e3d22d";
            break;

        case "32":
            div.style.backgroundColor = "#f5715f";
            break;

        case "64":
            div.style.backgroundColor = "#ffc8a5";
            div.style.color = "#831414";
            break;

        case "128":
            div.style.backgroundColor = "#ffc663";
            div.style.color = "#831414";
            break;

        case "256":
            div.style.backgroundColor = "#f1a708";
            div.style.color = "#831414";
            break;

        case "512":
            div.style.backgroundColor = "#f8e50f";
            div.style.color = "#831414";
            break;

        case "1024":
            div.style.backgroundColor = "#ff5643";
            div.style.color = "#831414";
            break;

        case "2048":
            div.style.backgroundColor = "#ff9443";
            div.style.color = "#833b14";
            break;
    }
}

/**
 * Function for check endgame condition
 */
function loose() {
    let win = 0;

    if((looseUp === 1) && (looseDown === 1) && (looseLeft === 1) && (looseRight === 1)) {
        for(let x = 0; x < 4; x++) {
            for(let y = 0; y < 4; y++) {
                if(parseFloat(arrayLine[x][y].lastElementChild.innerHTML) >= 2048) {
                    win++
                    document.body.removeEventListener("keypress", move);
                    setTimeout( () => {
                        for(let x = 0; x < arrayLine.length; x++) {
                            document.getElementsByClassName("line")[x].style.display = "none";
                        }

                        result.innerHTML = "Bravo, vous avez réussi!!!";
                        result.style.display = "flex";
                    }, 2000);
                }
            }
        }

        if(win === 0) {
            setTimeout( () => {
                for(let x = 0; x < arrayLine.length; x++) {
                    document.getElementsByClassName("line")[x].style.display = "none";
                }

                result.innerHTML = "Dommage, vous avez perdu!!!";
                result.style.display = "flex";
            }, 2000);
        }
    }
}


/**
 * Function for reset looses points
 */
function resetLoose() {
    looseUp = 0;
    looseDown = 0;
    looseRight = 0;
    looseLeft = 0;
}
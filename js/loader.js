function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

function createKey(char) {
    let divKey = document.createElement('div');
    divKey.classList.add('key');
    divKey.dataset.key = char;

    if (char == ' ')
        divKey.classList.add('spaceKey');
    else if (char == "&larr;")
        divKey.classList.add('enterKey');

    let charKey = document.createElement('span');
    charKey.classList.add("charKey");

    charKey.innerHTML = char;

    divKey.append(charKey);
    
    return divKey;
}

function createKeyBoard() {
    let divKeyBoard = document.querySelector('div#loadContainer div#keyBoard');

    // recup char
    let tabLetters = divKeyBoard.firstElementChild.textContent.split('-');
    tabLetters.forEach( (el, index) => {
        tabLetters[index] = el.split('');
    });

    divKeyBoard.innerHTML = '';

    // html key board write
    let divWriteKey = document.createElement('div');
    divWriteKey.setAttribute("id", "writeKeys");
    tabLetters.forEach( (row, index) => {
        let divRow = document.createElement('div');
        divRow.classList.add('rowKeyCharBoard');

        row.forEach( char => divRow.append(createKey(char)) );

        divWriteKey.append(divRow);
    } );

    // html key enter
    let divReturnKey = document.createElement('div');
    divReturnKey.setAttribute('id', "returnKey");
    divReturnKey.append(createKey("&larr;"));

    divKeyBoard.append(divWriteKey, divReturnKey);
}


function animationKeyBoard() {
    if (!arguments[0].length || arguments[0].length != arguments[1].length)
        return;

    const size = arguments[0].length;
    for (let index = 0; index < size; index++) {
        const divKey = document.querySelector(`.key[data-key='${arguments[0][index]}']`);
        window.setTimeout( () => divKey.classList.add("clicked"), arguments[1][index]);
        window.setTimeout( () => divKey.classList.remove("clicked"), arguments[1][index] + 200);
    }
}

function loader() {
    createKeyBoard();

    // appear keyboard
    document.querySelector("#keyBoard").classList.replace( "hide", "visible");

    // clicked at key
    let string = "maxime leclere";
    string = string.split('');
    string.push('&larr;');
    const lengthS = string.length;
    const timeAnim = 1000;
    const startAnim = 200;
    let currentTime = startAnim;
    let averageTime = timeAnim / lengthS;
    averageTime *= .5;
    let anim = Array.prototype.constructor(lengthS);
    anim = anim.fill(0);
    for (let index = 0, min = 0; index < lengthS; index++) {
        let randomVal = getRandomIntInclusive( min, min + averageTime );
        anim[index] += randomVal + startAnim;
        min = randomVal++ * 1.2;
    }

    window.setTimeout( animationKeyBoard, startAnim, string, anim);

    let endAnim = anim[lengthS-1];

    // vanish keybord
    currentTime = endAnim + 1000;
    window.setTimeout( () => document.querySelector("#keyBoard").classList.replace( "visible", "hide"), currentTime);

    // vanish load
    currentTime += 300;
    window.setTimeout( () => document.querySelector("#loadContainer").classList.add( "hide"), currentTime);

    // supp load (display none)
    currentTime += 300;
    window.setTimeout( () => {
        document.querySelector("#loadContainer").style.display = 'none';
        document.querySelector("body").style.overflow = "initial";
    }, currentTime);
}

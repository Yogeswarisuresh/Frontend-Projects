const cardsArray = [
    {
        name:'Pizza',
        icon:'<i class="fas fa-regular fa-pizza-slice"></i>'
    },
    {
        name:'Burger',
        icon:'<i class="fas fa-regular fa-burger"></i>'
    },
    {
        name:'Fish',
        icon:'<i class="fas fa-regular fa-fish-fins"></i>'
    },
    {
        name:'Egg',
        icon:'<i class="fas fa-regular fa-egg"></i>'
    },
    {
        name:'Cookies',
        icon:'<i class="fas fa-regular fa-cookie"></i>'
    },
    {
        name:'Hotdog',
        icon:'<i class="fas fa-regular fa-hotdog"></i>'
    },
    {
        name:'Pizza',
        icon:'<i class="fas fa-regular fa-pizza-slice"></i>'
    },
    {
        name:'Burger',
        icon:'<i class="fas fa-regular fa-burger"></i>'
    },
    {
        name:'Fish',
        icon:'<i class="fas fa-regular fa-fish-fins"></i>'
    },
    {
        name:'Egg',
        icon:'<i class="fas fa-regular fa-egg"></i>'
    },
    {
        name:'Cookies',
        icon:'<i class="fas fa-regular fa-cookie"></i>'
    },
    {
        name:'Hotdog',
        icon:'<i class="fas fa-regular fa-hotdog"></i>'
    }
];

let flippedCards =[];
let matchedCount = 0;
let moves = 25;
let totalmoves = document.getElementById('moves');
shuffleCards();
const gameboard = document.getElementById('gameboard')
displayCards();
function shuffleCards(){
    for(let i=cardsArray.length-1;i>=0;i--){
        const randIndex = Math.floor(Math.random()*(i+1));
        [cardsArray[i],cardsArray[randIndex]]=[cardsArray[randIndex],cardsArray[i]];
    }
}
function displayCards(){
    cardsArray.forEach((element,ind,arr) => {
        const card = document.createElement('div');
        card.setAttribute('id',ind);
        card.classList.add('cardback');
        card.classList.add('active');
        gameboard.append(card);
        card.addEventListener('click',flipCard);
    });
}

function flipCard(){
    if(flippedCards.length<2 && this.classList.contains('active')){
        totalmoves.innerHTML = moves--;
        lostGame();
        let cardId = this.getAttribute('id');
        flippedCards.push(this);
        this.classList.remove('cardback');
        this.innerHTML = cardsArray[cardId].icon;
        if(flippedCards.length == 2){
            setTimeout(checkMatch,1000);
        }
    }
}

function checkMatch(){
    const card1Id = flippedCards[0].getAttribute('id');
    const card2Id = flippedCards[1].getAttribute('id');
    if(cardsArray[card1Id].name==cardsArray[card2Id].name){
        flippedCards[0].style.border = 'none';
        flippedCards[0].style.backgroundColor = 'rgb(246, 232, 176)';
        flippedCards[0].innerHTML = '';
        flippedCards[0].classList.remove('active');
        flippedCards[1].style.border = 'none';
        flippedCards[1].innerHTML = '';
        flippedCards[1].style.backgroundColor = 'rgb(246, 232, 176)';
        flippedCards[1].classList.remove('active');
        matchedCount++;
        checkGameOver();
    }
    else{
        flippedCards[0].innerHTML = '';  
        flippedCards[0].classList.add('cardback');
        flippedCards[1].innerHTML = '';  
        flippedCards[1].classList.add('cardback');
    }
    flippedCards = [];
}
function checkGameOver(){
    if(matchedCount == cardsArray.length/2){
        while(gameboard.firstChild){
            gameboard.removeChild(gameboard.firstChild)
        }
        gameboard.innerHTML = '*You Won*';
        gameboard.classList.remove('game');
        gameboard.classList.add('won');
    }
}

function lostGame(){
    if(moves == -1){
        while(gameboard.firstChild){
            gameboard.removeChild(gameboard.firstChild)
        }
        gameboard.innerHTML = '*You Lost*';
        gameboard.classList.remove('game');
        gameboard.classList.add('won');
    }
}
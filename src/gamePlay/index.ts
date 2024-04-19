

let selectedCards: HTMLElement[] = [];
let gamePaused: boolean = false;
let turnOfPlay: number = 15;
let point: number = 0

function handleCardSelected(card: HTMLElement) {
    console.log(card);
    
    if(card && !card.dataset.clicked) {
        if(selectedCards.length < 2 && !card.dataset.clicked ) {
            selectedCards.push(card)
        }
        console.log("Card data-id: ", card.dataset.id );       
        const visible = card.querySelector('.card_pokemon_after')
        visible?.classList.add('visible')
        // card.setAttribute('disabled', 'true');
        card.dataset.clicked = "true";
    }


    if(selectedCards.length === 2 ) {
        const [card1, card2] = selectedCards

        // 2 card giống nhau
        if(card1.dataset.id === card2.dataset.id) {
            point += 100
            card1.classList.add('success')
            card2.classList.add('success')


            
            setTimeout(() => {
                alert("Chúc mừng bạn đã nhận được 100 điểm, điểm số hiện tại của bạn là: " + point)
            }, 1000)
            setTimeout(()=> {
                card1.remove()
                card2.remove()
            }, 2000)

            const lengthCard = document.querySelectorAll('.card_pokemon')
            
            if(lengthCard.length === 2 ) {
                setTimeout(() => {
                    alert("Xin chúc mừng bạn đã hoàn thành trò chơi !!!");
                }, 2000)
                
            }
            
        }
        // 2 card khác nhau
        else {
            turnOfPlay--;
            setTimeout(() => {
                alert("Chúc bạn may mắn lần sau, còn " + turnOfPlay + " lượt chọn sai " )
            },500);
            
            card1.classList.add('failed')
            card2.classList.add('failed')

            console.log(" 2 thẻ đã khác nhau");
            const removeVisibleCard1 = card1.querySelector('.card_pokemon_after')
            const removeVisibleCard2 = card2.querySelector('.card_pokemon_after')

            delete card1.dataset.clicked 
            delete card2.dataset.clicked 
            
            setTimeout(() => {
                card1.classList.remove('failed')
                card2.classList.remove('failed')
                removeVisibleCard1?.classList.remove("visible")
                removeVisibleCard2?.classList.remove("visible")
            },1000)
        }

        if(turnOfPlay === 0) {
            setTimeout(() => {
                alert("Bạn đã thua, game sẽ được reset sau vài giây !!!" )
            },1000);

            location.href = window.location.href
        }
        selectedCards = [];
    }
}


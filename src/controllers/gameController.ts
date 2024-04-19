import { Request, Response } from 'express';
import { GameModels } from '../models/gameModels';
// import { LocalStorage } from 'node-localstorage';
// import { LocalStorage } from 'localstorage';

 class GameController {
    private selectedCards : GameModels[]= []
    private gamePaused: boolean = false;
    // private localStorage: any;
    constructor() {
    }

    public async handleCardSelected(req:Request, res: Response) {
        
    }

    public handleEnterName(req: Request, res: Response) {
        const playerName = req.body.playerName;

        if(playerName && /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(playerName)) {
            res.redirect(`/gameplay/?playerName=${encodeURIComponent(playerName)}`);
        } else{
            res.status(400).send('Invalid player name')
        }
    }

    public async main(req: Request, res: Response) {
        try {
            const randomIndex: number = Math.floor(Math.random() * 100) + 1;
            const listPokemon: GameModels[] = await getManyPokemon(randomIndex);
            const doubleListPokemon: GameModels[] = [...listPokemon, ...listPokemon];
            const listShuffled = shuffle(doubleListPokemon);
            const playerName = req.query.playerName as string
            res.render('play', {listShuffled, playerName})
        }catch(error: any) {
            console.log("Error send data to Play:  ", error.message);
            res.status(500).send('Internal Server Error');
        }
    }

    
}


function compare(card1: GameModels, card2: GameModels) {
    return card1 === card2
}

function shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
}


async function getManyPokemon(ids: number): Promise<GameModels[]> {
    let arrInfoPoke: any[] = [];
    for (let index = ids; index <= ids + 8; index++) {
        arrInfoPoke.push(await GameModels.getPokemonsById(index));
    }
    return arrInfoPoke;
}

export default new GameController()
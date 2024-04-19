import axios from 'axios';
const API_game = 'https://pokeapi.co/api/v2/pokemon/'

interface PokemonApiResponse {
id: number;
name: string;
sprites: {
    other: {
        dream_world: {
            front_default: string;
        };
    };
};
types: {
    type: {
        name: string;
    };
}[];
}
export class GameModels {
    id: number;
    name: string;
    image: string;
    type: string;

constructor(id: number, name: string, image: string, type: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.type = type
}
    public static async getPokemonsById(index: number): Promise < GameModels | undefined > {
    try  {
        const response = await axios.get<PokemonApiResponse>(`${API_game}/${index}`);
        const pokemonDatas = response.data;

        if (pokemonDatas && pokemonDatas.sprites.other.dream_world.front_default && pokemonDatas.types[0]?.type?.name) {
            let pokemonData = new GameModels(
              pokemonDatas.id,
              pokemonDatas.name,
              pokemonDatas.sprites.other.dream_world.front_default,
              pokemonDatas.types[0].type.name
            );
            return pokemonData;
        }else{
            return undefined
        }
    }catch(error: any) {
        console.log("Error getting data from the Pokemon API: ", error.message);
        return undefined;
    }

}
}
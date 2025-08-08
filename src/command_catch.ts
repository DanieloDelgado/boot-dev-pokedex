import type { State } from "./state.type";

export async function commandCatch(state: State, ...args: string[]): Promise <void> {
    const name = args[0]
    if (!name){
        throw new Error("Missing name of the pokemon")
    }

    console.log(`Throwing a Pokeball at ${name}...`)
    const pokemon = await state.pokeapi.fetchPokemon(name);
    if (Math.random() * 500 > pokemon.base_experience){
        console.log(`${name} was caught!`)
        state.pokedex[name] = pokemon;
    } else {
        console.log(`${name} escaped!`);
    }
}

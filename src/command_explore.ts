import type { State } from "./state.type";

export async function commandExplore(state: State, ...args: string[]): Promise <void> {
    const name = args[0]
    if (!name){
        throw new Error("Missing name of the location")
    }
    console.log(`Exploring ${name}...`)
    const response = await state.pokeapi.fetchLocation(name);
    console.log("Found Pokemon:")
    for (const encounter of response.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`);
    }
}

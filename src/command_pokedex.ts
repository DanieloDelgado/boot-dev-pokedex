import type { State } from "./state.type";

export async function commandPokedex(state: State): Promise <void> {
    console.log("Your Pokedex:");
    for (const name in state.pokedex){
        console.log(` - ${name}`);
    }
}

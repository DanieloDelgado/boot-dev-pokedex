import type { State } from "./state.type";

export async function commandInspect(state: State, ...args: string[]): Promise <void> {
    const name = args[0]
    if (!name){
        throw new Error("Missing name of the pokemon")
    }

    if (name in state.pokedex){
        const pokemon = state.pokedex[name];
        console.log(`Name: ${name}`),
        console.log(`Height: ${pokemon.height}`)
        console.log(`Weight: ${pokemon.weight}`)
        console.log("Stats:")
        for (const s of pokemon.stats){
            console.log(`  -${s.stat.name}: ${s.base_stat}`)
        }
        console.log("Types:")
        for (const t of pokemon.types){
            console.log(`  - ${t.type.name}`)
        }
    } else {
        console.log("you have not caught that pokemon");
    }
}

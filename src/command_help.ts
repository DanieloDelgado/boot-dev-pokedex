import type { State } from "./state.type";

export async function commandHelp(state: State): Promise <void> {
    console.log("Welcome to the Pokedex!\nUsage:\n")
    for (const cmd in state.commands) {
        console.log(`${cmd}: ${state.commands[cmd].description}`);
    }
}

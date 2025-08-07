import type { State } from "./state.type";

export function commandHelp(state: State) {
    console.log("Welcome to the Pokedex!\nUsage:\n")
    for (const cmd in state.commands) {
        console.log(`${cmd}: ${state.commands[cmd].description}`);
    }
}

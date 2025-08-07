
import { initState } from "./state.js";

export function cleanInput(input: string): string[]{
    return input.toLowerCase().trim().split(/\s+/)
}

export function startREPL() {
    const state = initState();

    state.repl.prompt()
    state.repl.on('line', (line) => {
        const input = cleanInput(line);
        if (input.length !== 0 && input[0]){
            const command = input[0];
            if (command in state.commands){
                state.commands[command].callback(state)
            } else {
                console.log("Unknown command")
            }
        }
        state.repl.prompt();
    }); 
}

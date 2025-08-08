
import { initState } from "./state.js";

export function cleanInput(input: string): string[]{
    return input.toLowerCase().trim().split(/\s+/)
}

export function startREPL() {
    const state = initState();

    state.repl.prompt()
    state.repl.on('line', async (line) => {
        const input = cleanInput(line);
        if (input.length !== 0 && input[0]){
            const command = input[0];
            if (command in state.commands){
                try {
                    await state.commands[command].callback(state, ...input.slice(1));
                } catch (error) {
                    if (error instanceof Error){
                        console.log(error.message)
                    } else {
                        console.log("Unknown error type")
                    }
                }
            } else {
                console.log("Unknown command")
            }
        }
        state.repl.prompt();
    }); 
}

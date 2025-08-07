
import { createInterface } from "readline";

export function cleanInput(input: string): string[]{
    return input.toLowerCase().trim().split(/\s+/)
}

export function startREPL() {
    const repl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    })
    repl.prompt()
    repl.on('line', (line) => {
        const input = cleanInput(line);
        if (input.length !== 0 && input[0]){
            console.log(`Your command was: ${input[0]}`);
        }
        repl.prompt();
    }); 
}

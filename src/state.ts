import { createInterface } from "readline";
import type { CLICommand, State } from "./state.type";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";

function getCommands(): Record<string, CLICommand> {
  return {
    help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
    },
    exit: {
        name: "exit",
        description: "Exits the pokedex",
        callback: commandExit,
    },
  };
}

export function initState(): State {
    const commands = getCommands();
    const repl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    })

    return {
        commands,
        repl,
    }
}

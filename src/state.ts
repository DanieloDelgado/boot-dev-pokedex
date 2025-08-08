import { createInterface } from "readline";
import type { CLICommand, State } from "./state.type";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMapBack, commandMapForward } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

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
    map: {
        name: "map",
        description: "Displays the names of the next 20 location areas in the Pokemon world",
        callback: commandMapForward,
    },
    mapb: {
        name: "mapb",
        description: "Displays the names of the previous 20 location areas in the Pokemon world",
        callback: commandMapBack,
    },
    explore: {
        name: "explore",
        description: "Displays the names of pokemons in a location",
        callback: commandExplore,
    },
    catch: {
        name: "catch",
        description: "Tries to catch a pokemon",
        callback: commandCatch,
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
    const pokeapi = new PokeAPI();
    return {
        commands,
        repl,
        pokeapi,
        pokedex: {},
    }
}

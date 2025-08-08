import type { Interface } from "readline";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export type State = {
  repl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  prevLocationsURL?: string;
  nextLocationsURL?: string;
  pokedex: Record<string, Pokemon>;
}

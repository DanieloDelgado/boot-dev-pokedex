import type { Interface } from "readline";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

export type State = {
  repl: Interface;
  commands: Record<string, CLICommand>;
}

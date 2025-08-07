import type { State } from "./state.type";

export async function commandMapForward(state: State): Promise <void> {
    const response = await state.pokeapi.fetchLocations(state.nextLocationsURL);
    for (const location of response.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;
}

export async function commandMapBack(state: State): Promise <void> {
    const response = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    for (const location of response.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;
}

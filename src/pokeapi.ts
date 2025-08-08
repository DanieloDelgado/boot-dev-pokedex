import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache = new Cache(10000);
    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`
        const cacheVal = this.cache.get(url)
        if (cacheVal){
            return cacheVal;
        }
        const response = await fetch(url);

        if (!response.ok){
            throw new Error("Failed to fetch locations");
        }
        const data: ShallowLocations = await response.json();
        this.cache.add(url, data)
        return data;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`
        const cacheVal = this.cache.get(url);
        if (cacheVal){
            return cacheVal;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${locationName}`);
        }
        const data: Location = await response.json();
        this.cache.add(url, data);
        return data;
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`
        const cacheVal = this.cache.get(url);
        if (cacheVal){
            return cacheVal;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch pokemon information: ${pokemonName}`);
        }

        const data: Pokemon = await response.json();

        this.cache.add(url, data);
        return data;
    }
}

export type ShallowLocations = {
    next: string;
    previous: string;
    results: Array<{
        name: string;
        url:  string;
    }>;
};

export type Location = {
    pokemon_encounters: Array<{
        pokemon: {
            name: string;
        }
    }>;
};

export type Pokemon = {
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    stats: Array<{
        base_stat: number,
        stat: {
            name: string
        }
    }>;
    types: Array<{
        type: {
            name: string;
        }
    }>;
}
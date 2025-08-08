import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private locationCache = new Cache(10000);
    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`
        const response = await fetch(url);
        const cacheVal = this.locationCache.get(url)
        if (cacheVal){
            return cacheVal;
        }

        if (!response.ok){
            throw new Error("Failed to fetch locations");
        }
        const data: ShallowLocations = await response.json();
        this.locationCache.add(url, data)
        return data;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${locationName}`);
        }
        const data = await response.json();
        return data as Location;    
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
  // add properties here
};

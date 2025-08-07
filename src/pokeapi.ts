export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`
    const response = await fetch(url);
    if (!response.ok){
        throw new Error("Failed to fetch locations");
    }
    const data = await response.json();
    return data as ShallowLocations;
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

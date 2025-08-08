type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval =  interval;
        this.#startReapLoop();
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

    add(key: string, val: any) {
        this.#cache.set(key, {createdAt: Date.now(), val});
    }

    get(key: string) {
        const entry = this.#cache.get(key)
        return entry?.val
    }

    #reap() {
        const limit = Date.now() - this.#interval
        const toRemove = []
        for (const [key, value] of this.#cache){
            if (value.createdAt <= limit){
                toRemove.push(key);
            }
        }
        for (const key of toRemove){
            this.#cache.delete(key);
        }
    }
}

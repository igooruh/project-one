import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
    #database = {};

    constructor() {
        fs.readFile(databasePath, 'utf8')
          .then(data => {
            this.#database = JSON.parse(data);
          })
          .catch(() => {
            this.#persist();
          });
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(nameTable) {
        const data = this.#database[nameTable] ?? [];

        return data;
    }

    insert(nameTable, data) {
        if(Array.isArray(this.#database[nameTable])) {
            this.#database[nameTable].push(data);
        } else {
            this.#database[nameTable] = [data];
        }

        this.#persist();

        return data;
    }
}
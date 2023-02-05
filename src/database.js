export class Database {
    #database = {};
    _igor = {}

    select(nameTable) {
        const data = this.#database[nameTable] ?? [];

        return data;
    }

    insert(nameTable, data) {
        if(Array.isArray(this.#database[nameTable])) {
            this.#database[nameTable].push(data);
        } else {
            this.#database[nameTable] = data;
        }

        return data;
    }
}
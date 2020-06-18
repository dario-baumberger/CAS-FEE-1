export class NotesService {
    constructor() {
    }

    async getNote(id){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const url = "http://localhost:3000/api/notes/" + id;
            const response = await fetch(url, options);
            const data = await response.json();
            return await data;
        } catch (err) {
            console.error(err);
        }
    }

    async getNotes(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const url = "http://localhost:3000/api/notes/";
            const response = await fetch(url, options);
            const data = await response.json();
            return await data;
        } catch (err) {
            console.error(err);
        }
    }

    async updateState(id, state){
        console.log(id, state)
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                state: state
            })
        };
        console.log(options)
        try {
            const url = "http://localhost:3000/api/notes/" + id;
            const response = await fetch(url, options);
            console.log(await response)
            const data = await response.json();
            return await data;
        } catch (err) {
            console.error(err);
        }
    }

}
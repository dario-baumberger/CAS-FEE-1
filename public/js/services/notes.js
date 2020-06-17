export class NotesService {
    constructor() {
    }

    async getNotes(id){
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

}
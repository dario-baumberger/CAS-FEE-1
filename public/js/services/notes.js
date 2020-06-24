export class NotesService {
  constructor() {}

  async getNote(id) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

  async getNotes() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const url = "http://localhost:3000/api/notes/";
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      return await data;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteNote(id) {
    console.log("delete");
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    };
    try {
      const url = "http://localhost:3000/api/notes/" + id;
      const response = await fetch(url, options);
      console.log(await response);
      const data = await response.json();
      return await data;
    } catch (err) {
      console.error(err);
    }
  }

  async addNote(data) {
    console.log(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const url = "http://localhost:3000/api/notes/";
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(await data);
      return await data;
    } catch (err) {
      console.error(err);
    }
  }

  async updateNote(data) {
    console.log(data);

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const url = "http://localhost:3000/api/notes/" + data._id;
      const response = await fetch(url, options);
      console.log(await response);
      const ret = await response.json();
      return await ret;
    } catch (err) {
      console.error(err);
    }
  }

  async updateState(id, state) {
    console.log("here");
    console.log(id, state);
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: state,
      }),
    };
    try {
      const url = "http://localhost:3000/api/notes/" + id;
      const response = await fetch(url, options);
      console.log(await response);
      const data = await response.json();
      return await data;
    } catch (err) {
      console.error(err);
    }
  }
}

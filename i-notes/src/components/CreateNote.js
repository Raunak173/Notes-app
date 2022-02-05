import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Button } from "@material-ui/core";

export default function CreateNote() {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
  });
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date } = note;
        const newNote = {
          title,
          content,
          date,
        };

        await axios.post("/api/notes", newNote, {
          headers: { Authorization: token },
        });

        return navigate("/n");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };
  return (
    <div>
      <Header />
      <p className="text-center text-4xl font-bold mt-10">Create Note ...</p>
      <div className="flex justify-center items-center mt-10">
        <form onSubmit={createNote} autoComplete="off">
          <div>
            <label htmlFor="title">Title</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={note.title}
              id="title"
              name="title"
              required
              onChange={onChangeInput}
            />
          </div>

          <div>
            <label htmlFor="content">Content</label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={note.content}
              id="content"
              name="content"
              required
              rows="10"
              onChange={onChangeInput}
            />
          </div>

          <label htmlFor="date">Date: {note.date} </label>
          <div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="date"
              name="date"
              onChange={onChangeInput}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: 10 }}
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

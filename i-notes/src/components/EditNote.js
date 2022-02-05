import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { Button } from "@material-ui/core";

export default function EditNote() {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (id) {
        const res = await axios.get(`/api/notes/${id}`, {
          headers: { Authorization: token },
        });
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id,
        });
      }
    };
    getNote();
    console.log(note);
  }, [id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date, id } = note;
        const newNote = {
          title,
          content,
          date,
        };

        await axios.put(`/api/notes/${id}`, newNote, {
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
      <p className="text-center text-4xl font-bold mt-10">Edit Note ...</p>
      <div className="flex justify-center items-center mt-10">
        <form onSubmit={editNote} autoComplete="off">
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";
import Header from "./Header";

export default function Notes({ setIsLogin }) {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = "/";
    }
  };
  return (
    <div>
      <Header setIsLogin={setIsLogin} />
      <p className="text-center text-4xl font-bold mt-10">Notes Page ...</p>
      <NoteCard notes={notes} deleteNote={deleteNote} />
    </div>
  );
}

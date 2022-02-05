import React from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default function NoteCard({ notes, deleteNote }) {
  return (
    <div className="mt-8 p-10 flex flex-wrap">
      {notes.map((note) => (
        <Card
          key={note._id}
          style={{
            width: 300,
            height: 250,
            margin: 10,
            overflow: "auto",
            padding: 5,
          }}
        >
          <CardContent>
            <h1 className="text-center font-bold">{note.title}</h1>
            <p className="mt-2">{note.content}</p>
            <p
              className="mt-4 text-xs italic "
              style={{ textTransform: "uppercase" }}
            >
              {note.name}
            </p>
            <p className="mt-2 text-xs italic ">{format(note.date)}</p>
          </CardContent>
          <div className="w-3/5 m-auto flex justify-between mt-4">
            <Button variant="contained" color="primary">
              <Link to={`/edit/${note._id}`}>Edit</Link>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

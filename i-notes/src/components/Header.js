import React from "react";
import { Link } from "react-router-dom";

export default function Header({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  return (
    <div className="h-16 w-3/6 m-auto bg-black mt-4 flex justify-around items-center">
      <p className="text-white">
        <Link to="/create">Create Note</Link>
      </p>
      <p className="text-white" onClick={logoutSubmit}>
        <Link to="/">Log Out</Link>
      </p>
    </div>
  );
}

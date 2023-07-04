import React from "react";
import PasteCard from "./PasteCard";
import { Link } from "react-router-dom";

const Pastes = () => {
  return (
    <div className="row g-2">
      <PasteCard />
    </div>
  );
};

export default Pastes;

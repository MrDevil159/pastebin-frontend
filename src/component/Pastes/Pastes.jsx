import React, { useContext, useEffect, useState } from "react";
import PasteCard from "./PasteCard";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";

const Pastes = () => {
  const { all } = useContext(AuthContext);
  const headers = {
    Authorization: `Bearer ${all.token[0]}`,
  };

  const [pastes, setPastes] = useState([]);

  useEffect(() => {
    fetchPastes();
  }, []);

  const fetchPastes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/paste/pastes`,
        { headers }
      );
      setPastes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row g-2">
      {pastes.map((paste) => (
        <PasteCard key={paste._id} id={paste._id} title={paste.title} />
      ))}
    </div>
  );
};

export default Pastes;

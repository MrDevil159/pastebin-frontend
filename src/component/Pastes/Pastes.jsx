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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [del, setDel] = useState();

  useEffect(() => {
    fetchPastes(currentPage);
  }, [currentPage, del]);

  const fetchPastes = async (page) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/paste/pastes`,
        {
          headers,
          params: {
            page,
            pageSize: 5,
          },
        }
      );
      setPastes(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {pastes.length > 0 ? (
        <div className="row g-2">
          {pastes.map((paste) => (
            <PasteCard
              key={paste._id}
              id={paste._id}
              title={paste.title}
              br={paste.burnAfterRead}
              passworded={paste.passworded}
              setDel={setDel}
            />
          ))}
        </div>
      ) : (
        <h1 className="display-1 text-center">No Paste yet</h1>
      )}

      <div className="d-flex justify-content-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`btn me-1 mt-1 btn-secondary btn-sm ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pastes;

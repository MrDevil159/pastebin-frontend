import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LockIcon from "@mui/icons-material/Lock";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const PasteCard = ({ title, id, br, passworded, setDel }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { all } = useContext(AuthContext);

  const headers = {
    Authorization: `Bearer ${all.token[0]}`,
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/paste/readPaste/${id}`,
        { headers }
      );
      setDel("");
      toast.success("Deleting!");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="col-sm-12">
      <div className="card">
        <div className="card-body d-flex align-items-center justify-content-between">
          <span
            className="fw-medium text-truncate"
            style={{ maxWidth: "250px" }}
          >
            {br ? (
              <button
                className="bg-danger border-0 rounded me-1"
                style={{ padding: "2px" }}
              >
                <WhatshotIcon style={{ color: "white" }} />
              </button>
            ) : (
              ""
            )}
            {passworded ? (
              <button
                className="bg-dark border-0 rounded me-1"
                style={{ padding: "2px" }}
              >
                <LockIcon style={{ color: "white" }} />
              </button>
            ) : (
              ""
            )}
            {!passworded && !br ? (
              <button
                className="bg-secondary border-0 rounded me-1"
                style={{ padding: "2px" }}
              >
                <ArticleIcon style={{ color: "white" }} />
              </button>
            ) : (
              ""
            )}
            {title}
          </span>
          {isMobile ? (
            <div className="dropdown">
              <button
                className="btn btn-sm btn-secondary dropdown-toggle"
                type="button"
                id="pasteCardDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Actions
              </button>
              <ul className="dropdown-menu" aria-labelledby="pasteCardDropdown">
                <li>
                  <Link to={`ReadPaste/${id}`} className="dropdown-item">
                    <VisibilityIcon /> View
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item">
                    <EditNoteIcon /> Edit
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => handleDelete(id)}
                    className="dropdown-item"
                  >
                    <DeleteIcon /> Delete
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <Link
                to={`ReadPaste/${id}`}
                className="btn btn-sm btn-secondary me-1"
              >
                <VisibilityIcon />
              </Link>
              <Link to="#" className="btn btn-sm btn-secondary me-1">
                <EditNoteIcon />
              </Link>
              <Link
                onClick={() => handleDelete(id)}
                className="btn btn-sm btn-danger"
              >
                <DeleteIcon />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasteCard;

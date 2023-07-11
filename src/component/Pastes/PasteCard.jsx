import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const PasteCard = ({ title, id }) => {
  const [isMobile, setIsMobile] = useState(false);

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
                  <Link to="#" className="dropdown-item">
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
              <Link to="#" className="btn btn-sm btn-danger">
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

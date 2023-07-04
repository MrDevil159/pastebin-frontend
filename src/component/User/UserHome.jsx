import React from "react";
import { Link } from "react-router-dom";

import Pastes from "../Pastes/Pastes";
import Stats from "../Stats/Stats";

const UserHome = () => {
  return (
    <div>
      <div className="container mt-4 bg-secondary p-3 rounded">
        <div className="row">
          <div className="col-md-12  bg-white p-5 rounded">
            <div className="row">
              <div className="col-md-9">
                <div className="display-6 d-flex justify-content-between">
                  Your Paste:
                  <Link to="/NewPaste" className="btn btn-primary m-2 me-0">
                    New Paste
                  </Link>
                </div>
                <Pastes />
              </div>
              <div className="col-md-3">
                <h4 className="display-6">Your Stats:</h4>
                <Stats />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

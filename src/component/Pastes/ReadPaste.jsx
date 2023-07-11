import axios from "axios";
import CryptoJS from "crypto-js";
import { ToastContainer } from "react-toastify";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const ReadPaste = () => {
  const params = useParams();
  const { all } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [paste, setPaste] = useState({});
  const [password, setPassword] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  const decryptMessage = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedMessage, password);
      const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
      console.log(encryptedMessage, password, decryptedMessage);
      if (decryptedMessage) {
        setDecryptedMessage(decryptedMessage);
        setPassword(""); // Clear the password input field
      } else {
        toast.error("Wrong password entered"); // Display error toast notification
      }
    } catch (error) {
      console.log("Decryption error:", error);
      toast.error("Wrong password entered");
      setDecryptedMessage("");
    }
  };
  const handleCopy = () => {
    if (decryptedMessage == "" && paste.passworded) {
      toast.error("Unlock First!");
    } else if (paste.passworded) {
      navigator.clipboard.writeText(decryptedMessage);
      toast.success("Copied to Clip!");
    } else {
      navigator.clipboard.writeText(paste.description);
      toast.success("Copied to Clip!");
    }
  };
  const headers = {
    Authorization: `Bearer ${all.token[0]}`,
  };

  useEffect(() => {
    getContent(params.id);
  }, [params.id]);

  const getContent = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/paste/readPaste/${id}`,
        { headers }
      );
      setPaste(response.data);
      setEncryptedMessage(response.data.description);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <style>
        {`
          .no-border-ckeditor .ck-editor__editable {
            border: none;
          }
          .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
            border: none;
          }

          .ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,
          .ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {
            border: none;
          }

          .fr {
            float: right;
          }
        `}
      </style>
      <ToastContainer />

      <div className="container mt-4 bg-secondary p-3 rounded">
        <div className="row">
          <div className="col-md-12 bg-white p-5 rounded">
            <div className="row">
              <div className="col-md-2 display-6">Paste:</div>

              <div className="col-md-10">
                <p className="display-6">
                  <b>{paste.title}</b>{" "}
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleCopy()}
                  >
                    <ContentCopyIcon />
                  </button>
                </p>
                {paste.passworded && !decryptedMessage ? ( // Display form only when passworded and decryptedMessage is empty
                  <div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="form-control"
                        id="password"
                      />
                    </div>
                    <button
                      onClick={decryptMessage}
                      className="btn btn-primary mt-1"
                    >
                      Unlock
                    </button>
                  </div>
                ) : (
                  <div className="msg">
                    <div
                      className="mb-3 mt-3"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {decryptedMessage ? (
                        <CKEditor
                          editor={ClassicEditor}
                          data={decryptedMessage}
                          config={{
                            toolbar: [],
                            readOnly: true,
                          }}
                          className="no-border-ckeditor"
                          disabled
                        />
                      ) : (
                        <CKEditor
                          editor={ClassicEditor}
                          data={paste.description}
                          config={{
                            toolbar: [],
                            readOnly: true,
                          }}
                          className="no-border-ckeditor"
                          disabled
                        />
                      )}
                    </div>
                    <hr />
                    <small className="msg-date">
                      <i className="fa fa-clock-o"></i> {paste.createdAt}
                    </small>
                    <h6>
                      {paste.username}
                      <small className="text-muted fr">
                        Views: {paste.count}
                      </small>
                    </h6>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadPaste;

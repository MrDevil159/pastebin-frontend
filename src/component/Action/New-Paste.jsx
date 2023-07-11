import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NewPaste = () => {
  const { all } = useContext(AuthContext);
  const { register, handleSubmit, watch, setValue } = useForm();
  const navigate = useNavigate();
  let handlePaste;
  useEffect(() => {
    handlePaste = (event) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData("Text");
      setValue("description", pastedData);
      document.removeEventListener("paste", handlePaste);
    };
    document.addEventListener("paste", handlePaste);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    newPaste(data);
  };

  const newPaste = async (data) => {
    try {
      const headers = {
        Authorization: `Bearer ${all.token[0]}`,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/paste/newPaste`,
        data,
        { headers }
      );
      console.log("New paste response:", response.data);
      navigate(`/ReadPaste/${response.data}`);
    } catch (error) {
      console.error("Error creating new paste:", error);
    }
  };
  const passwordProtectionChecked = watch("passwordProtection");
  const descToggle = watch("descToggle");

  if (all.loggedIn[0] === true) {
    return (
      <div>
        <div className="container mt-4 bg-secondary p-3 rounded">
          <div className="row">
            <div className="col-md-12  bg-white p-5 rounded">
              <div className="row">
                <div className="col-md-2 display-6">New Paste:</div>

                <div className="col-md-10">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        {...register("title", { required: true })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="descToggle"
                        {...register("descToggle")}
                      />
                      <label className="form-check-label" htmlFor="descToggle">
                        Plain Description Toggle
                      </label>

                      {descToggle && (
                        <div className="mb-3">
                          <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            {...register("description", { required: true })}
                          ></textarea>
                        </div>
                      )}
                      {!descToggle && (
                        <CKEditor
                          editor={ClassicEditor}
                          data={watch("description")}
                          config={{
                            toolbar: [
                              "heading",
                              "|",
                              "fontFamily",
                              "fontSize",
                              "fontColor",
                              "fontBackgroundColor",
                              "|",
                              "bold",
                              "italic",
                              "underline",
                              "strikethrough",
                              "subscript",
                              "superscript",
                              "|",
                              "link",
                              "bulletedList",
                              "numberedList",
                              "todoList",
                              "|",
                              "indent",
                              "outdent",
                              "|",
                              "alignment",
                              "blockQuote",
                              "code",
                              "codeBlock",
                              "|",
                              "insertTable",
                              "|",
                              "undo",
                              "redo",
                              "|",
                              "imageTextAlternative",
                            ],
                            table: {
                              contentToolbar: [
                                "tableColumn",
                                "tableRow",
                                "mergeTableCells",
                                "tableCellProperties",
                                "tableProperties",
                              ],
                            },
                          }}
                          onChange={(event, editor) => {
                            document.removeEventListener("paste", handlePaste);

                            const data = editor.getData();
                            setValue("description", data);
                          }}
                        />
                      )}
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="burnAfterRead"
                        {...register("burnAfterRead")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="burnAfterRead"
                      >
                        Burn After Read
                      </label>
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="passwordProtection"
                        {...register("passwordProtection")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="passwordProtection"
                      >
                        Password Protection
                      </label>
                    </div>
                    {passwordProtectionChecked && (
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          {...register("password", { required: true })}
                        />
                      </div>
                    )}
                    {!passwordProtectionChecked && (
                      <input type="hidden" {...register("password")} />
                    )}
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NewPaste;

import React, { useState } from "react";
import "./add.scss";

const Add = ({ slug, columns, setOpen, onSubmit }) => {
  const [formData, setFormData] = useState({
    product: {},
    user: {},
    sales: {},
    imageFile: null, // To store the selected image file
  });

  const handleInputChange = (type, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [field]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imageFile: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData[slug], formData?.imageFile);
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                {column.type === "file" ? (
                  <input type="file" onChange={handleFileChange} />
                ) : (
                  <input
                    type={column.type}
                    placeholder={column.field}
                    required
                    onChange={(e) =>
                      handleInputChange(slug, column.field, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          <button type="submit">create {slug}</button>
        </form>
      </div>
    </div>
  );
};

export default Add;

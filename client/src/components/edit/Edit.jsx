import React, { useState } from "react";
import "./edit.scss";
import axios from "axios";

const Add = ({ slug, columns, setOpen, onSubmit, product }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const handleInputChange = (field, value) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/products", { editedProduct });
      onSubmit(res.data);
      setOpen(false)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Edit {slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                {column.type === "file" ? (
                  ""
                ) : (
                  <input
                    type={column.type}
                    placeholder={column.field}
                    required
                    value={editedProduct[column.field]}
                    onChange={(e) =>
                      handleInputChange(column.field, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          <button type="submit">Edit {slug}</button>
        </form>
      </div>
    </div>
  );
};

export default Add;

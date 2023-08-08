import React, { useEffect, useState } from "react";
import "./products.scss";
import axios from "axios";
// import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import Edit from "../../components/edit/Edit";
import Table from "../../components/table/Table";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const fields = [
  { field: "name", headerName: "Name", type: "string" },
  { field: "price", headerName: "Price", type: "number" },
  { field: "stock", headerName: "Stock", type: "number" },
  { field: "description", headerName: "Description", type: "string" },
  { field: "image", headerName: "Image", type: "file" },
];

const columns = [
  { field: "id", header: "Id" },
  { field: "name", header: "Name" },
  { field: "image", header: "Product" },
  { field: "price", header: "Price" },
  { field: "stock", header: "Stock" },
  { field: "description", header: "Description" },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editproduct, setEditProduct] = useState(null);

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (error) {}
  };

  const uploadImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (formData, imageFile) => {
    const imgUrl = await uploadImage(imageFile);
    try {
      const res = await axios.post("/api/products", {
        formData,
        img: imgUrl,
      });
      setProducts((prevProducts) => [...prevProducts, res.data]);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/api/products/${id}`).then((res) => {
            setProducts(res.data);

            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            navigate("/products");
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (data) => {
    setEditMode(true);
    setEditProduct(data);
  };

  const handleEditSubmit = (product) => {
    try {
      setProducts((prevProducts) =>
        prevProducts.map((pro) => (pro._id === product._id ? product : pro))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCustomers = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <div className="controlls">
          <input
            type="text"
            placeholder="Enter product name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button onClick={() => setOpen(true)}>Add new product</button>
        </div>
      </div>
      {/* <DataTable /> */}
      <Table
        data={filteredCustomers}
        columns={columns}
        onDelete={handleDelete}
        onEdit={handleEdit}
        slug="product"
      />

      {open && (
        <Add
          slug="product"
          columns={fields}
          setOpen={setOpen}
          onSubmit={handleSubmit}
        />
      )}
      {editMode && (
        <Edit
          slug="product"
          columns={fields}
          setOpen={setEditMode}
          onSubmit={handleEditSubmit}
          product={editproduct}
        />
      )}
    </div>
  );
};

export default Products;

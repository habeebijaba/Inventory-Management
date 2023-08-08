import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddSales = ({ slug, columns, setOpen, onSubmit }) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customer: "",
    product: "",
    date: new Date(),
    totalAmount: 0,
    quantity: 1,
    cashPaid: 0,
  });

  const handleInputChange = (field, value) => {
    if (field === "product") {
      const selectedProduct = products.find((product) => product._id === value);
      const totalAmount = selectedProduct
        ? selectedProduct.price * formData.quantity
        : 0;
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
        totalAmount,
      }));
    } else if (field === "quantity") {
      // const totalAmount = formData.product ? formData.product.price * value : 0;
      const selectedProduct = products.find(
        (product) => product._id === formData.product
      );
      const totalAmount = selectedProduct ? selectedProduct.price * value : 0;

      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
        totalAmount,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const fetchProductsAndCustomers = async () => {
    try {
      const [productsResponse, customersResponse] = await Promise.all([
        axios.get("/api/products"),
        axios.get("/api/customers"),
      ]);
      setProducts(productsResponse.data);
      setCustomers(customersResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProductsAndCustomers();
  }, []);

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns.map((column) => (
            <div className="item" key={column.field}>
              <label>{column.headerName}</label>
              {column.field === "customer" ? (
                <select
                  style={{
                    padding: "10px",
                    color: "black",
                    outline: "none",
                    borderRadius: "3px0",
                    width: "100%",
                  }}
                  value={formData.customer}
                  onChange={(e) =>
                    handleInputChange(column.field, e.target.value)
                  }
                  required>
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer._id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              ) : column.field === "product" ? (
                <select style={{
                  padding: "10px",
                  color: "black",
                  outline: "none",
                  borderRadius: "3px0",
                  width: "100%",
                }}
                  value={formData.product}
                  onChange={(e) =>
                    handleInputChange(column.field, e.target.value)
                  }
                  required>
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              ) : column.field === "date" ? (
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                />
              ) : column.field === "totalAmount" ? (
                <input
                  type={column.type}
                  placeholder={column.field}
                  value={formData.totalAmount}
                  readOnly
                />
              ) : column.field === "quantity" ? (
                <input
                  type={column.type}
                  placeholder={column.field}
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange(column.field, e.target.value)
                  }
                />
              ) : (
                <input
                  type={column.type}
                  placeholder={column.field}
                  value={formData[column.field]}
                  onChange={(e) =>
                    handleInputChange(column.field, e.target.value)
                  }
                  required
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

export default AddSales;

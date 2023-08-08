import React, { useRef } from "react";
import "./table.scss";
import { formatDate } from "../../utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { PDFExport } from "@progress/kendo-react-pdf";
import CSVExportButton from "../../components/csv/CSVExportButton";
import ReactToPrint from "react-to-print";
import ExportExcel from "../excel/Excel";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const MAX_DESCRIPTION_WORDS = 2;

const Table = ({ data = null, columns, onDelete, onEdit, slug }) => {
  const navigate = useNavigate();
  const printRef = useRef(null);

  const pdfExportComponent = React.useRef(null);

  const handlePdf = () => {
    pdfExportComponent.current.save();
  };

  const handlemail = () => {
    const email = prompt("Enter recipient email:");
    console.log(email, "trhi sis email");
    emailjs
      .send(
        "service_jp8h15n",
        "template_u2nt45b",
        {
          // from_name: form.name,
          // to_name: "Habeeb ijaba",
          from_email: "habeebav841@gmail.com",
          to_email: email,
          message: JSON.stringify(data, null, 2),
        },
        "rFLm-JOzXAKHEI-NO"
      )
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Data exported to ${email}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div>
      <div className="exportButtons">
        <button onClick={handlePdf}>PDF</button>

        <CSVExportButton dataToExport={data} />
        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => printRef.current}
        />
        <ExportExcel data={data} />
        <button onClick={handlemail}>Mail</button>
      </div>
      <PDFExport ref={pdfExportComponent}>
        <table ref={printRef}>
          <thead>
            <tr>
              <th>No</th>
              {columns
                .filter((column) => column.field !== "id")
                .map((column) => (
                  <th key={column.field}>{column.header}</th>
                ))}
              {slug === "product" ? (
                <>
                  <th>Edit</th>
                  <th>Delete</th>
                </>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((row, index) => (
                <tr
                  key={index}
                  // onClick={() =>
                  //   slug === "product"
                  //     ? navigate(`/products/${row?._id}`)
                  //     : slug === "users"
                  //     ? navigate(`/customers/${row?._id}`)
                  //     : ""
                  // }
                  onClick={() => {
                    if (
                      !event.target.classList.contains("editButton") &&
                      !event.target.classList.contains("deleteButton")
                    ) {
                      slug === "product"
                        ? navigate(`/products/${row?._id}`)
                        : slug === "users"
                        ? navigate(`/customers/${row?._id}`)
                        : "";
                    }
                  }}>
                  <td>{index + 1}</td>
                  {columns
                    .filter((column) => column.field !== "id")
                    .map((column) => (
                      <td key={column.field}>
                        {column.field === "image" ? (
                          <img
                            className="img"
                            src={`../upload/${row.imageURL}`}
                            alt="Product"
                          />
                        ) : column.field === "description" ? (
                          row[column.field]
                            .split(" ")
                            .slice(0, MAX_DESCRIPTION_WORDS)
                            .join(" ") +
                          (row[column.field].split(" ").length >
                          MAX_DESCRIPTION_WORDS
                            ? "..."
                            : "")
                        ) : column.field === "address" ? (
                          `${row.house}, ${row.street}, ${row.district}, ${row.state}, ${row.pincode}`
                        ) : slug === "sales" && column.field == "customer" ? (
                          row[column.field].name
                        ) : slug === "sales" && column.field == "product" ? (
                          row[column.field].name
                        ) : column.field === "date" ? (
                          formatDate(row[column.field])
                        ) : (
                          row[column.field] //render others
                        )}
                      </td>
                    ))}
                  {slug === "product" ? (
                    <>
                      <td>
                        <button
                          className="editButton"
                          onClick={() => onEdit(row)}>
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="deleteButton"
                          onClick={() => onDelete(row._id)}>
                          Delete
                        </button>
                      </td>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            {data ? null : (
              <tr>
                <td colSpan={columns.length + 3}>No data to show :)</td>
              </tr>
            )}
          </tbody>
        </table>
      </PDFExport>
    </div>
  );
};

export default Table;

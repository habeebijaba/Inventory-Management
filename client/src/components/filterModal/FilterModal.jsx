import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import "./filtermodal.scss";


const FilterModal = ({
  isOpen,
  onClose,
  startDate,
  handleStartDate,
  endDate,
  handleEndDate,
  handleFilter,
}) => {
  return (
    <div className="contol">
        <div className="inner">

    <Modal isOpen={isOpen} onRequestClose={onClose}>
        
        <h1 className="heading">Filter Report</h1>
        <div className="picker">
          <label htmlFor="">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDate}
            dateFormat="dd/MM/yyyy"
            className="custom-datepicker"
            maxDate={new Date()}
          />
        </div>
        <div className="picker">
          <label htmlFor="">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDate}
            dateFormat="dd/MM/yyyy"
            className="custom-datepicker"
            maxDate={new Date()}
          />
        </div>
        <button onClick={handleFilter}>Filter</button>
    </Modal>
    </div>
    </div>

  );
};

export default FilterModal;

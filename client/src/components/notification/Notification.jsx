import React, { useEffect, useState } from "react";
import "./notification.scss";
import axios from "axios";

const Notification = ({ setOpenNotification }) => {
  const [requests, setRequests] = useState([]);
  const getNotification = async () => {
    try {
      const res = await axios.get("/api/requests");
      setRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleApprove = async (id) => {
    try {
      const res = await axios.put(`/api/requests/${id}`);
      setRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotification();
  }, []);

  return (
    <div className="notifications">
      <div className="notificationModal">
        <h2>Pending Requests</h2>
        <span onClick={() => setOpenNotification(false)} className="close">
          &times;
        </span>
        {requests.map((request) => (
          <div className="notification" key={request._id}>
            <div className="user">
              <img className="avatar" src="/avatar1.png" alt="" />
              <span> {`${request.username} requested access`}</span>
            </div>
            <button
              className="approve-button"
              onClick={() => handleApprove(request._id)}>
              Approve
            </button>
          </div>
        ))}
        {requests.length < 1 ? (
          <span style={{ color: "white" }}>No pending requests :)</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Notification;

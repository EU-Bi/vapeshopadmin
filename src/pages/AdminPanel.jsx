import "../assets/AdminPanel.css";
import { Avatar, Box } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="wrap-admin">
      <Box
        sx={{
          width: "300px",
          backgroundColor: "#83ECBB",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              margin: 2,
            }}
          >
            J
          </Avatar>
          <h2>Jeka Bilan</h2>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Link className="link" to={`dashboard`}>
            Dashboard
          </Link>
          <Link className="link" to={`brands`}>
            Brands
          </Link>
          <Link className="link" to={`types`}>
            Types
          </Link>
          <Link className="link" to={`models`}>
            Models
          </Link>
          <Link className="link" to={`devices`}>
            Товары
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default AdminPanel;

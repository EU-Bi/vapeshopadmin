import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  TableCell,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { Delete, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";

const RowsDevice = ({ device }) => {
  return (
    <TableRow>
      <TableCell>
        <p>{device.brand}</p>
      </TableCell>
      <TableCell>
        <p>{device.model.title}</p>
      </TableCell>
      <TableCell>
        <p>{device.type}</p>
      </TableCell>
      <TableCell>
        <p>{device.taste.title}</p>
      </TableCell>
      <TableCell>
        <img
        width={100}
        height={100}
          alt=""
          src={`${process.env.REACT_APP_API_URL}/${device.taste.photo}`}
        />
      </TableCell>
      <TableCell>
        <p>{device.taste.count}</p>
      </TableCell>
      <TableCell>
        <Edit />
      </TableCell>
      <TableCell>
        <Delete />
      </TableCell>
    </TableRow>
  );
};

export default RowsDevice;

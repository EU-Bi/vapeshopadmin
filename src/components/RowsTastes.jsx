import { TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { Delete, Edit } from "@mui/icons-material";
const RowsTastes = () => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`watermelon`}>Watermelon</Link>
      </TableCell>
      <TableCell>link</TableCell>
      <TableCell>Описание паиапи</TableCell>
      <TableCell>450 uan</TableCell>
      <TableCell>100</TableCell>
      <TableCell>
        <Edit />
      </TableCell>
      <TableCell>
        <Delete />
      </TableCell>
    </TableRow>
  );
};

export default RowsTastes;

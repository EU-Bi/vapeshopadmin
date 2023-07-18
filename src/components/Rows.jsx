import {
  Box,
  Button,
  Modal,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { $authHost } from "../store/api/api";
const Rows = ({ brand, asyncGetBrands }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const createBrand = (title) => {
    $authHost
      .put(`/api/brand/${brand.id}`, {
        title,
      })
      .then(() => asyncGetBrands());
    setOpen(false);
  };
  const deleteBrand = () => {
    $authHost.delete(`/api/brand/${brand.id}`).then(() => asyncGetBrands());
  };
  return (
    <TableRow>
      <TableCell>
        <p>{brand.title}</p>
      </TableCell>
      <TableCell>
        <Edit onClick={() => setOpen(true)} />
      </TableCell>
      <TableCell>
        <Delete onClick={() => deleteBrand()} />
      </TableCell>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="margins">Add category</h2>
          <TextField
            id="outlined-basic"
            label={`Предидущее название: ${brand.title}`}
            variant="outlined"
            className="margins"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            className="margins"
            variant="contained"
            onClick={() => createBrand(title)}
          >
            Сохранить
          </Button>
        </Box>
      </Modal>
    </TableRow>
  );
};

export default Rows;

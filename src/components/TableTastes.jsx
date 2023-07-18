import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import "../assets/Categories.css";
import React, { useState } from "react";
import RowsTastes from "./RowsTastes";

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

const TableTastes = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <h1>BC3000</h1>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
        >
          ADD NEW CATEGORY
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Вкус</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Как ощущается</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Количество этого вкуса (в наличие)</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <RowsTastes />
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="margins">Добавить тип</h2>
          <TextField
            id="outlined-basic"
            label="Название категории"
            variant="outlined"
            className="margins"
          />
          <TextField
            id="outlined-basic"
            label="Вкус"
            variant="outlined"
            className="margins"
          />
          <Button className="margins" variant="outlined">
            Добавить вкус
          </Button>
          <TextField
            id="outlined-basic"
            label="Цена"
            variant="outlined"
            className="margins"
          />
          <TextField
            id="outlined-basic"
            label="Описание"
            variant="outlined"
            className="margins"
          />
          <Button className="margins" variant="contained">
            Сохранить
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default TableTastes;

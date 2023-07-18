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
import RowsProduct from "./RowsProduct";
import { connect } from "react-redux";
import { $authHost } from "../store/api/api";
import { asyncGetModels } from "../store/asyncActions/asyncGetBrands";

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

const TableProductID = ({ models, brand, asyncGetModels }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [price, setPrice] = useState("");
  const [countSmoke, setCountSmoke] = useState("");
  const [nicotine, setNicotine] = useState("");
  const [power, setPower] = useState("");
  const [charge, setCharge] = useState("");
  const [type, setType] = useState("");
  const brandTitle = brand.filter(
    (brand) => brand.id == document.location.pathname.split("=")[1]
  )[0];
  const createModel = (
    title,
    price,
    description,
    newPrice,
    typeId,
    brandId,
    info
  ) => {
    $authHost
      .post("/api/model", {
        title,
        description,
        newPrice,
        price,
        typeId,
        brandId,
      })
      .then(() => asyncGetModels());
    setOpen(false);
  };
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
        <h1>{brandTitle.title}</h1>
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
              <TableCell>Тип устройства</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {models.map((model) => (
              <RowsProduct key={model.id} type={type} />
            ))}
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
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Цена"
            variant="outlined"
            className="margins"
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Новая цена"
            variant="outlined"
            className="margins"
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Описание"
            variant="outlined"
            className="margins"
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Количество тяг"
            variant="outlined"
            className="margins"
            onChange={(e) => setCountSmoke(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Никотин"
            variant="outlined"
            className="margins"
            onChange={(e) => setNicotine(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Заряд"
            variant="outlined"
            className="margins"
            onChange={(e) => setPower(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Может подзарядиться"
            variant="outlined"
            className="margins"
            onChange={(e) => setCharge(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Тип устройства"
            variant="outlined"
            className="margins"
            onChange={(e) => setType(e.target.value)}
          />
          <Button
            className="margins"
            variant="contained"
            onClick={() =>
              createModel(title, price, description, newPrice, type, brandTitle.id, [description, power, nicotine, countSmoke, charge])
            }
          >
            Сохранить
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default connect(
  (state) => ({
    brand: state.device.brand,
    models: state.device.models.filter(
      (models) => models.brandId == document.location.pathname.split("=")[1]
    ),
  }),
  { asyncGetModels }
)(TableProductID);

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
import React, { useEffect, useState } from "react";
import Rows from "../components/Rows";
import { connect } from "react-redux";
import { $authHost } from "../store/api/api";
import {
  asyncGetBrands,
  asyncGetModels,
} from "../store/asyncActions/asyncGetBrands";

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

const Categories = ({ brands, asyncGetBrands, asyncGetModels }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  useEffect(() => {
    asyncGetBrands();
    asyncGetModels();
  }, []);

  // console.log(brands);
  // console.log(models);

  const createBrand = (title) => {
    $authHost
      .post("/api/brand", {
        title,
      })
      .then(() => asyncGetBrands());
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
        <h1>Brands</h1>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
        >
          ADD NEW BRAND
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Производитель</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((brand) => {
              return <Rows key={brand.id} brand={brand} asyncGetBrands={asyncGetBrands} />;
            })}
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
          <h2 className="margins">Add category</h2>
          <TextField
            id="outlined-basic"
            label="Название категории"
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
    </>
  );
};

export default connect(
  (state) => ({
    brands: [] && state.device.brand,
  }),
  { asyncGetBrands, asyncGetModels }
)(Categories);

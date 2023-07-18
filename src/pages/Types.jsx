import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
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
  asyncGetTypes,
} from "../store/asyncActions/asyncGetBrands";
import RowsTypes from "../components/RowsTypes";

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

const Types = ({ types, brands, models, asyncGetTypes, asyncGetBrands }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  useEffect(() => {
    asyncGetTypes();
    asyncGetBrands();
  }, []);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleCheckboxChange = (event, brandId) => {
    if (event.target.checked) {
      setSelectedBrands([...selectedBrands, brandId]);
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    }
  };

  const createType = (title, brandIds) => {
    $authHost
      .post("/api/type", {
        title,
        brandIds,
      })
      .then(() => asyncGetTypes());
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
        <h1>Types</h1>
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
              <TableCell>Тип девайса</TableCell>
              <TableCell>Бренды с этим типом</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {types.map((type) => {
              return (
                <RowsTypes
                  key={type.id}
                  type={type}
                  brands={brands}
                  asyncGetTypes={asyncGetTypes}
                />
              );
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
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand.id}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand.id)}
                    onChange={(event) => handleCheckboxChange(event, brand.id)}
                  />
                }
                label={brand.title}
              />
            ))}
          </FormGroup>
          <Button
            className="margins"
            variant="contained"
            onClick={() => createType(title, selectedBrands)}
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
    models: [] && state.device.models,
    types: [] && state.device.types,
  }),
  { asyncGetTypes, asyncGetBrands }
)(Types);

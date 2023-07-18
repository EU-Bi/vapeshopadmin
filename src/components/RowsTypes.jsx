import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import React, {  useState } from "react";
import { Delete, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import { $authHost } from "../store/api/api";

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

const RowsTypes = ({ type, asyncGetTypes, brands }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState(
    type.brands.map((brand) => brand.id)
  );
  const [title, setTitle] = useState(type.title);
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleCheckboxChange = (event, brandId) => {
    if (event.target.checked) {
      setSelectedBrands([...selectedBrands, brandId]);
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    }
  };

  const updateType = (title, brandIds) => {
    $authHost
      .put(`/api/type/${type.id}`, {
        title,
        brandIds,
      })
      .then(() => asyncGetTypes());
    setOpenModal(false);
  };
  const deleteType = () => {
    $authHost
      .delete(`/api/type/${type.id}`)
      .then(() => asyncGetTypes());
    setOpenModal(false);
  };

  return (
    <TableRow>
      <TableCell>
        <p>{type.title}</p>
      </TableCell>
      <TableCell>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Бренды" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {type.brands.map((brand) => (
              <ListItemButton sx={{ pl: 4 }} key={brand.id}>
                <ListItemText primary={brand.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </TableCell>
      <TableCell>
        <Edit onClick={() => setOpenModal(true)} />
      </TableCell>
      <TableCell>
        <Delete onClick={()=>deleteType()}/>
      </TableCell>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="margins">Add category</h2>
          <TextField
            id="outlined-basic"
            label="Название категории"
            variant="outlined"
            value={title}
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
            onClick={() => updateType(title, selectedBrands)}
          >
            Сохранить
          </Button>
        </Box>
      </Modal>
    </TableRow>
  );
};

export default RowsTypes;

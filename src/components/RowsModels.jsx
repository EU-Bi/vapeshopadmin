import {
  Avatar,
  Box,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  Radio,
  RadioGroup,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Delete, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import { $authHost } from "../store/api/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  height: "90vh",
  flexDirection: "column",
  overflowY: "scroll",
};

const RowsModel = ({
  model,
  types,
  brands,
  photo,
  asyncGetModels,
  actionClearData,
  actionSetPhoto,
  actionDeletePhoto,
}) => {
  const [open, setOpen] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  // const [title, setTitle] = useState(model.title);
  // const [description, setDescription] = useState(model.description);
  // const [price, setPrice] = useState(model.price);
  // const [newPrice, setNewPrice] = useState(model.newPrice);
  // const [typeid, setTypeId] = useState("");
  // const [brandId, setBrandId] = useState("");
  // const [modelInfoDescription, setModelInfoDescription] = useState(
  //   model.model_info.description
  // );
  // const [modelInfoPower, setModelInfoPower] = useState(model.model_info.power);
  // const [modelInfoNicotine, setModelInfoNicotine] = useState(
  //   model.model_info.nicotine
  // );
  // const [modelInfoCountSmoke, setModelInfoCountSmoke] = useState(
  //   model.model_info.countSmoke
  // );
  // const [modelInfoCharge, setModelInfoCharge] = useState(
  //   model.model_info.charge
  // );

  // const [items, setItems] = useState(model.tastes);
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   count: 0,
  // });
  // // useEffect(() => {
  // //   console.log(items);
  // // }, [items]);
  // const handleChange = (event) => {
  //   setTypeId(event.target.value);
  // };
  // const handleChangeBrand = (event) => {
  //   setBrandId(event.target.value);
  // };
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };
  // const handlePhotoChange = (event) => {
  //   const file = event.target.files[0];
  //   actionSetPhoto(file);
  // };
  // // const handlePhotoChange = (event) => {
  // //   const file = event.target.files[0];

  // // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const newItem = {
  //     title: formData.title,
  //     description: formData.description,
  //     count: formData.count,
  //   };
  //   setItems([...items, newItem]);
  //   setFormData({
  //     title: "",
  //     description: "",
  //     count: 0,
  //   });
  // };
  // const handleDeleteItem = (index) => {
  //   const updatedItems = [...items];
  //   updatedItems.splice(index, 1);
  //   setItems(updatedItems);
  //   actionDeletePhoto(index);
  // };

  // const createModel = (
  //   title,
  //   description,
  //   price,
  //   newPrice,
  //   typeid,
  //   brandId,
  //   modelInfoDescription,
  //   modelInfoPower,
  //   modelInfoCharge,
  //   modelInfoNicotine,
  //   modelInfoCountSmoke,
  //   tastes
  // ) => {
  //   let modelInfo = {
  //     description: modelInfoDescription,
  //     power: modelInfoPower,
  //     nicotine: modelInfoNicotine,
  //     charge: modelInfoCharge,
  //     countSmoke: modelInfoCountSmoke,
  //   };
  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   formData.append("price", price);
  //   formData.append("newPrice", newPrice);
  //   formData.append("typeId", typeid);
  //   formData.append("brandId", brandId);
  //   formData.append("modelInfo", JSON.stringify(modelInfo));
  //   formData.append("tastes", JSON.stringify(tastes));
  //   photo.forEach((phot, index) => {
  //     formData.append(`photo[${index}]`, phot);
  //   });
  //   console.log(photo);
  //   console.log(formData);
  //   $authHost
  //     .post("/api/model", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then(() => asyncGetModels());
  //   setOpen(false);
  //   actionClearData();
  // };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <TableRow>
      <TableCell>
        <p>{model.title}</p>
      </TableCell>
      <TableCell>
        <p>{model.description}</p>
      </TableCell>
      <TableCell>
        <p>{model.price}</p>
      </TableCell>
      <TableCell>
        <p>{model.newPrice}</p>
      </TableCell>
      <TableCell>
        <p>{model.model_info.charge ? "da" : "noy"}</p>
      </TableCell>
      <TableCell>
        <p>{model.model_info.countSmoke}</p>
      </TableCell>
      <TableCell>
        <p>{model.model_info.description}</p>
      </TableCell>
      <TableCell>
        <p>{model.model_info.nicotine}</p>
      </TableCell>
      <TableCell>
        <p>{model.model_info.power}</p>
      </TableCell>
      <TableCell>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Вкусы" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {model.tastes.map((taste) => (
              <ListItemButton
                sx={{ pl: 4, display: "flex", flexDirection: "column" }}
                key={taste.id}
              >
                <ListItemText primary={taste.title} sx={{ color: "red" }} />
                <br />
                <ListItemText primary={taste.description} />
                <br />
                <ListItemText
                  primary={`Количество товара этого вкуса этой модели: ${taste.model_taste.count}`}
                />
                <br />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </TableCell>
      <TableCell>
        <Edit 
        //onClick={() => setOpenModal(true)} 
        />
      </TableCell>
      <TableCell>
        <Delete />
      </TableCell>
      {/* <Modal
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
            className="margins"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Тип модели
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={typeid}
                onChange={handleChange}
              >
                {types.map((type) => (
                  <FormControlLabel
                    value={type.id}
                    control={<Radio />}
                    label={type.title}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Бренд модели
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={brandId}
                onChange={handleChangeBrand}
              >
                {brands.map((brand) => (
                  <FormControlLabel
                    value={brand.id}
                    control={<Radio />}
                    label={brand.title}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 20,
              }}
            >
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                className="margins"
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="New Price"
                variant="outlined"
                className="margins"
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="CountSmoke"
                variant="outlined"
                className="margins"
                onChange={(e) => setModelInfoCountSmoke(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Description (всегда good)"
                variant="outlined"
                className="margins"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 20,
              }}
            >
              <TextField
                id="outlined-basic"
                label="ModelInfo Description"
                variant="outlined"
                className="margins"
                onChange={(e) => setModelInfoDescription(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Nicotine %"
                variant="outlined"
                className="margins"
                onChange={(e) => setModelInfoNicotine(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="ModelInfo Power mAh"
                variant="outlined"
                className="margins"
                onChange={(e) => setModelInfoPower(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="ModelInfo Charge (true или false)"
                variant="outlined"
                className="margins"
                onChange={(e) => setModelInfoCharge(e.target.value)}
              />
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Count"
                name="count"
                type="number"
                value={formData.count}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <Button variant="contained" color="primary" type="submit">
                Add Item
              </Button>
            </form>

            <List>
              {items.map((item, index) => {
                console.log(item, index)
                console.log(photo)
                return (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Item Photo"
                        // src={
                        //   item.model_taste
                        //     ? `${process.env.REACT_APP_API_URL}/${item.model_taste.photo}`
                        //     : URL.createObjectURL(photo[index])
                        // }
                        src="tututu"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Title: ${item.title}, Description: ${
                        item.description
                      }, Count: ${
                        item.model_taste ? item.model_taste.count : item.count
                      }`}
                    />
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItem>
                );
              })}
            </List>
          </div>

          <Button
            className="margins"
            variant="contained"
            onClick={() =>
              createModel(
                title,
                description,
                price,
                newPrice,
                typeid,
                brandId,
                modelInfoDescription,
                modelInfoPower,
                modelInfoCharge,
                modelInfoNicotine,
                modelInfoCountSmoke,
                items
              )
            }
          >
            Сохранить
          </Button>
        </Box>
      </Modal> */}
    </TableRow>
  );
};

export default RowsModel;

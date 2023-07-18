import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Radio,
  RadioGroup,
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
import { connect } from "react-redux";
import { $authHost } from "../store/api/api";
import {
  asyncGetBrands,
  asyncGetModels,
  asyncGetTypes,
} from "../store/asyncActions/asyncGetBrands";
import RowsModel from "../components/RowsModels";
import {
  actionClearData,
  actionDeletePhoto,
  actionSetPhoto,
} from "../store/reducers/formReducer";
import { Delete } from "@mui/icons-material";
import { actionGetModels } from "../store/reducers/deviceReducer";

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

const Models = ({
  types,
  tastes,
  photo,
  brands,
  models,
  asyncGetTypes,
  asyncGetBrands,
  asyncGetModels,
  actionSetPhoto,
  actionClearData,
  actionDeletePhoto,
}) => {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    count: 0,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // const handlePhotoChange = (event) => {
  //   const file = event.target.files[0];

  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      title: formData.title,
      description: formData.description,
      count: formData.count,
    };
    actionSetPhoto(file);
    setItems([...items, newItem]);
    setFormData({
      title: "",
      description: "",
      count: 0,
    });
  };

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [typeid, setTypeId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [modelInfoDescription, setModelInfoDescription] = useState("");
  const [modelInfoPower, setModelInfoPower] = useState("");
  const [modelInfoNicotine, setModelInfoNicotine] = useState("");
  const [modelInfoCountSmoke, setModelInfoCountSmoke] = useState("");
  const [modelInfoCharge, setModelInfoCharge] = useState("");
  useEffect(() => {
    asyncGetTypes();
    asyncGetBrands();
    asyncGetModels();
  }, []);

  const handleChange = (event) => {
    setTypeId(event.target.value);
  };
  const handleChangeBrand = (event) => {
    setBrandId(event.target.value);
  };
  useEffect(() => {
    console.log(brandId);
  }, [brandId]);

  const createModel = (
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
    tastes
  ) => {
    let modelInfo = {
      description: modelInfoDescription,
      power: modelInfoPower,
      nicotine: modelInfoNicotine,
      charge: modelInfoCharge,
      countSmoke: modelInfoCountSmoke,
    };
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("newPrice", newPrice);
    formData.append("typeId", typeid);
    formData.append("brandId", brandId);
    formData.append("modelInfo", JSON.stringify(modelInfo));
    formData.append("tastes", JSON.stringify(tastes));
    photo.forEach((phot, index) => {
      formData.append(`photo[${index}]`, phot);
    });
    console.log(photo);
    console.log(formData);
    $authHost
      .post("/api/model", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        asyncGetModels()
        actionClearData();
        setItems([])
      });
    setOpen(false);
    
  };
  const handlePhotoChange = (event) => {
    const fileTut = event.target.files[0];
    setFile(fileTut)
  };
  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    actionDeletePhoto(index);
    setItems(updatedItems);
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
        <h1>Models</h1>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
        >
          ADD NEW MODEL
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Модель</TableCell>
              <TableCell>описание (всегда гуд)</TableCell>
              <TableCell>цена</TableCell>
              <TableCell>новая цена</TableCell>
              <TableCell>заряжается</TableCell>
              <TableCell>количество тяг</TableCell>
              <TableCell>описание нормальное</TableCell>
              <TableCell>количество никотина в %</TableCell>
              <TableCell>mAh</TableCell>
              <TableCell>Вкусы</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {models.map((model) => {
              return (
                <RowsModel
                  key={model.id}
                  model={model}
                  photo={photo}
                  types={types}
                  brands={brands}
                  actionSetPhoto={actionSetPhoto}
                  asyncGetModels={actionGetModels}
                  actionClearData={actionClearData}
                  actionDeletePhoto={actionDeletePhoto}
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
              {items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar
                      alt="Item Photo"
                      src={URL.createObjectURL(photo[index])}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Title: ${item.title}, Description: ${item.description}, Count: ${item.count}`}
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteItem(index)}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
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
      </Modal>
    </>
  );
};

export default connect(
  (state) => ({
    brands: [] && state.device.brand,
    models: [] && state.device.models,
    types: [] && state.device.types,
    tastes: [] && state.form.form,
    photo: [] && state.form.photo,
  }),
  {
    asyncGetTypes,
    asyncGetBrands,
    asyncGetModels,
    actionSetPhoto,
    actionClearData,
    actionDeletePhoto,
  }
)(Models);

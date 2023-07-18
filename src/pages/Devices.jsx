import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "../assets/Categories.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { $authHost } from "../store/api/api";
import {
  asyncGetBrands,
  asyncGetDevice,
  asyncGetModels,
  asyncGetTypes,
} from "../store/asyncActions/asyncGetBrands";
import RowsDevice from "../components/RowsDevice";

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

const Devices = ({
  devices,
  types,
  models,
  brands,
  asyncGetTypes,
  asyncGetBrands,
  asyncGetModels,
  asyncGetDevice,
}) => {
  const [typeId, setTypeId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    asyncGetDevice();
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
  const handleChangeModel = (event) => {
    setModelId(event.target.value);
  };
  console.log(models);
  // console.log(models);

  const createDevice = (brandId, typeId, modelId) => {
    console.log(brandId, modelId, typeId);
    let formData = new FormData();
    formData.append("brandId", brandId);
    formData.append("typeId", typeId);
    formData.append("modelId", modelId);
    $authHost.post("/api/device", formData).then((res) => {
        console.log(res)
        asyncGetDevice()
    });
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
              <TableCell>Бренд</TableCell>
              <TableCell>Модель</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>Вкус</TableCell>
              <TableCell>Картинка</TableCell>
              <TableCell>количество</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => {
              return <RowsDevice key={device.id} device={device} />;
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
                Тип девайса
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={typeId}
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
                Бренд девайса
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={brandId}
                onChange={handleChangeBrand}
              >
                {brands.map((brandOne) => (
                  <FormControlLabel
                    value={brandOne.id}
                    control={<Radio />}
                    label={brandOne.title}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Модель девайса
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={modelId}
                onChange={handleChangeModel}
              >
                {models.map((model) => (
                  <FormControlLabel
                    value={model.id}
                    control={<Radio />}
                    label={model.title}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>

          <Button
            className="margins"
            variant="contained"
            onClick={() => createDevice(brandId, typeId, modelId)}
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
    devices: [] && state.device.devices,
  }),
  { asyncGetTypes, asyncGetBrands, asyncGetModels, asyncGetDevice }
)(Devices);

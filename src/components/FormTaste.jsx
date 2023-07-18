import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { connect } from "react-redux";
import { actionSetData, actionSetPhoto } from "../store/reducers/formReducer";

function MyComponent({ actionSetData, actionSetPhoto, photo }) {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    count: 0,
  });
  useEffect(() => {
    actionSetData(items);
  }, [items, actionSetData]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    actionSetPhoto(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      title: formData.title,
      description: formData.description,
      count: formData.count,
    };
    setItems([...items, newItem]);
    setFormData({
      title: "",
      description: "",
      count: 0,
    });
  };

  return (
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
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
        <Button variant="contained" color="primary" type="submit">
          Add Item
        </Button>
      </form>

      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar alt="Item Photo" src={URL.createObjectURL(photo[index])} />
            </ListItemAvatar>
            <ListItemText
              primary={`Title: ${item.title}, Description: ${item.description}, Count: ${item.count}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default connect((state) => ({ photo: state.form.photo }), {
  actionSetData,
  actionSetPhoto,
})(MyComponent);

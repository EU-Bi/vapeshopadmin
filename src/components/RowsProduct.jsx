import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  TableCell,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { Delete, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import { connect } from "react-redux";
const RowsProduct = ({ model }) => {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  
  return (
    <TableRow>
      <TableCell>
        <Link to={`${model.title}`}>{model.title}</Link>
      </TableCell>
      <TableCell>Одноразка</TableCell>
      <TableCell>{model.description}</TableCell>
      <TableCell
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <ListItemButton
          onClick={handleClick}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ListItemText
            primary="Арбуз"
            sx={{
              marginRight: 2,
            }}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Киви" />
            </ListItemButton>
          </List>
        </Collapse>
      </TableCell>
      <TableCell>{model.price}</TableCell>
      <TableCell>{model.newPrice}</TableCell>
      <TableCell>100</TableCell>
      <TableCell>
        <Edit />
      </TableCell>
      <TableCell>
        <Delete />
      </TableCell>
    </TableRow>
  );
};

export default connect()(RowsProduct);

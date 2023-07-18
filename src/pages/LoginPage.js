import { Card, Container, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../store/asyncActions/asyncLogin";


function LoginPage() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => {
    dispatch(postLogin(login, password))
    setTimeout(()=>{
      !localStorage.token
      ? history("/error")
      : history("/adminpanel/dashboard");
    },500)
      
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Card
        sx={{
          width: 275,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            marginBottom: 2,
          }}
          color="text.primary"
        >
          LOGIN
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="Login"
          type="login"
          onChange={(e) => {
            setLogin(e.target.value);
          }}
          sx={{
            marginBottom: 2,
          }}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          sx={{
            marginBottom: 2,
          }}
        />
        <Button
          variant="outlined"
          onClick={handleClick}
        >
          LogIn
        </Button>
      </Card>
    </Container>
  );
}

export default LoginPage;

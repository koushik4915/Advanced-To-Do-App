import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./LoginSlice";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state)=>state.Login);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addUser({email,password}));
    alert("User added succesfully, go to login page for login")
  }

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        SignUp Page
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          margin="normal"
        />
        <TextField
          fullWidth
          label="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
      </form>
        <Typography color="secondary"sx={{ marginTop: 2, marginLeft:22,cursor:"pointer"}} onClick={()=>navigate('/')}>
            Login
        </Typography>
    </Box>
  );
};

export default SignUp;

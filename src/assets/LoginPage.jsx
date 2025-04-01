import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[error,setError] = useState("");
  const navigate = useNavigate();
  const users = useSelector((state)=>state.Login);

  function handleSubmit(e) {
    e.preventDefault();
    const existingUser = users.find((user)=>user.email===email);
    if(existingUser){
      if(existingUser.password===password){
        navigate('/user');
      } else{
        setError("Incorrect password try again")
      }
    }else{
      setError("User not found. Please signup")
    }     
  }

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Login Page
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
        {error && (
          <Typography color="error" sx={{ marginTop: 1 }}>
            {error}
          </Typography>
        )}
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
      <Typography color="secondary"sx={{ marginTop: 2, marginLeft:22,cursor:"pointer"}} onClick={()=>navigate('/signup')}>
        Sign UP
      </Typography>
    </Box>
  );
};

export default Login;

import { useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, MenuItem, Select } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteUser, editUser } from "./UserSlice";
import { fetchWeather } from "./WeatherData.jsx";

export default function GutterlessList() {
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [weatherData, setWeatherData] = useState({});
  const [weatherError, setWeatherError] = useState(null);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  function handleAddClick() {
    if (task.trim()) {
      dispatch(addTask({ task, priority }));
      setTask("");
      setPriority("Medium");
      // Fetch weather only for outdoor-related tasks
      if (task.toLowerCase().includes("park") || task.toLowerCase().includes("out")) {
        if (!weatherData[task]) {  
          fetchWeather("Moradabad")
            .then((data) => {
              if (data) {
                setWeatherData((prevState) => ({ ...prevState, [task]: data }));
              } else {
                setWeatherError("Failed to fetch weather data.");
              }
            })
            .catch((err) => setWeatherError(err.message));
        }
      }
    }
  }
  

  function handleDelete(id) {
    dispatch(deleteUser(id));
  }

  function handleEdit(id, currentText, currentPriority) {
    setEditId(id);
    setEditText(currentText);
    setPriority(currentPriority);
  }

  function handleSaveEdit(id) {
    if (editText.trim()) {
      dispatch(editUser({ id, newTask: editText, newPriority: priority }));
      setEditId(null);
      setEditText("");
    }
  }

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: 3,
      }}
    >
      {/* Input and Add Task Button */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <OutlinedInput
          placeholder="Add Task"
          sx={{ width: "250px" }}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          sx={{ width: "120px" }}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
        <Button variant="contained" onClick={handleAddClick}>
          Add Task
        </Button>
      </Box>

      {/* Task List */}
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {users.map((user) => (
          <ListItem key={user.id} disableGutters>
            {editId === user.id ? (
              <>
                <OutlinedInput
                  sx={{ width: "250px" }}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                  onBlur={() => handleSaveEdit(user.id)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSaveEdit(user.id);
                  }}
                />
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  sx={{ width: "100px", ml: 1 }}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </>
            ) : (
              <>
                <ListItemText primary={user.task} />
                <Select
                  value={user.priority}
                  onChange={(e) =>
                    dispatch(editUser({ id: user.id, newPriority: e.target.value }))
                  }
                  sx={{ width: "100px", ml: 1 }}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </>
            )}
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                aria-label="edit"
                color="secondary"
                onClick={() => handleEdit(user.id, user.task, user.priority)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => handleDelete(user.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            
            {/* Show Weather if task is outdoor-related */}
            {weatherData[user.task] && (
              <Box sx={{ mt: 1, fontSize: "14px", color: "gray" }}>
                🌤 {weatherData[user.task].weather[0].description} - {weatherData[user.task].main.temp}°C
              </Box>
            )}
          </ListItem>
        ))}
      </List>

      {/* Show API Error if any */}
      {weatherError && (
        <Box sx={{ color: "red", mt: 2 }}>Error fetching weather: {weatherError}</Box>
      )}
    </Box>
  );
}

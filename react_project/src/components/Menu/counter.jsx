import { IconButton, Stack } from "@mui/material";
import { useState } from "react";
// import Button from "@mui/material/Button";
function Counter() {
  const [counter, setCounter] = useState(0);

  const handleClick1 = () => {
    setCounter(counter + 1);
  };

  const handleClick2 = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{
        background: "green",
        borderRadius: "40%",
        width: "80px",
        justifyContent: "center",
        marginRight: "10px",
        height: "20px",
      }}
    >
      <IconButton>
        <button
          style={{
            fontSize: "14px",
            color: "white",
          }}
          onClick={handleClick1}
        >
          +
        </button>
      </IconButton>
      <Stack
        sx={{
          color: counter === 0 ? "gray" : "white",
          fontSize: "13px",
        }}
      >
        {counter}
      </Stack>
      <IconButton>
        <button
          style={{
            fontSize: "14px",
            marginLeft: "5px",
            color: "white",
          }}
          onClick={handleClick2}
        >
          -
        </button>
      </IconButton>
    </Stack>
  );
}

export default Counter;

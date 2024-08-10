import { useState } from "react";
import { Stack, Typography, Card, CardContent } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
function MyOrders() {
  const [activeSection, setActiveSection] = useState("progress");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{
        display: "flex",
        mt: "6rem",
        "@media (max-width: 1000px)": {
          flexDirection: "column !important",
        },
      }}
    >
      <Stack
        className="leftSection"
        sx={{
          width: "50%",
          padding: 2,
          border: "1px solid #ddd",
          boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
          "@media (max-width: 500px)": {
          width:"auto"
        },
        }}
      >
        <Stack
          className="progress"
          sx={{
            padding: "1rem",
            backgroundColor: activeSection === "progress" ? "#f0f0f0" : "white",
            cursor: "pointer",
            mb: 1,
            borderRadius: 1,
          }}
          onClick={() => handleSectionClick("progress")}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <AccessTimeOutlinedIcon
              sx={{
                background: "#fff",
                border: "1px solid #eff2f5",
                padding: ".5rem .5rem",
                borderRadius: "50px",
                boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
                fontSize: "1.8rem",
                verticalAlign: "bottom",
              }}
            />
            <Typography sx={{fontSize:"1.2rem",ml:".5rem",fontWeight:"600"}}>Progress</Typography>
          </Stack>
        </Stack>
        <Stack
          className="completed"
          sx={{
            padding: "1rem",
            backgroundColor:
              activeSection === "completed" ? "#f0f0f0" : "white",
            cursor: "pointer",
            mb: 1,
            borderRadius: 1,
          }}
          onClick={() => handleSectionClick("completed")}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <DoneOutlinedIcon
              sx={{
                background: "#fff",
                border: "1px solid #eff2f5",
                padding: "5px 5px",
                borderRadius: "50px",
                boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
                fontSize: "1.8rem",
                verticalAlign: "bottom",
              }}
            />
            <Typography sx={{fontSize:"1.2rem",ml:".5rem",fontWeight:"600"}}>Completed</Typography>
          </Stack>
        </Stack>
        <Stack
          className="canceled"
          sx={{
            padding: "1rem",
            backgroundColor: activeSection === "canceled" ? "#f0f0f0" : "white",
            cursor: "pointer",
            mb: 1,
            borderRadius: 1,
          }}
          onClick={() => handleSectionClick("canceled")}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <CloseOutlinedIcon
              sx={{
                background: "#fff",
                border: "1px solid #eff2f5",
                padding: "5px 5px",
                borderRadius: "50px",
                boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
                fontSize: "1.8rem",
                verticalAlign: "bottom",
              }}
            />
            <Typography sx={{fontSize:"1.2rem",ml:".5rem",fontWeight:"600"}}>Canceled</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack className="rightSection" sx={{ width: "70%", padding: 2 }}>
        {activeSection === "progress" && (
          <Card sx={{ backgroundColor: "white" }}>
            <CardContent>
              <Typography sx={{ textAlign: "center" }}>
                No Orders Found Progress
              </Typography>
            </CardContent>
          </Card>
        )}
        {activeSection === "completed" && (
          <Card sx={{ backgroundColor: "white" }}>
            <CardContent>
              <Typography sx={{ textAlign: "center" }}>
                No Orders Found Completed
              </Typography>
            </CardContent>
          </Card>
        )}
        {activeSection === "canceled" && (
          <Card sx={{ backgroundColor: "white" }}>
            <CardContent>
              <Typography sx={{ textAlign: "center" }}>
                No Orders Found Canceled
              </Typography>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Stack>
  );
}

export default MyOrders;

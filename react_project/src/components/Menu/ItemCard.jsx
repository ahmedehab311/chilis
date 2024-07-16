/* eslint-disable no-unused-vars */
import { Box, Card, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  RadioGroup,
  FormControlLabel,
  TextField,
  Radio,
} from "@mui/material";
import Counter from "./counter.jsx";
import axios from "axios";

function ItemCard({ selectedItem, handleBackClick }) {
  const [open, setOpen] = useState(false);
  const [itemData, setItemData] = useState(null);

  const handleItemClick = (item) => {
    setItemData(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  
  const APIURL = "https://myres.me/chilis/api/menu/2/1";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(APIURL);
        console.log(response.data.data.menu[0].sections[0].items);
        setMenuItems(response.data.data.menu[0].sections[0].items || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div style={{ color: "fff" }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {menuItems.map((item) => (
          <Card
            key={item.id}
            sx={{
              maxWidth: 230,
              p: 1,
              border: "2px solid #fff",
              background: "#000",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={() => handleItemClick(item)}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                mb: 2,
                textTransform: "uppercase",
                fontSize: "2.5rem",
              }}
            >
              {item.name_ar}
            </Typography>
            <img
              src={item.img}
              width="50px"
              style={{ display: "flex", margin: "0 auto" }}
              alt=""
            />
            <Typography variant="h4" sx={{ fontSize: "20px", my: 1 }}>
              {item.title2}
            </Typography>
            <Typography sx={{ fontSize: "18px", fontFamily: "Beiruti" }}>
              {item.category}
            </Typography>
            <Typography
              variant="body2"
              sx={{ my: 1, fontSize: "12px", color: "#777" }}
            >
              {item.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Typography sx={{ color: "#777" }}>{item.price}</Typography>
              <Typography sx={{ color: "#777" }}>{item.price2}</Typography>
            </Box>
          </Card>
        ))}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="item-dialog-title"
        aria-describedby="item-dialog-description"
        maxWidth="md"
        sx={{ border: "2px solid yallow" }}
      >
        <DialogContent
          sx={{ display: "flex", justifyContent: "center", mb: 2 }}
        >
          <Box>
            <img
              src={itemData?.img}
              alt={itemData?.title}
              width={300}
              height={200}
              className="imgDialog"
            />
          </Box>

          <DialogContentText id="item-dialog-description" sx={{ mx: 3 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <DialogTitle id="item-dialog-title">
                {itemData?.title}
              </DialogTitle>
              <Stack direction={"row"} alignItems={"center"}>
                <Counter />
                <span style={{ color: "#000", fontSize: "12px" }}>620 EGP</span>
              </Stack>
            </Stack>
            <div className="borderItem"></div>
            <Typography variant="body1" sx={{ mb: 2, color: "#000" }}>
              {itemData?.description}
            </Typography>
           
            <Stack>
              <FormControl component="fieldset">
                <Typography variant="h6" sx={{ color: "#000" }}>
                  Any special request?
                </Typography>
              </FormControl>

              <TextField
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                sx={{ mt: 0, mb: 1 }}
              />
              <Stack>
                <Typography variant="h6" sx={{ color: "#000", textAlign:"left" }}> 
                  Option
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#000", textTransform: "capitalize", textAlign:"left"}}
                >
                  Add one
                </Typography>
                <RadioGroup sx={{ display: "flex " }}>
                  <Stack direction={"row"}>
                    <FormControlLabel
                      sx={{ color: "#000" }}
                      value="chicken"
                      control={<Radio sx={{ color: "#000" }} />}
                      label="Chicken 510 EGP"
                    />
                    <FormControlLabel
                      value="beef"
                      control={<Radio sx={{ color: "#000" }} />}
                      label="Beef 650 EGP"
                      sx={{ color: "#000" }}
                    />
                    <FormControlLabel
                      value="combo"
                      control={<Radio sx={{ color: "#000" }} />}
                      label="Combo 610 EGP"
                      sx={{ color: "#000" }}
                    />
                  </Stack>
                </RadioGroup>
              </Stack>
            </Stack>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ItemCard;

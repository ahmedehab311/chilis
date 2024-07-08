import { Box, Card, Typography } from "@mui/material";
import { itemes } from "./itemes.js";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  TextField,
  Radio,
} from "@mui/material";

function ItemCard() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
        {itemes.map((item) => (
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
              {item.title}
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
        
        // fullWidth
        sx={{color:"#000",background:"#000"}}
      >
        <DialogTitle id="item-dialog-title">{selectedItem?.title}</DialogTitle>
        <DialogActions sx={{fontSize:"22px"}}>
          <Button onClick={handleClose} color="primary">
            X
          </Button>
        </DialogActions>
        <DialogContent sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Box >
            <img
              src={selectedItem?.img}
              alt={selectedItem?.title}
              width={300}
              height={400}
            />
          </Box>
          <DialogContentText id="item-dialog-description" sx={{mx:3}}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedItem?.description}
            </Typography>
            <FormControl component="fieldset">
              <Typography variant="h6">Option</Typography>
              <RadioGroup>
                <FormControlLabel
                  value="chicken"
                  control={<Radio />}
                  label="Chicken 510 EGP"
                />
                <FormControlLabel
                  value="beef"
                  control={<Radio />}
                  label="Beef 650 EGP"
                />
                <FormControlLabel
                  value="combo"
                  control={<Radio />}
                  label="Combo 610 EGP"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Any Special Request?"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
          </DialogContentText>
        </DialogContent>
  
      </Dialog>

    </div>
  );
}

export default ItemCard;
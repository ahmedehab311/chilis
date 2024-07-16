import {
    Dialog, DialogTitle,DialogContent,DialogContentText,FormControl, RadioGroup, FormControlLabel, TextField,Radio,} from "@mui/material";
   import Counter from "./counter.jsx";
import { Box, Card, Stack, Typography } from "@mui/material";

function DialogItemMenu({itemData,handleClose,title,description}) {
  return (
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
                any special Request?
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
     <Typography variant="h6" sx={{ color: "#000",textAlign:"left" }}> 
              Option
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#000", textTransform: "capitalize", textAlign:"left"}}
            >
              add one
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
  )
}

export default DialogItemMenu

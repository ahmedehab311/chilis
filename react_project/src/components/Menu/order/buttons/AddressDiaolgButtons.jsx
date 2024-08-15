// import { DialogActions, Button } from "@mui/material";
// function AddAddressDiaolg({ handleClose, handleAddAddress }) {
//   return (
//     <DialogActions>
//       <Button onClick={handleClose} color="error">
//         Cancel
//       </Button>
//       <Button onClick={handleAddAddress} color="error">
//         Add Address
//       </Button>
//     </DialogActions>
//   );
// }

// export default AddAddressDiaolg;
import { DialogActions, Button } from "@mui/material";
function AddAddressDiaolg({ handleClose, handleAddAddress }) {
  return (
    <DialogActions>
      <Button onClick={handleClose} color="error">
        Cancel
      </Button>
      <Button onClick={handleAddAddress} color="error">
        Add Address
      </Button>
    </DialogActions>
  );
}

export default AddAddressDiaolg;
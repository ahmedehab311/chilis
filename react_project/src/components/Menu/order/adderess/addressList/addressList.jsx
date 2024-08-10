import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function AddressList({ addressData, handleDeleteAddress }) {
  return (
    <List>
      {addressData.map((address) => (
        <ListItem key={address.id}>
          <ListItemText
            primary={address.street}
            secondary={`${address.deliveryCity}, ${address.deliveryArea}`}
          />
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleDeleteAddress(address.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}

export default AddressList;

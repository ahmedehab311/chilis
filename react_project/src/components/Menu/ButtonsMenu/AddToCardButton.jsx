import { Button, Stack } from "@mui/material";

function AddToCardButton({onAddToCart}) {
  const handleClick = () => {
    const itemDetails = {
      name: 'wings trio Original',
      price: '265 EGP',
      extras: [
        { name: 'Honey Chipotle', price: '265 EGP' },
      ]
    };
  
    console.log('handleClick called');
    onAddToCart(itemDetails); 
  };

  return (
    <Stack className="AddToCardBtn">
   <Button onClick={handleClick} variant="contained" color="error">
      Add to Cart
    </Button>
    </Stack>
  );
}

export default AddToCardButton;

export const useCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const cart = useState(() => storedCart);
  
    // Whenever the cart state changes, update local storage
    watch(cart, (newValue) => {
      localStorage.setItem('cart', JSON.stringify(newValue));
    });
  
    return cart;
  };
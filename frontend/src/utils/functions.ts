export const isTokenStored = () => {
  const exist = localStorage.getItem("token");
  if (exist == null) {
    return false;
  }
  return true;
};
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
export const setCartLocalStorage = (data: any) => {
  localStorage.setItem("cart", JSON.stringify(data));
};
export const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  }
  return null;
};
export const isCartStored = () => {
  const exist = localStorage.getItem("cart");
  if (exist == null) {
    return false;
  }
  return true;
};
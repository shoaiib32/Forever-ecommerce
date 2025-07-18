import AxiosAPI from "./AxiosApi";

export const addCartApi = async ({ itemId, size }) => {
  console.log(itemId, size);

  try {
    const response = await AxiosAPI.post("/api/cart/add", { itemId, size });
    console.log("addCartApi response:", response.data);
    return response.data; // return data directly for easier access
  } catch (error) {
    console.error("addCartApi error:", error);
    throw error;
  }
};

export const updateCartApi = async ({ itemId, size }) => {
  console.log(itemId, size);

  try {
    const response = await AxiosAPI.put("/api/cart/update", { itemId, size });
    console.log(response.data);
    return response.data; // return data directly for easier access
  } catch (error) {
    console.error("updateCartApi error:", error);
    throw error;
  }
};

export const getUserCart = async () => {
  const { data } = await AxiosAPI.get("/api/cart/get");
  console.log(data);
  
  return data;
};

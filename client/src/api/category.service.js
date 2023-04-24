import axios from "axios";

export const CategoryService = {
  getCategories: async () => {
    const response = await axios.get("http://localhost:3000/api/category");
    sessionStorage.setItem("categories", JSON.stringify(response.data));
    return response.data;
  },

  updateCategory: async (data) => {
    const response = await axios.put(
      `http://localhost:3000/api/stream/update/${data.streamKey}`,
      data
    );
    return response.data;
  },
};

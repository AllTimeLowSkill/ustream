import axios from "axios";

export const PageService = {
  getUserData: async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/user/info/${id}`
    );
    return response.data;
  },
};

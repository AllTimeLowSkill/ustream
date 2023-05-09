import axios from "axios";

export const PostService = {
  addPost: async (id, data) => {
    const response = await axios.post(
      `http://localhost:3000/api/post/create/${id}`,
      data
    );
    return response.data;
  },
};

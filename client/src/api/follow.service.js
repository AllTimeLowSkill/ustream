import axios from "axios";

export const FollowService = {
  addFollow: async (data) => {
    const response = await axios.post(
      "http://localhost:3000/api/follow/create",
      data
    );
    return response.data;
  },
};

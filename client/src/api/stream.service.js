import axios from "axios";

export const StreamService = {
  getStreams: async () => {
    const response = await axios.get("http://localhost:3000/api/stream");
    sessionStorage.setItem("streams", JSON.stringify(response.data));
    return response.data;
  },
};

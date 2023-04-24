import axios from "axios";

export const ProfileService = {
  updateAvatar: async (data) => {
    let formData = new FormData();
    const { avatar } = data;
    formData.append("avatar", avatar[0]);

    const response = await axios.put(
      `http://localhost:3000/api/profile/update/avatar/${data.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    let local = JSON.parse(localStorage.getItem("user"));
    local.profile = response.data;
    localStorage.setItem("user", JSON.stringify(local));

    return response.data;
  },
  updateProfile: async (id, data) => {
    const response = await axios.put(
      `http://localhost:3000/api/profile/update/${id}`,
      data
    );

    let local = JSON.parse(localStorage.getItem("user"));
    local.profile = response.data;
    localStorage.setItem("user", JSON.stringify(local));

    return response.data;
  },
  getProfile: async (id) => {
    const response = await axios.get(`http://localhost:3000/api/profile/${id}`);
    return response.data;
  },
};

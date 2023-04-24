import axios from "axios";

export const AuthService = {
  signIn: async (data) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/signin",
      data
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  },

  signUp: async (data) => {
    let formData = new FormData();
    const { avatar } = data;
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", avatar[0]);

    const response = await axios.post(
      "http://localhost:3000/api/auth/signup",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  },
};

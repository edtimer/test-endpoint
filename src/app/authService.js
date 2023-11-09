import { assert,http } from "../../src/utils/index";
import { BASE_URL } from "../../src/utils/axios";


const resetConfirmPassBYEmail = async (userData) =>{
  const res = await http.post(`${BASE_URL}/users/reset_password_confirm/`, userData
  );

  return assert(
    res,
    res.data,
    "Error while sending User info. Please try again later.",
    res
  );
}

const login = async (userData) => {
    const res = await http.post(`${BASE_URL}/users/auth/jwt/create/`, userData);

    if (res.data) {
      // Extract the tokens from the response
      const { refresh, access } = res.data;

      // Store the tokens in localStorage
      localStorage.setItem("refreshToken", JSON.stringify(refresh));
      localStorage.setItem("accessToken", JSON.stringify(access));
    }

    return res.data;
 
};

const loginVarify = async (userData) => {
  const res = await http.post(`${BASE_URL}/users/auth/jwt/verify/`, userData);

  if (res.data) {
    // Extract the tokens from the response
    const { refresh, access } = res.data;
  }

  return res.data;

};

const logout = async () => {
    localStorage.removeItem("accessToken");
  };
  
  
  const forgotPassword = async (userData) => {
    const res = await http.post(
      `${BASE_URL}/users/reset_password/`,
      userData
    );
  
    return assert(
      res,
      res.data,
      "Error while changing password. Please try again later.",
      res
    );
  };  
  const changePassword = async (userData) => {
    const res = await http.post(
      `${BASE_URL}/users/set_password/`,
      userData
    );
    return assert(
      res,
      res.data,
      "Error while changing password. Please try again later.",
      res
    );
  }
  const registerNewUserPassword = async (userData) =>{
    const res = await http.post(`${BASE_URL}/users/new_user_password/`, userData
    // { "uid": userData.uidb64,  "token": userData.token,  "new_password": userData.info}
    );
    
    return assert(
      res,
      res.data,
      "Error while sending User info. Please try again later.",
      res
    );
  }

  const authService = {
    resetConfirmPassBYEmail,
    login,
    logout,
    forgotPassword,
    changePassword,
    registerNewUserPassword,
    loginVarify
  };
  
  export default authService;
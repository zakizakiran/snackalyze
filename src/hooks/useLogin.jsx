import { useEffect, useState } from "react";
import { isTokenExpired, refreshToken } from "../api/helpers/api";
import { jwtDecode } from "jwt-decode";

export const useLogin = (token) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const handleToken = async () => {
      if (token && !isTokenExpired(token)) {
        try {
          const decoded = jwtDecode(token);
          setUsername(decoded.username); // Ambil username dari token
        } catch (error) {
          console.error("Error decoding token:", error);
          setUsername(null);
        }
      } else if (token && isTokenExpired(token)) {
        console.warn("Token expired, attempting to refresh...");
        // localStorage.removeItem("accessToken"); // Hapus token lama
        alert("Your session has expired. Please log in again.");
        try {
          const newTokenResponse = await refreshToken(token); // Panggil API refresh token
          console.log("New token response:", newTokenResponse);
          if (newTokenResponse.accessToken) {
            localStorage.setItem("accessToken", newTokenResponse.accessToken);
            const decoded = jwtDecode(newTokenResponse.accessToken);
            setUsername(decoded.username);
          } else {
            setUsername(null); // Jika refresh gagal, hapus username
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
          setUsername(null);
        }
      } else {
        setUsername(null); // Jika token tidak ada, hapus username
      }
    };

    handleToken();
  }, [token]); // Memantau perubahan token

  return username;
};

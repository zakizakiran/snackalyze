import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired, refreshAccessToken } from "../api/helpers/api";

export const useLogin = (token) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const handleToken = async () => {
      try {
        if (token && !isTokenExpired(token)) {
          // Decode token jika belum expired
          const decoded = jwtDecode(token);
          setUsername(decoded.username);
        } else if (token && isTokenExpired(token)) {
          console.warn("Token expired, attempting to refresh...");
          const newTokenResponse = await refreshAccessToken(); // Panggil fungsi refresh token
          if (newTokenResponse.status === 200) {
            localStorage.setItem(
              "accessToken",
              newTokenResponse.response.payload?.accessToken
            );
            const decoded = jwtDecode(
              newTokenResponse.response.payload?.accessToken
            );
            setUsername(decoded.username);
          } else {
            // Token refresh gagal, arahkan ke login
            setUsername(null);
            window.location.href = "/login";
          }
        }
      } catch (error) {
        console.error("Error handling token:", error);
        setUsername(null);
        window.location.href = "/login"; // Redirect ke login jika ada error
      }
    };

    handleToken();
  }, [token]);

  return username;
};

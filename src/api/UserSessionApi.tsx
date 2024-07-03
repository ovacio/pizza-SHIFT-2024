import { useState } from "react";
import axios from "axios";
import { apiUrlSession } from "@/constants/constants";
import { User, SessionResponse } from "@/constants/interfaces";

const useSessionUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getSessionUser = async (token: string | null) => {
    setLoading(true);
    try {
      const response = await axios.get<SessionResponse>(apiUrlSession, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data.user;
      } else {
        console.error("Failed to fetch user data", response.data.reason);
        setUser(null);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, getSessionUser };
};

export default useSessionUser;

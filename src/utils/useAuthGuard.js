import React, { useEffect } from "react";
import {
  getAuthenticatedUser,
  getCsrfToken,
  getUserlogedin,
  getUserLogedOut,
} from "@/services/authService";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const useAuthGuard = ({ middleware, redirectIfAuthenticated }) => {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/v1/auth/me", () => getAuthenticatedUser());

  const login = async ({ onError, onSuccess, props }) => {
    onError();
    await csrf();
    try {
      await getUserlogedin(props);
      mutate();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const errors = err.response?.data;
      onError(errors);
    }
    // getUserlogedin(props)
    //   .then(() => mutate())
    //   .catch((err) => {
    //     const errors = err.response?.data;
    //     onError(errors);
    //   });
  };

  const csrf = async () => {
    await getCsrfToken();
  };

  const logout = async () => {
    if (!error) {
      await getUserLogedOut().then(() => mutate());
    }
    window.location.pathname = "/";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }

    if (middleware === "auth" && error) {
      logout();
    }
  }, [user, error]);

  return {
    user,
    login,
    logout,
    mutate,
  };
};

export default useAuthGuard;

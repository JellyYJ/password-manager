import { createContext, useContext, useState, useEffect } from "react";
import { deletePassword, getPasswords, updatePassword } from "../../api/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordContext = createContext();

export const usePasswords = () => useContext(PasswordContext);

export const PasswordProvider = ({ children }) => {
  const [passwordsList, setPasswordsList] = useState([]);

  const fetchPasswords = async () => {
    try {
      const response = await getPasswords();
      // setPasswordsList(response);
      if (response) {
        const passwordsWithData = response.map((password) => ({
          ...password,
          showPassword: false,
        }));
        setPasswordsList(passwordsWithData);
      }
    } catch (err) {
      console.error("Error fetching passwords:", err);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const toggleShowPassword = (id) => {
    const updatedPasswordsList = passwordsList.map((password) =>
      password.id === id
        ? { ...password, showPassword: !password.showPassword }
        : password
    );
    setPasswordsList(updatedPasswordsList);
  };

  const handleCopy = async (text, successMessage) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
    } catch (error) {
      console.error(`Failed to copy ${text}: `, error);
      toast.error(`Failed to copy ${text}!`);
    }
  };

  const handleUpdate = async (id, updatedPassword) => {
    try {
      const response = await updatePassword(id, updatedPassword);
      if (response.status === 200) {
        toast.success("Password updated successfully!");
      }
      fetchPasswords();
    } catch (err) {
      console.error("Error updating password:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePassword(id);
      fetchPasswords();
      toast.success("Password deleted successfully!");
    } catch (error) {
      console.error("Failed to delete password: ", error);
      toast.error("Failed to delete password!");
    }
  };

  return (
    <PasswordContext.Provider
      value={{
        passwordsList,
        toggleShowPassword,
        handleCopy,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
      <ToastContainer />
    </PasswordContext.Provider>
  );
};

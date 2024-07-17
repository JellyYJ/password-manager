import React, { useEffect, useState } from "react";
import "./Table.css";
import { getPasswords } from "./api";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Table() {
  const [passwordsList, setPasswordsList] = useState([]);

  useEffect(() => {
    async function fetchPasswords() {
      try {
        const response = await getPasswords();
        console.log(response);
        if (response) {
          const passwordsWithData = response.map((password) => ({
            ...password,
            showPassword: false,
          }));
          setPasswordsList(passwordsWithData);
        }
      } catch (error) {
        console.error("Error retrieving passwords: ", error);
      }
    }

    fetchPasswords();
  }, []);

  const toggleShowPassword = (index) => {
    const updatedPasswordsList = [...passwordsList];
    updatedPasswordsList[index].showPassword =
      !updatedPasswordsList[index].showPassword;
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

  if (passwordsList.length === 0) return null;

  return (
    <div className="table-container">
      <div className="header">Website</div>
      <div className="header">Username</div>
      <div className="header">Password</div>

      {passwordsList.map((password, index) => (
        <div key={index} className="password-row">
          <div>{password.website}</div>
          <div
            className="username"
            onClick={() =>
              handleCopy(password.username, "Username copied to clipboard!")
            }
          >
            {password.username}
          </div>
          <div className="password">
            {password.showPassword ? (
              <span
                onClick={() =>
                  handleCopy(password.password, "Password copied to clipboard!")
                }
              >
                {password.password}
              </span>
            ) : (
              <span
                onClick={() =>
                  handleCopy(password.password, "Password copied to clipboard!")
                }
              >
                ••••••••
              </span>
            )}
            <button onClick={() => toggleShowPassword(index)}>
              {password.showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default Table;

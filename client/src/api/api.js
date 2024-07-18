import axios from "axios";
import { server } from "../config";

export async function decryptPassword(pwd) {
  const { password, iv, key } = pwd;
  try {
    const response = await axios.post(`${server}/decryptpassword`, {
      password,
      iv,
      key,
    });
    return response.data;
  } catch (err) {
    console.error("Error decrypting password: ", err);
    return null;
  }
}

export async function addPassword(formData) {
  // const { password, username, website } = formData;
  try {
    const response = await axios.post(`${server}/addpassword`, formData);
    return response;
  } catch (err) {
    console.error("Error adding new password:", err);
    return null;
  }
}

// export async function getPasswords() {
//   try {
//     const response = await axios.get(`${server}/getpasswords`);
//     return response;
//   } catch (err) {
//     console.error("Error retriving passwords: ", err);
//     return null;
//   }
// }

export async function getPasswords() {
  try {
    const response = await axios.get(`${server}/getpasswords`);
    const encryptedPasswords = response.data;

    // Decrypt each password
    const decryptedPasswords = await Promise.all(
      encryptedPasswords.map(async (pwd) => {
        const decryptedPassword = await decryptPassword(pwd);
        return {
          ...pwd,
          password: decryptedPassword,
        };
      })
    );

    return decryptedPasswords;
  } catch (err) {
    console.error("Error retrieving passwords: ", err);
    return null;
  }
}

export async function updatePassword(id, password) {
  try {
    // const { password, username, website } = passwordData;
    const response = await axios.put(
      `${server}/updatePassword/${id}`,
      password
    );
    return response;
  } catch (err) {
    console.error("Error updating the password: ", err);
    return null;
  }
}

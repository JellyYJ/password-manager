import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Row.css";
import { useState } from "react";

export default function Row({
  password,
  index,
  handleCopy,
  toggleShowPassword,
  handleUpdate,
  isEditing,
  handleEdit,
}) {
  const [editedPassword, setEditedPassword] = useState({ ...password });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPassword({ ...editedPassword, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(index, editedPassword);
  };

  return (
    <div className="row">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            value={editedPassword.website}
            onChange={handleChange}
          />
        </form>
      ) : (
        <span>{password.website}</span>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={editedPassword.username}
            onChange={handleChange}
          />
        </form>
      ) : (
        <span
          className="username"
          onClick={() =>
            handleCopy(password.username, "Username copied to clipboard!")
          }
        >
          {password.username}
        </span>
      )}

      <div className="password">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="password"
              value={editedPassword.password}
              onChange={handleChange}
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <>
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
            <button onClick={() => handleEdit(index)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
}

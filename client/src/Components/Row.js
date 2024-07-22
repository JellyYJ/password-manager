import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Row.css";

export default function Row({
  password,
  handleCopy,
  toggleShowPassword,
  handleUpdate,
  handleDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData(password);
    setEditingId(password.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(editingId, editData);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditData(password);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div className="row">
      {isEditing ? (
        <form>
          <input
            type="text"
            name="website"
            value={editData.website}
            onChange={handleChange}
          />
        </form>
      ) : (
        <span>{password.website}</span>
      )}

      {isEditing ? (
        <form>
          <input
            type="text"
            name="username"
            value={editData.username}
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
          <form>
            <input
              type="text"
              name="password"
              value={editData.password}
              onChange={handleChange}
            />
            <button type="submit" onClick={handleSubmit}>
              Save
            </button>
            <button onClick={handleCancelClick}>Cancel</button>
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
            <button onClick={() => toggleShowPassword(password.id)}>
              {password.showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => handleDelete(password.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

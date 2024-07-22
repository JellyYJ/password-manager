import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ".././Row.css";

export default function Row({
  password,
  index,
  handleCopy,
  toggleShowPassword,
  handleUpdate,
  isEditing,
  onEdit,
  editData,
  setEditData,
  handleDelete,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(index, editData);
  };

  return (
    <div className="row">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
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
        <form onSubmit={handleSubmit}>
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="password"
              value={editData.password}
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
            <button onClick={() => onEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(password.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

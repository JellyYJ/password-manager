import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Row.css";

const Row = ({ password, index, handleCopy, toggleShowPassword }) => {
  return (
    <div className="row">
      <span>{password.website}</span>
      <span
        className="username"
        onClick={() =>
          handleCopy(password.username, "Username copied to clipboard!")
        }
      >
        {password.username}
      </span>
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
  );
};

export default Row;

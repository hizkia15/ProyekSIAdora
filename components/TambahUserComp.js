import {
  faCheck,
  faClipboardUser,
  faLock,
  faSpinner,
  faTimes,
  faUser,
  faUserTie,
  faUsersRectangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function Usernamereducer(state, action) {
  if (action.type === "loading") {
    return {
      hasil: (
        <p className="help is-info" style={{ fontSize: "15px" }}>
          loading
        </p>
      ),
      warnaTextbox: "input is-info",
      icon: <FontAwesomeIcon icon={faSpinner} spin color="blue" />,
    };
  } else if (action.type === "available") {
    return {
      hasil: (
        <p className="help is-success" style={{ fontSize: "15px" }}>
          Username tersedia
        </p>
      ),
      warnaTextbox: "input is-success",
      icon: <FontAwesomeIcon icon={faCheck} color="green" />,
    };
  } else if (action.type === "not available") {
    return {
      hasil: (
        <p className="help is-danger" style={{ fontSize: "15px" }}>
          Username tidak tersedia
        </p>
      ),
      warnaTextbox: "input is-danger",
      icon: <FontAwesomeIcon icon={faTimes} color="red" />,
    };
  } else if (action.type === "not allowed") {
    return {
      hasil: (
        <p className="help is-danger" style={{ fontSize: "15px" }}>
          Username tidak memenuhi ketentuan
        </p>
      ),
      warnaTextbox: "input is-danger",
      icon: <FontAwesomeIcon icon={faTimes} color="red" />,
    };
  } else if (action.type === "error") {
    return {
      hasil: (
        <p className="help is-danger" style={{ fontSize: "15px" }}>
          Terjadi masalah saat mengakses database
        </p>
      ),
      warnaTextbox: "input is-danger",
      icon: <FontAwesomeIcon icon={faTimes} color="red" />,
    };
  } else if (action.type === "default") {
    return userinitValue;
  }
}

export const userinitValue = {
  hasil: undefined,
  warnaTextbox: "input",
  icon: undefined,
};

export const passinitValue = {
  warnaTextbox: "input",
  hasil: undefined,
};

export const passwordReducer = (state, action) => {
  if (action.type === "boleh") {
    return {
      warnaTextbox: "input is-success",
      hasil: (
        <p className="help is-success" style={{ fontSize: "15px" }}>
          Password sudah sesuai ketentuan!
        </p>
      ),
    };
  } else if (action.type === "tidak boleh") {
    return {
      warnaTextbox: "input is-danger",
      hasil: (
        <p className="help is-danger" style={{ fontSize: "15px" }}>
          Password tidak sesuai ketentuan!
        </p>
      ),
    };
  } else if (action.type === "default") {
    return passinitValue;
  }
};

export function Username({ className, value, onChange, icon, hasil }) {
  return (
    <div className="field">
      <label className="label">Username</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className={className}
          type="text"
          placeholder="Username"
          value={value}
          onChange={onChange}
          maxLength="15"
        />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <span className="icon is-small is-right">{icon}</span>
      </div>
      {hasil}
    </div>
  );
}

export function Password({
  className,
  type,
  value,
  onChange,
  icon,
  hasil,
  label = "Password",
  disabled = false,
}) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className={className}
          type={type}
          placeholder="Password"
          value={value}
          onChange={onChange}
          maxLength="8"
          minLength="8"
          disabled={disabled}
        />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faLock} />
        </span>
        <span className="icon is-small is-right">{icon}</span>
      </div>
      {hasil}
    </div>
  );
}

export function FieldButton({ nama, disabled }) {
  return (
    <div className="field">
      <div className="control">
        <button className="button is-link" disabled={disabled}>
          {nama}
        </button>
      </div>
    </div>
  );
}

export function Role({ onChange, value }) {
  return (
    <div className="field control has-icons-left">
      <label className="label">Role</label>

      <div className="select">
        <select onChange={onChange} value={value}>
          <option value="pemilik">PEMILIK</option>
          <option value="kasir">KASIR</option>
          <option value="ttk">TTK</option>
        </select>
        <span className="icon is-left">
          <FontAwesomeIcon icon={faClipboardUser} />
        </span>
      </div>
    </div>
  );
}

export function Modal({ children, className = "" }) {
  return (
    <div className={`modal ${className}`}>
      <div className="modal-background" />
      <div className="modal-content">{children}</div>
    </div>
  );
}

export function IsiModalSuccess({ pesan, children }) {
  return (
    <article className="message">
      <div
        className="message-body"
        style={{ fontSize: "25px", textAlign: "center", color: "green" }}
      >
        {pesan}
      </div>
      <div style={{ textAlign: "center", padding: "10px" }}>{children}</div>
    </article>
  );
}

export function IsiModalFailed({ pesan, children }) {
  return (
    <article className="message">
      <div
        className="message-body"
        style={{ fontSize: "25px", textAlign: "center", color: "red" }}
      >
        {pesan}
      </div>
      <div style={{ textAlign: "center", padding: "10px" }}>{children}</div>
    </article>
  );
}

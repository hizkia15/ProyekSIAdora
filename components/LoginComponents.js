export function Pembungkus({ children }) {
  return (
    <section className="container">
      <div className="columns is-centered">
        <div className="column is-one-fifth">{children}</div>
      </div>
    </section>
  );
}

export function Gambar() {
  return <img src="/image/Logo ADORA.jpg" alt="Logo Apotek Adora" />;
}

export function Field({ children }) {
  return (
    <div className="field">
      <div className="control has-icons-left">{children}</div>
    </div>
  );
}

export function Icon({ kelas }) {
  return (
    <span className="icon is-small is-left">
      <i className={`fas ${kelas}`}></i>
    </span>
  );
}

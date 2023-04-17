function NavBar() {
  return (
    <>
      <style>
        {`
          .nav-link:hover {
            color: #3CB371 !important;
          }
        `}
      </style>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <a className="navbar-brand" href="#">Bad Bank</a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/">Create Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/login/">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/deposit/">Deposit</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/withdraw/">Withdraw</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/alldata/">AllData</a>
            </li>
          </ul>
      </nav>
    </>
  );
}

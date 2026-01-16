import { NavLink } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
        Home
      </NavLink>
      <NavLink to="/clients/new" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
        + Add Client
      </NavLink>
    </nav>
  );
}
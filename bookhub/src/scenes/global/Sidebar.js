const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h3>BookHub</h3>
      </div>
      <ul className="options">
        <li href="/">Books</li>
        <li href="/authors">Authors</li>
        <li to={"/statistics"}>Statistics</li>
      </ul>
    </div>
  );
};
export default Sidebar;

const Header = ({ title }) => {
  return (
    <div className="header p-4">
      <h1 className="text-2xl text-white">{title}</h1>
    </div>
  );
};

Header.defaultProps = {
  title: "Default heading"
};

export default Header;

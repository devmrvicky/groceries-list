const Footer = ({ count }) => {
  return (
    <div className="footer p-2 mt-auto text-center">
      <h3 className="text-xl text-white">
        {count} List {count === 1 ? "item" : "items"}
      </h3>
    </div>
  );
};

export default Footer;

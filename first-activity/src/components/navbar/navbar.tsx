const Navbar = () => {
  const navItems = ["Home", "Products", "About", "Services", "Contact"]
 
  return (
    <div className="hidden md:flex md:items-center md:justify-center md:gap-8 w-full">
      {navItems.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="text-base transition-colors duration-200 hover:text-pink-400 font-inter"
        >
          {item}
        </a>
      ))}
    </div>
  );
};

export default Navbar;

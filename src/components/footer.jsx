const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <p className="text-center">&copy; {currentYear} My Excel File Reader App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

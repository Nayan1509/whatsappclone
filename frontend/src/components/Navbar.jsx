import { FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full h-10 px-4 py-2 bg-stone-100 flex items-center">
      <FaWhatsapp className="text-green-600 text-2xl md:text-3xl mr-2" />
      <h1 className="text-black text-sm ">
        WhatsApp
      </h1>
    </nav>
  );
};

export default Navbar;

import { Menu, X, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed top-0 w-full z-50 glass px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="bg-indigo-500/20 p-2 rounded-xl">
            <BookOpen className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            UniShowcase
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#projects" className="text-sm text-zinc-400 hover:text-white transition-colors">Browse Projects</a>
          <a href="#recruiters" className="text-sm text-zinc-400 hover:text-white transition-colors">For Recruiters</a>
          <a href="#students" className="text-sm text-zinc-400 hover:text-white transition-colors">Top Students</a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Log in
          </Link>
          <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            Register / Join
          </Link>
        </div>

        <button 
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full glass border-t border-zinc-800/50 py-4 px-6 flex flex-col space-y-4"
        >
          <a href="#projects" className="text-sm text-zinc-400">Browse Projects</a>
          <a href="#recruiters" className="text-sm text-zinc-400">For Recruiters</a>
          <a href="#students" className="text-sm text-zinc-400">Top Students</a>
          <hr className="border-zinc-800" />
          <Link to="/login" className="text-sm font-medium text-zinc-300 text-left">Log in</Link>
          <Link to="/register" className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center">
            Register / Join
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

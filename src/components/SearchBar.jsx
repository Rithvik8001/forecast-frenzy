import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { getCitySuggestions } from "../utils/api";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length > 2) {
        try {
          const cityList = await getCitySuggestions(input);
          setSuggestions(cityList);
        } catch (err) {
          console.error("Error fetching suggestions:", err);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [input]);

  const handleSearch = () => {
    if (input) {
      onSearch(input);
      setInput("");
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full shadow-inner">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search location..."
          className="w-full px-4 py-2 rounded-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none text-sm sm:text-base"
        />
        <button
          onClick={handleSearch}
          className="px-3 py-2 text-blue-500 hover:text-blue-600 focus:outline-none transition-colors duration-300"
        >
          <Search size={20} />
        </button>
      </div>
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg border border-gray-200/40 dark:border-gray-700/40 max-h-48 sm:max-h-64 overflow-y-auto"
          >
            <div className="overflow-y-auto custom-scrollbar">
              {suggestions.map((city, index) => (
                <motion.button
                  key={index}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200 text-sm sm:text-base"
                  onClick={() => {
                    onSearch(city);
                    setInput("");
                    setSuggestions([]);
                  }}
                >
                  {city}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

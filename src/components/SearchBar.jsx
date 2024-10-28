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
      <div className="flex items-center bg-[#E8ECEF] dark:bg-[#2D2D2F] rounded-full shadow-inner">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search location..."
          className="w-full px-5 py-3 rounded-full bg-transparent text-[#1C1C1E] dark:text-[#F2F2F7] placeholder-gray-500 focus:outline-none text-base"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 text-[#007AFF] hover:text-[#0051A8] focus:outline-none transition-colors duration-300"
        >
          <Search size={24} />
        </button>
      </div>
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-[#FFFFFF]/90 dark:bg-[#242426]/90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg border border-[#D1D1D6]/40 dark:border-[#2D2D2F]/40 max-h-64 overflow-y-auto"
          >
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {suggestions.map((city, index) => (
                <motion.button
                  key={index}
                  className="w-full px-5 py-3 text-left hover:bg-[#E8ECEF] dark:hover:bg-[#343537] text-[#1C1C1E] dark:text-[#F2F2F7] transition-colors duration-200"
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

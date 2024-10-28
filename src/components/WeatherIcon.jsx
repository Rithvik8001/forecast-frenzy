import React from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
} from "lucide-react";

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function WeatherIcon({ weatherCondition, temperature }) {
  const getIcon = () => {
    switch (weatherCondition.toLowerCase()) {
      case "clear":
        return <Sun size={120} />;
      case "clouds":
        return <Cloud size={120} />;
      case "rain":
        return <CloudRain size={120} />;
      case "snow":
        return <CloudSnow size={120} />;
      case "thunderstorm":
        return <CloudLightning size={120} />;
      case "mist":
      case "fog":
        return <CloudFog size={120} />;
      default:
        return <Cloud size={120} />;
    }
  };

  const getColor = () => {
    if (temperature < 0) return "#007AFF";
    if (temperature < 10) return "#5AC8FA";
    if (temperature < 20) return "#FF9500";
    if (temperature < 30) return "#FF3B30";
    return "#FF2D55";
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center mb-8"
      initial="hidden"
      animate="visible"
      variants={iconVariants}
    >
      <motion.div
        style={{ color: getColor() }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {getIcon()}
      </motion.div>
      <motion.p
        className="mt-4 text-3xl font-semibold text-[#1C1C1E] dark:text-[#F2F2F7]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {weatherCondition}
      </motion.p>
    </motion.div>
  );
}

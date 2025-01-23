import React, { useEffect, useState } from "react";
import moment from "moment";

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <footer className="bg-gray-800 text-white text-center py-4 w-full fixed bottom-0 left-0 z-50">
      <div className="flex justify-center items-center space-x-2">
        <span className="text-xl font-medium">{time}</span>
      </div>
    </footer>
  );
};

export default Footer;

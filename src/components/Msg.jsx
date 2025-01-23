import  { useEffect } from "react";

const Msg = ({ message, type, onClose, duration = 3000 }) => {
  const messageStyles = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`max-w-lg mx-auto mt-4 p-4 rounded-md border ${messageStyles[type]} shadow-lg`}
    >
      <div className="flex items-center">
        <span
          className={`inline-block w-6 h-6 mr-3 text-xl ${
            type === "success"
              ? "text-green-500"
              : type === "error"
              ? "text-red-500"
              : "text-blue-500"
          }`}
        >
          {type === "success" && "✔"}
          {type === "error" && "❌"}
          {type === "info" && "ℹ"}
        </span>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Msg;

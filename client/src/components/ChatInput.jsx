import React, { useState } from "react";

const ChatInput = ({ sendMessage }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ sender: "user", message: value });
    setValue("");
  };
  return (
    <div className="mt-2 items-center gap-2 flex">
      <textarea
        onKeyDown={(e) => {
          e.keyCode === 13 && e.shiftKey === false && handleSubmit();
        }}
        rows={1}
        type="text"
        placeholder="Enter Service you want"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-gray-50 border overflow-hidden border-gray-300 text-gray-900 text-md rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <div className="flex">
        <button
          onClick={handleSubmit}
          className="h-10 px-4 py-2 p-6 flex items-center text-lg rounded-full font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;

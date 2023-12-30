import React from "react";
import { AiFillCaretLeft } from "react-icons/ai";

const ChatBody = ({ chat }) => {
  return (
    <div className="h-[90%] overflow-auto">
      <div className="w-full flex">
        <div className="relative w-16 h-14">
          <img
            className="rounded-full w-full h-full"
            src="/circuit.png"
            alt=""
          />
        </div>
        <div className="flex p-0 container">
          <AiFillCaretLeft className="fill-gray-700 mt-6" />
          <div className="message-blue dark:bg-gray-700 dark:border-gray-600  relative mt-5 mb-10 p-1 pl-2 w-48 h-12 text-left font-normal text-sm border rounded-lg">
            <p className="message-content dark:text-white p-0 m-0">
              Bole toh, Kya Mangta tereko!
            </p>
          </div>
        </div>
      </div>
      {chat.map((message, i) => {
        return (
          <div key={i} className="w-full flex">
            {message.sender === "ai" ? (
              <>
                <div className="relative w-16 h-14">
                  <img
                    className="rounded-full w-full h-full"
                    src="/circuit.png"
                    alt=""
                  />
                </div>
                <div className="flex p-0 container">
                  <AiFillCaretLeft className="fill-gray-700 mt-6" />
                  <div className="message-blue relative mt-5 mb-10 p-1 pl-2 w-48 h-fit text-left font-normal text-sm border dark:bg-gray-700 dark:border-gray-600 rounded-lg">
                    <p className="message-content p-0 m-0">
                      {message.message}
                      <span className="text-blue-600 ml-1">
                        {message.link && message.link}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full flex flex-row justify-evenly p-0">
                  <div className="message-blue relative mt-5 ml-auto mb-10 p-1 pl-2 w-48 h-fit text-left font-normal text-sm  dark:bg-gray-700 dark:border-gray-600 rounded-lg">
                    <p className="message-content p-0 m-0">{message.message}</p>
                  </div>
                  <AiFillCaretLeft className="fill-gray-700 mt-6" />
                </div>
                <div className="relative w-16 h-14">
                  <img
                    className="rounded-full w-full h-full"
                    src="/user.png"
                    alt=""
                  />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatBody;

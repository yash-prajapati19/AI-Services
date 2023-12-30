import TypewriterComponent from "typewriter-effect";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import ChatInput from "../components/ChatInput";
import ChatBody from "../components/ChatBody";
import { fetchResponse } from "../api";
import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const AiBots = [
  {
    name: "AI-Ayurvedic",
    avatar: "J",
    title: "",
    description:
      "Get expert Ayurvedic treatment recommendations for your health concerns, tailored to your unique needs, all in a natural and holistic way",
    link: "http://localhost:8502/",
  },
  {
    name: "AI-Lawyer",
    avatar: "A",
    title: "",
    description:
      "Get instant access to legal knowledge and tailored solutions for your legal dilemmas, simplifying the complexities of the legal world.",
    link: "http://localhost:8504/",
  },
  {
    name: "EduSolver-AI",
    avatar: "M",
    title: "",
    description:
      "From Homework help to academic guidance, EduSolverAI is your go-to companion for mastering your educational journey.",
    link: "http://localhost:8501/",
  },
  {
    name: "JobMatch-AI",
    avatar: "M",
    title: "",
    description:
      "Discover the perfect job based on your qualifications and get personalized skill recommendations to reach your career goals with confidence.",
    link: "http://localhost:8503/",
  },
];

function Home() {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (window.performance) {
      if (performance.getEntriesByType("navigation")[0].type === "reload") {
        localStorage.clear();
      }
    }
  }, []);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) => {
      const message = data.message.replace(/^\n\n/, "");
      const link = data.link ? (
        <Link to={data.link}>
          <button className="h-6 w-full mt-2 px-4 py-2 p-6 flex items-center justify-center text-lg rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0">
            Go!
          </button>
        </Link>
      ) : null;
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: message, link: link },
      ]);
    },
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };

  return (
    <div className="bg-[url('/gradient.png')]  bg-cover">
      {/* <div className="gradient-01 z-0 absolute"></div>
      <div className="gradient-02 z-0 absolute"></div> */}
      <nav className="p-4 pb-0 bg-transparent flex">
        <div className="relative w-52 pb-3 mr-4">
          <img alt="Logo" src="/logo.png" />
        </div>
        {/* <h1 className="text-2xl font-bold text-black">EasyStand.AI</h1> */}
      </nav>
      <div className="text-white flex flex-col items-center backdrop-blur-sm	font-bold pb-10 text-center space-y-5">
        <div className="text-7xl space-y-5 font-extrabold">
          <h1 className="text-black">The Best AI Tool for</h1>
          <div className="text-transparent text-6xl pb-4 bg-clip-text bg-gradient-to-r from-blue-700 to-pink-600">
            <TypewriterComponent
              options={{
                strings: [
                  "Doctor-Service",
                  "Lawyer-Service",
                  "Job-Service",
                  "Real-Estate-Service",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <div className="text-sm font-semibold md:text-xl text-gray-600">
          What Service You want? Talk to Circuit
        </div>
        <div className="w-2/3 border-solid border-black border-1 backdrop-blur-sm bg-black/30 p-4 shadow-2xl shadow-slate-800 rounded-2xl flex flex-col h-[250px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <ChatBody chat={chat} />
          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>
      <div className=" px-10 pb-20">
        <h2 className="text-center text-4xl text-white font-bold mb-10">
          AI-BOTS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {AiBots.map((item) => (
            <Link key={item.description} to={item.link}>
              <div className="bg-[#192339] rounded-xl p-4 border-none text-white">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex justify-center items-center gap-x-2">
                    <div>
                      <p className="text-lg font-bold">{item.name}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex text-gray-300 text-center tex justify-center items-center pt-4 px-0">
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <BsFillArrowRightCircleFill className="fill-white w-10 h-10" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

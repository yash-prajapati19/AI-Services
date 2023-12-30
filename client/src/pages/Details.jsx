import React, { useEffect, useState } from "react";
import About from "../components/About";
import SidePanel from "../components/SidePanel";

export function Deatils(props) {
  const [tab, setTab] = useState("about");

  useEffect(() => {
    // Create script element
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src =
      "https://mediafiles.botpress.cloud/2ed7edc5-545a-4d2a-84de-0d47874dc157/webchat/config.js";
    script2.defer = true;

    // Append script element to document head
    document.head.appendChild(script1);
    document.head.appendChild(script2);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  const detailData = JSON.parse(localStorage.getItem("detailData"));

  return (
    <>
      <div className="p-10">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex gap-5 items-center">
              <figure className="max-w-[200px]  w-30 h-30 max-h-[200px]">
                <img
                  src={detailData.Avatar}
                  alt=""
                  className="rounded-2xl w-full"
                />
              </figure>
              <div className="flex flex-col gap-2">
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-[600]">
                  {detailData.Characteristics}
                </span>
                <h3 className="text-headingColor text-[22px] leading-[36px] font-bold">
                  {detailData.Name}
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span className="flex text-black items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[600] text-headingColor">
                    <img src="/Star.png" alt="" /> {detailData.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <div>
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" && "border-b border-solid border-[#0067FF]"
                  }  p-2 mr-5 px-5  text-headingColor font-semibold text-[16px] leading-7  `}
                >
                  About
                </button>
              </div>
            </div>

            <div className="mt-4">
              {tab === "about" && <About about={detailData.About} />}
            </div>
          </div>
          <div>
            <SidePanel ticketPrice={detailData.Rate} />
          </div>
        </div>
      </div>
    </>
  );
}

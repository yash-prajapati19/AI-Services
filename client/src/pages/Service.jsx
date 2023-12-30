import { useEffect, useRef, useState } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { BsArrowRight } from "react-icons/bs";
import { FiArrowRightCircle } from "react-icons/fi";
import "../App.css";
import {
  DoctorAhmedabad,
  DoctorSurat,
  DoctorVadodara,
  JobAhmedabad,
  JobSurat,
  JobVadodara,
  LawyerAhmedabad,
  LawyerSurat,
  LawyerVadodara,
  RentalAhmedabad,
  RentalSurat,
  RentalVadodara,
} from "../data";
import { Link } from "react-router-dom";

const ServiceDetails = () => {
  const [map, setMap] = useState({});
  const mapElement = useRef(undefined);
  const [longitude, setLongitude] = useState(72.8311);
  const [latitude, setLatitude] = useState(21.1702);
  const [data, setData] = useState([]);

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem("state"));
    const service = state ? state.service : null;
    const city = localStorage.getItem("city");
    console.log(service, city);

    let dataToUse;
    let center = [0, 0];
    if (service === "Doctor" && city === "Vadodara") {
      dataToUse = DoctorVadodara;
      center = [73.1812, 22.3072];
    } else if (service === "Doctor" && city === "Surat") {
      dataToUse = DoctorSurat;
      center = [72.8311, 21.1702];
    } else if (service === "Doctor" && city === "Ahmedabad") {
      dataToUse = DoctorAhmedabad;
      center = [72.5714, 23.0225];
    } else if (service === "Laywer" && city === "Vadodara") {
      dataToUse = LawyerVadodara;
      center = [73.1812, 22.3072];
    } else if (service === "Laywer" && city === "Surat") {
      dataToUse = LawyerSurat;
      center = [72.8311, 21.1702];
    } else if (service === "Laywer" && city === "Ahmedabad") {
      dataToUse = LawyerAhmedabad;
      center = [72.5714, 23.0225];
    } else if (service === "Job-requirement" && city === "Vadodara") {
      dataToUse = JobVadodara;
      center = [73.1812, 22.3072];
    } else if (service === "Job-requirement" && city === "Surat") {
      dataToUse = JobSurat;
      center = [72.8311, 21.1702];
    } else if (service === "Job-requirement" && city === "Ahmedabad") {
      dataToUse = JobAhmedabad;
      center = [72.5714, 23.0225];
    } else if (service === "House-rental" && city === "Vadodara") {
      dataToUse = RentalVadodara;
      center = [73.1812, 22.3072];
    } else if (service === "House-rental" && city === "Surat") {
      dataToUse = RentalSurat;
      center = [72.8311, 21.1702];
    } else if (service === "House-rental" && city === "Ahmedabad") {
      dataToUse = RentalAhmedabad;
      center = [72.5714, 23.0225];
    }

    // ... add more conditions for other services and cities

    setData(dataToUse);
    setLongitude(center[0]);
    setLatitude(center[1]);
  }, []);

  useEffect(() => {
    let map = tt.map({
      key: "4yxikxhNCzEYEzkchzXkBqyp8O4SvTil",
      container: mapElement.current,
      center: [longitude, latitude],
      zoom: 12.4,
    });

    if (data) {
      data.forEach((dataPoint) => {
        const { longitude, latitude, Name, Rate, Characteristics, rating } =
          dataPoint;

        const element = document.createElement("div");
        element.className = "marker";

        const popupOffset = {
          bottom: [0, -25],
        };
        const popup = new tt.Popup({ offset: popupOffset }).setHTML(
          `<div">
              <h3>${Name}</h3>
              <p>Specialization: ${Characteristics}</p>
              <p>Fees: ${Rate}</p>
              <p>Rating: ${rating}</p>
            </div>`
        );

        const marker = new tt.Marker({
          element: element,
        })
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(map);
      });
    }

    setMap(map);
    return () => map.remove();
  }, [longitude, latitude, data]);

  return (
    <>
      {map && (
        <div className="flex bg-[url('/gradient.png')]  bg-cover flex-row gap-2">
          <div className="app ">
            <div
              className="rounded-xl shadow-2xl shadow-black h-full w-full"
              ref={mapElement}
            />
          </div>
          <div className=" w-2/5 py-5 pr-5">
            <div className="h-screen flex flex-col gap-4 px-6 pb-4 overflow-y-auto">
              {data &&
                data.map((data) => (
                  <>
                    <div className="flex flex-row bg-white shadow-xl rounded-md p-3">
                      <div className="flex flex-row w-full items-center">
                        <div className="w-16 h-16">
                          <img
                            className="w-full rounded-full"
                            src={data.Avatar}
                            alt=""
                          />
                        </div>
                        <div className="ml-4 w-full flex flex-col justify-between">
                          <div className="flex flex-row gap-2">
                            <h2 className="text-[16px] leading-[12px] lg:leading-6 font-[700] text-headingColor">
                              {data.Name}
                            </h2>

                            <span className="bg-[#CCF0F3] w-fit px-2 text-irisBlueColor rounded text-[10px] leading-4 lg:leading-7 font-[600]">
                              {data.Characteristics}
                            </span>
                          </div>
                          <div className="flex items-center flex-row justify-between">
                            <div className="flex items-center mt-2 gap-4">
                              <div>
                                <h2>{data.Rate}</h2>
                              </div>
                              <span className="flex w-5 h-5 items-center gap-[6px] text-[12px] leading-4 font-[600] text-headingColor">
                                <img src={"/Star.png"} alt="" /> {data.rating}
                              </span>
                            </div>
                            <div className="mt-2">
                              <Link
                                to={{
                                  pathname: `/details/${data.Name}`,
                                }}
                                onClick={() =>
                                  localStorage.setItem(
                                    "detailData",
                                    JSON.stringify(data)
                                  )
                                }
                              >
                                <FiArrowRightCircle className="group-hover:text-white opacity-60 from-indigo-500 via-purple-500 to-pink-500 w-8 h-8" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
                        <div>
                          {/* <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-[600] text-headingColor">
            +{totalPatients} Patients
          </h3> */}
                        </div>

                        {/* <Link
          to={`/doctors/${doctor._id}`}
          className=" w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex  items-center justify-center  group hover:bg-[#0067FF] hover:border-none"
        >
          <BsArrowRight className="group-hover:text-white w-6 h-5" />
        </Link> */}
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetails;

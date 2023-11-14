"use client";
import React from "react";
import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import { IoPerson } from "react-icons/io5";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { ImBooks } from "react-icons/im";
import { BiCctv } from "react-icons/bi";
import libary from "../public/images/library-svgrepo-com.svg";
import book from "../public/images/book-svgrepo-com.svg";
import { useState ,useEffect,useRef} from "react";
import myJson from "../public/data.json" assert { type: 'json' };
import Chart from 'chart.js/auto';

export default function Home() {
  const [shownav, setShowNav] = useState(false);
  const canvas = useRef<any>();
  const data=myJson
console.log(data.homework);

useEffect(() => {
  const ctx = canvas.current;

  let chartStatus = Chart.getChart('myChart');
  if (chartStatus !== undefined) {
    chartStatus.destroy();
  }
  const behavioralData = data["Behavioral Analytics"];
    const goodCount = behavioralData.filter((item) => item === "good").length;
    const badCount = behavioralData.filter((item) => item === "bad").length;
    const totalCount = behavioralData.length;

    const goodPercentage = (goodCount / totalCount) * 100;
    const badPercentage = (badCount / totalCount) * 100;

  const chart = new Chart(ctx, {
    type: 'pie',
    data: {
      
      datasets: [{
        data: [goodPercentage, badPercentage],
        borderColor: [
          "green",
          "red",
        ],
        backgroundColor: [
          "green",
          "red",
        ],
        borderWidth: 2,
      }],
      labels: ["Good", "Bad"],
    },
  });
}, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const mydata = await fetch("../data.json");
  //       const dataRes=await mydata.json()
  //       setData(dataRes); // Access the default property for JSON files
  //       console.log(dataRes.default);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }; 

  //   fetchData();
  // }, []);

  return (
    <main>
      <Navbar className="shadow-sm bg-gray-400" maxWidth="2xl">
        <NavbarContent justify="start">
          <Button
            isIconOnly
            className="bg-transparent"
            onClick={() => {
              setShowNav(!shownav);
            }}
          >
            <HiOutlineMenuAlt2 size={35} className="cursor-pointer"  color={`${shownav?"black":"brown"}`} />
          </Button>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              isIconOnly
              className="bg-transparent"
              href="#"
              variant="flat"
            >
              <IoPerson size={35} color="brown" />
            </Button>
          </NavbarItem>
        </NavbarContent>
        <div
          className={` absolute top-[65px] left-[0]  h-[92vh] z-10 transition-all duration-75  ${
            shownav ? "w-[290px]  " : "w-[0] overflow-hidden p-0"
          }`}
        >
          <ul className="text-[21px] flex flex-col gap-5 pt-6 w-[270px] bg-gray-100 h-full">
            <Link
              href="#"
              className="text-black flex justify-start gap-2 items-center w-[270px] px-3 "
            >
              <AiOutlineHome size={35} />
              <span>Summary Dashboard</span>
            </Link>
            <Link
              href="#"
              className="text-black flex justify-start gap-2 items-center w-[270px] px-3"
            >
              <Image src={libary} alt="libary" width={35} height={35} />
              <span>Attendance Tracking</span>
            </Link>
            <Link
              href="#"
              className="text-black flex justify-start gap-2 items-center w-[270px] px-3"
            >
              <BiCctv size={35} />
              <span>Behavioural Analytics</span>
            </Link>
            <Link
              href="#"
              className="text-black flex justify-start gap-2 items-center w-[260px] px-3  "
            >
              {" "}
              <Image src={book} alt="libary" width={35} height={35} />
              <span>Academic Performance Tracking</span>
            </Link>
          </ul>
        </div>
      </Navbar>
      <section>
        <h1 className="text-lg">HELLO! {data.NAME} </h1>
        <h2 className="m-auto w-fit text-xl font-semibold">ATTENDANCE</h2>
        <div className="p-4">
        <div className="flex justify-between gap-2 p-3 min-h-[200px] sm:w-full w-full bg-gray-200">
          <div className="flex flex-col justify-end gap-3 items-end text-xl font-semibold pb-6 left-[0] sticky">
            <span className="h-fit ">FN</span>
            <span className="h-fit ">AN</span>
          </div>
          <div className="flex justify-between gap-3 p-3 w-full overflow-auto">          
        {Object.entries(data.ATTENDANCE).map(([day, attendance]) => (
                <div key={day} className="flex flex-col justify-center gap-2 items-center">
                  <div className="text-lg font-semibold">{day}</div>
                  <div>{attendance.date}</div>
                  <div className={`${attendance.fn==="absent"?"bg-red-600":"bg-green-600"} w-[30px] h-[30px]`}></div>
                  <div className={`${attendance.an==="absent"?"bg-red-600":"bg-green-600"} w-[30px] h-[30px]`}></div>
                </div>
              ))}
              </div>
        </div>
        </div>
      </section>
      <section className="flex flex-wrap sm:flex-nowrap justify-between p-4 gap-4">
        <div className="p-3 flex flex-col bg-gray-200 min-h-[200px] sm:w-full w-full">
          <h3 className="text-xl font-semibold">Homeworks</h3>
          <div className="flex flex-wrap justify-between gap-3 ">
          {data.homework.map((homework)=>(
            <p className="text-lg font-medium">{homework}</p>
          ))}  
          </div>
        </div>
        <div className="p-3 min-h-[200px] sm:w-full w-full bg-gray-200">
          <h4 className="text-xl font-semibold">Behavioral Analytics</h4>
          <div className="container flex flex-col-reverse">
          <canvas id="myChart" ref={canvas} className="m-auto"></canvas>          
          </div>
        </div>
      </section>
    </main>
  );
}

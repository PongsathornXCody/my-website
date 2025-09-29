import React, { useState, useEffect, useRef } from "react";

const alarmAudio =
  "/funny-alarm-317531.mp3";

const cubeType = [
  {
    name: "Classic 3x3",
    time: 10,
    description:
      "รูบิค 3x3 คลาสสิกคือเกมปริศนาที่ทำให้การเล่นรูบิคโด่งดังทั่วโลก เป้าหมายคือจัดแต่ละด้านให้เป็นสีเดียวกัน แม้ดูง่ายแต่เต็มไปด้วยความซับซ้อน",
  },
  {
    name: "Classic 2x2",
    time: 120,
    description:
      "รูบิค 2x2 หรือมินิคิวบ์ เป็นรุ่นย่อของ 3x3 ชิ้นน้อยกว่า เล่นง่าย เหมาะสำหรับผู้เริ่มต้น",
  },
  {
    name: "Megaminx",
    time: 1500,
    description:
      "เมกะมินซ์เป็นปริศนารูปสิบสองเหลี่ยม มี 12 ด้าน ความซับซ้อนสูงและให้ประสบการณ์แก้ที่ต่างจากรูบิคทรงลูกบาศก์อย่างมาก",
  },
];

export function CubeTimer() {
  const [selectCube, setSelectCube] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0); // เวลาที่เหลือ
  const [isRunning, setIsRunning] = useState(false); // กำลังนับถอยหลังอยู่รึเปล่า
  const audioRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const handleStart = (cube) => {
    setSelectCube(cube);
    setTimeLeft(cube.time);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectCube ? selectCube.time : 0);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // --- Progress Bar ---
  const radius = 85; // รัศมีของวงกลม
  const strokeWidth = 15; // ความหนาของเส้น
  const circumference = 2 * Math.PI * radius; // สูตรเส้นรอบวง
  const progress = selectCube ? timeLeft / selectCube.time : 0;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 w-full max-w-2xl bg-no-repeat bg-center bg-cover bg-[url('Bg2.gif')]">
        <h1 className="text-4xl font-extrabold text-center text-rose-700 mb-6">
          Rubik's Cube Timer
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {cubeType.map((cube) => (
            <button
              key={cube.name}
              onClick={() => handleStart(cube)}
              disabled={isRunning}
              className={`p-4 rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95
                  ${
                    selectCube?.name === cube.name
                      ? "bg-orange-400 text-white"
                      : "bg-gray-200 text-gray-800"
                  }
                  disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              <h2 className="font-bold text-lg mb-1">{cube.name}</h2>
            </button>
          ))}
        </div>

        {selectCube && (
          <div className="text-center bg-gray-200 p-5 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-700">
              You are solving : {selectCube.name}
            </h3>
            <p className="text-gray-500 mb-4">{selectCube.description}</p>
            <div className="my-8 relative w-52 h-52 mx-auto flex items-center justify-center">
              <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="rgba(0, 0, 0, 0.1)"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#F75270" 
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <span
                className={`text-5xl font-mono font-bold z-10 transition-colors duration-300 ${
                  timeLeft <= 3 && timeLeft > 0
                    ? "text-red-500 animate-pulse"
                    : "text-gray-900"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="flex justify-center space-x-4">
              {isRunning ? (
                <button
                  onClick={handleStop}
                  className="bg-red-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                >
                  Freeze
                </button>
              ) : (
                <button
                  onClick={() => handleStart(selectCube)}
                  className="bg-green-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
                >
                  Start
                </button>
              )}
              <button
                onClick={handleReset}
                className="bg-gray-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        <audio ref={audioRef} src={alarmAudio} preload="auto" />
      </div>
    </div>
  );
}

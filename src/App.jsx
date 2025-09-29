import { Route, Routes } from "react-router-dom";
import { CubeTimer } from "./component/CubeTimer";
import { Sidebar } from "./component/sidebar";
import Home from "./pages/home";
import Task from "./example/Task";

export default function App() {

  return (
   <div className="min-h-screen w-screen flex flex-col">
      <header className="bg-black text-white p-8" >
        <h1 className="text-rose-500 font-semibold flex gap-4 justify-center ">Main-Display <img src="RubikIcon.png" alt="Rubik" width="50" height="auto"></img></h1> 
        </header>
        <div className="bg-orange-400 p-1"></div>
        <div className="bg-orange-500 p-2"></div>
      <div className="flex flex-1">
        <main className="flex flex-1  bg-white">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />}/> 
            <Route path="/rbk" element={<CubeTimer />}/> 
            <Route path="/ts" element={<Task />}/>
          </Routes>
        </main>
      </div>
      <footer className="bg-black text-rose-500 p-4 font-semibold text-center">Jai-Family</footer>
    </div>
  )
}
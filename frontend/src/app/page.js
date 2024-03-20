'use client'
import Form from "./components/Form";
import Header from "./components/Header";
import { useState } from "react";

export default function Home() {
  const[form, setForm] = useState(true);
  return form ? (
    <div className="h-screen bg-blue-400 flex items-center justify-center">
      <div className="bg-slate-200 w-[40%] h-[45%] flex-none flex-col">
        <Header />
        <Form setForm={setForm}/>
      </div>
    </div>
  ) : (
    <div className="h-screen bg-blue-400 flex items-center justify-center">
      <div className="bg-slate-200 w-[40%] h-[45%] flex-none flex-col">
        <p>WIP</p>
      </div>
    </div>
  );
}

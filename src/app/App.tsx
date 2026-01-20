import { Suspense } from "react";
import "./App.css";
import { Routes } from "./Routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Routes />
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;

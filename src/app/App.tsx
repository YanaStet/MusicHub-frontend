import { Suspense } from "react";
import "./App.css";
import { Routes } from "./Routes";
import { Toaster } from "@/shared/shadcn-ui/sonner";
import { api } from "@/shared/api/api";

async function fetch() {
  const data = await api.get<any>("/stats/users");
  return data;
}

function App() {
  const data = fetch();
  console.log(data);

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

import Dashboard from "./pages/Dashboard";

const ap = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function App() {
  console.log(ap);

  return (
    <>
      <Dashboard />
    </>
  );
}

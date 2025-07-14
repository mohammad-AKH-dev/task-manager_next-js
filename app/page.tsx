import Image from "next/image";
import Navbar from "./components/modules/Navbar/Navbar";
import DashboardContent from "./components/templates/Dashboard/DashboardContent";

export default function Home() {
  return (
    <section className="dashboard">
       <DashboardContent/>
    </section>
  );
}

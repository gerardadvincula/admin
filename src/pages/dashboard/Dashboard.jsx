import "./Dashboard.css";
import SidePanel from "../../components/sidepanel/SidePanel";
import Boxes from "../../components/boxes/Boxes";
import TopBar from "../../components/topBar/TopBar";
import BarChart from "../../components/charts/BarChart";
import PieChart from "../../components/charts/PieChart";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SidePanel />
      <div className="dashboard-container">
        <TopBar />
        <section className="dashboard-box">
          <Boxes />
        </section>
        <section className="dashboard-chart-row">
          <BarChart />
          <PieChart />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

import DashboardHeaderSection from "../components/Fragments/DashboardHeaderSection";
import FoodCard from "../components/Elements/FoodCard";
import { useTitle } from "../hooks/useTitle";

const DashboardPage = () => {
  useTitle({ title: "Dashboard" });

  return (
    <div className="container m-auto flex flex-col px-2 py-4">
      <DashboardHeaderSection username="John Doe" />
      <div>
        <p className="text-sm mb-6">Recommended For You</p>
        <div className="container flex flex-col sm:flex-row m-auto gap-8">
          <FoodCard
            title="Caramelized Banana"
            time="30 min"
            image="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <FoodCard
            title="Fruit Salad"
            time="20 min"
            image="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

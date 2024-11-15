"use client";
import Wrapper from "@/components/Wrapper";
import CreateTask from "@/components/CreateTask";
import Dropdown from "@/components/ui/Dropdown";


const Dashboard = () => {


  return (
    <Wrapper>
      <main className="mx-auto max-w-7xl md:p-10">
        <div className="mt-8 flex flex-col items-start justify-between gap-4 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 font-semibold text-5xl text-gray-900">
            Mis Tareas
          </h1>
          <div>
         <CreateTask />
          </div>
        </div>
        <Dropdown triggerText="Prioridad Alta"/>
      </main>
    </Wrapper>
  );
};

export default Dashboard;

"use client";

import React, { useEffect, useState } from "react";
import AddCommandeButton from "@/components/buttons/addCommandeButton";
import CommandesTable from "@/components/tables/commandesTable";
import AgentLayout from "../agentLayout";

const CommandsPage: React.FC = () => {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/bons/allcommands'); 
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`Error fetching articles: ${data.message}`);
        }

        setCommands(data.commands);
      } catch (error) {
        console.error("Error fetching articles:", error);
        
      }
    };

    fetchCommands();
  }, []);
  return (
    <AgentLayout>
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold ml-10">BCE</div>
        <div className="flex m-8 justify-end">
          <AddCommandeButton />
        </div>
      </div>
      <div className="m-8 mt-8">
        <CommandesTable commandes={commands} />
      </div>
    </AgentLayout>
  );
};

export default CommandsPage;

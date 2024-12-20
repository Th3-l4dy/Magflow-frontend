"use client";

import React, { useEffect, useState } from "react";
import CommandesTable from "@/components/tables/commandInTable";
import RootLayout from "../rootLayout";
import AddCommandButton from "@/components/buttons/addCommandButton";
import withAuth from "@/utils/withAuth";

const CommandsPage: React.FC = () => {
  const [commands, setCommands] = useState([]);
  const role = localStorage.getItem("role");
  console.log(role);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const role = localStorage.getItem("role");
        console.log("this is the role from ", role);
        let url;

        if (role === "magasinier" || role === "director") {
          url = new URL(
            "http://localhost:4000/api/bons/getAllBonCommandInterneFFordirectorMagazinier"
          );

          url.searchParams.append("role", role);
          console.log(url);
        } else if (role === "structureresponsable") {
          const id_structureresponsable = localStorage.getItem("id");
          url = new URL(
            `http://localhost:4000/api/bons/allcomandsforresposnable/${id_structureresponsable}`
          );
        } else {
          const id_consommateur = localStorage.getItem("id");
          url = new URL(
            `http://localhost:4000/api/bons/consumer-commands/${id_consommateur}`
          );
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
          const data = await response.json();
          throw new Error(
            `Error fetching commandes internes : ${data.message}`
          );
        }

        const data = await response.json();
        console.log(data);
        setCommands(data);
      } catch (error) {
        console.error("Error fetching commands:", error);
      }
    };

    fetchCommands();
  }, []);

  return (
    <RootLayout>
      <div className="flex items-center  text-[#2C2D41] justify-between">
        <div className="text-4xl text-[#2C2D41] font-bold m-10">
          Bons de Commandes Internes
        </div>
        {role === "consumer" ? (
          <div className="flex m-8 text-[#2C2D41] justify-end">
            <AddCommandButton
              label="Ajouter une commande Interne"
              path="/newCommandIn"
            />
          </div>
        ) : null}
      </div>
      <div className="m-8 mt-8">
        <CommandesTable commandes={commands} />
      </div>
    </RootLayout>
  );
};

export default withAuth(CommandsPage);

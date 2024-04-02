"use client";

import React from "react";

import Link from "next/link";

import UpdateStructureButton from "../buttons/updateStructureButton";
import dlt from "../../../public/assets/icons/delete.svg";

interface Structure {
  id: number; 
  name: string;
}

interface StructuresTableProps {
  structures: Structure[]; 
}

const StructuresTable: React.FC<StructuresTableProps> = ({ structures}) => {
  return (
    <div>
      {structures.map((strct) => (
        <Link href="/structureDetails">
          <div
            key={strct.id}
            className="bg-white border border-gray-300 flex justify-between p-6 mb-4 rounded-md"
          >
            <div key={strct.id}>
              <span className="font-bold text-xl mb-8">{strct.name}</span>
            </div>

            <div className="flex items-center">
              <span className="mr-3">
                <UpdateStructureButton showPopup={true} />
              </span>
              <button className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <img src={dlt.src} width="18" height="15" />
                  <span>Supprimer</span>
                </div>
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default StructuresTable;

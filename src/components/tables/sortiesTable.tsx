"use client";

import React from "react";
import Link from "next/link";
import { Sortie } from "@/types";
import Converter from "@/dateConverter";

interface Props {
  bons: Sortie[];
}

const SortiesTable: React.FC<Props> = ({ bons }) => {
  const sortedbons = bons.sort((a, b) => b.id - a.id);
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light"></th>
            <th className="px-4 py-2 font-light hidden md:table-cell">BCI</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Magasinier
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Service
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Date</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Observation
            </th>
            {/* <th className="px-4 py-2 font-light hidden md:table-cell"></th> */}
          </tr>
        </thead>
        <tbody>
          {sortedbons.map((bon, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="border-t bg-white text-center px-2 py-2">
                {bon.id}
              </td>
              <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
                {bon.id_boncommandeinterne}
              </td>
              <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
                {bon.id_magasinier}
              </td>
              <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
                {bon.service}
              </td>
              <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
                <Converter date={bon.date} />
              </td>
              <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
                {bon.observation}
              </td>
              {/* <td className="border-t bg-white text-center px-2 py-1 md:table-cell flex items-center justify-center">
              <Link
                href={{
                  // pathname: "/newBonDeSortie",
                  // query: { id: commande.id },
                }}
                className="text-gray-500 "
              >
                Details du bon de sortie {">>"}
              </Link>
            </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortiesTable;
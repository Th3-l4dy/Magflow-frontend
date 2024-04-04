// ModifierButton.tsx
"use client";
import React, { useState } from "react";
import ajt from "../../../public/assets/icons/Add.svg";

interface AddButtonProps {
    className?: string;
}

const AddCommandeButton: React.FC<AddButtonProps> = ({ className = ''  }) => {

  return (
    <>
      <button
        className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 rounded-lg"
      >
        <div className="flex items-center space-x-2">
          <img
            src={ajt.src}
            width="18"
            height="18"
            style={{ filter: "invert(100%)" }}
          />{" "}
          <span>Ajouter</span>
        </div>
      </button>
    </>
  );
};

export default AddCommandeButton;
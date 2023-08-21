import React from "react";

export const CartResume = ({ total }) => {
  return (
    <div className="bg-white rounded">
      <div className="p-2 uppercase border-b border-gray-400 ">
        RÉSUMÉ DU PANIER
      </div>
      <div className="flex justify-between p-2 border-b border-gray-400">
        <div>Sous-total</div>
        <div className="text-xl">{total} Dhs</div>
      </div>
      <div className="p-2">
        <button className="w-full px-4 py-3 leading-4 text-white uppercase rounded cursor-pointer bg-custom-orange hover:bg-custom-hover-orange ">
          commander ({total} DHs)
        </button>
      </div>
    </div>
  );
};

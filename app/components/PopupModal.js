import React from "react";
const PopupModal = ({ onClose, onConfirmDelete, onAddToWishlist }) => {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-70">
      <div className="p-6 bg-white rounded-md shadow-lg">
        <div className="flex justify-between mb-2">
          <span className="text-xl">Retire du panier</span>
          <div className="flex justify-end">
            <svg
              className="cursor-pointer"
              width="20"
              height="20"
              fill="currentColor"
              onClick={onClose}
            >
              <path d="M17.8 20 12 14.2 6.2 20 4 17.8 9.8 12 4 6.2 6.2 4 12 9.8 17.8 4 20 6.2 14.2 12l5.8 5.8z"></path>
            </svg>
          </div>
        </div>
        <p className="mb-4">
          Voulez-vous vraiment supprimer cet article du panier?
        </p>
        <div className="flex gap-4">
          <button
            className="flex items-center justify-center w-1/2 px-4 py-2 text-white rounded drop-shadow-md bg-custom-orange hover:bg-custom-hover-orange"
            onClick={onConfirmDelete}
          >
            Delete from Cart
          </button>
          <button
            className="flex items-center justify-center w-1/2 px-4 py-2 border rounded text-custom-orange drop-shadow-md border-custom-orange hover:bg-orange-100"
            onClick={onAddToWishlist}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};
export default PopupModal;

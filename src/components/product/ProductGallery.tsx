import React from 'react';

export const ProductGallery: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <div className="flex space-x-2">
      {images.map((img, idx) => (
        <img key={idx} src={img} alt="" className="w-16 h-16 object-contain rounded-lg border" />
      ))}
    </div>
  );
};

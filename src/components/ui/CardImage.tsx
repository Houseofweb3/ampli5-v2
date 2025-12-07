import Image from 'next/image';
import React from 'react';

interface CardImageProps {
  data: {
    img: string;
    title: string;
  };
}

const CardImage: React.FC<CardImageProps> = ({ data }) => {
  return (
      <div className="cadimage_list_item border border-solid border-black w-fit rounded-36 bg-white">
        <div className="cadimage_list_item_img w-[calc(100% - 2rem)] h-[calc(100% - 2rem)] flex items-center justify-center overflow-hidden rounded-36">
          <Image src={data.img} width={253} height={258} alt="image1" />
        </div>
        <div className="cadimage_list_item_text pt-2.5 pb-6 text-center">
          <h4 className="font-bold text-black">{data.title}</h4>
        </div>
      </div>
  );
};

export default CardImage;

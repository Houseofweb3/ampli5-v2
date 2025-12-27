import Image from "next/image";
import React from "react";

const IconText: React.FC = () => {
  return (
    <div className="grid_text bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 md:gap-6">
          <div className="flex items-center flex-col sm:flex-row gap-4">
            <div className="p-4 border border-solid border-black rounded-2xl  flex-shrink-0 flex items-center justify-center">
              <Image
                src={"/icons/user-check.png"}
                width={48}
                height={48}
                alt="icon1"
              />
            </div>
            <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold text-black text-center sm:text-left">
              <h2 className="font-extrabold leading-tight">1012</h2>
              <p>Creators</p>
            </div>
          </div>
          <div className="flex items-center flex-col sm:flex-row gap-4">
            <div className="p-4 border border-solid border-black rounded-2xl  flex-shrink-0 w-82px h-82px flex items-center justify-center">
              <Image
                src={"/icons/tiktok.png"}
                width={48}
                height={48}
                alt="icon2"
              />
            </div>
            <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold text-black text-center sm:text-left">
              <h2 className="font-extrabold leading-tight">108+</h2>
              <p>Tik Tok Creators</p>
            </div>
          </div>
          <div className="flex items-center flex-col sm:flex-row gap-4">
            <div className="p-4 border border-solid border-black rounded-2xl  flex-shrink-0 w-82px h-82px flex items-center justify-center">
              <Image
                src={"/icons/x-t.png"}
                width={48}
                height={48}
                alt="icon3"
              />
            </div>
            <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold text-black text-center sm:text-left">
              <h2 className="font-extrabold leading-tight">220</h2>
              <p>X creators</p>
            </div>
          </div>
          <div className="flex items-center flex-col sm:flex-row gap-4">
            <div className="p-4 border border-solid border-black rounded-2xl  x-shrink-0 w-82px h-82px flex items-center justify-center">
              <Image
                src={"/icons/instagram.png"}
                width={48}
                height={48}
                alt="icon4"
              />
            </div>
            <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold text-black text-center sm:text-left">
              <h2 className="font-extrabold leading-tight">400+</h2>
              <p>IG creators</p>
            </div>
          </div>
          <div className="flex items-center flex-col sm:flex-row gap-4">
            <div className="p-4 border border-solid border-black rounded-2xl  x-shrink-0 w-82px h-82px flex items-center justify-center">
              <Image
                src={"/icons/youtube-y.png"}
                width={48}
                height={48}
                alt="icon4"
              />
            </div>
            <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold text-black text-center sm:text-left">
              <h2 className="font-extrabold leading-tight">300</h2>
              <p>Youtube creators</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconText;

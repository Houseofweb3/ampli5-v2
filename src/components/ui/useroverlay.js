import Image from 'next/image';
import React from 'react';

export default function userOverlay({ userList }) {
  return (
    <div>
      <div className="flex justify-start -space-x-1.5">
        {avatars.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt=""
            width={24}
            height={24}
            className="w-6 h-6 rounded-full bg-slate-100 ring-1 ring-white"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}

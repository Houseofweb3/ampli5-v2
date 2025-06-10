import Image from 'next/image';
import React from 'react';

interface UserOverlayProps {
  userList: string[];
}

export default function UserOverlay({ userList }: UserOverlayProps): JSX.Element {
  return (
    <div>
      <div className="flex justify-start -space-x-1.5">
        {userList.map((src, index) => (
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
import React from 'react';
import CreateBountiesForm from '../../components/CreateBountiesForm';
import Container from '../../components/ui/container';
import Image from 'next/image';

export default function Pages(): JSX.Element {
  return (
    <div className="bg-cream-bg relative pt-56px pb-10 bg_square bg_square_bottom overflow-x-hidden">
      <div className=" absolute top-9 lg:top-20 lg:-left-7">
        <Image
          className="w-90px h-90px lg:w-166px lg:h-166px "
          src={'/pattern/Vector3_mobile.png'}
          width={166}
          height={166}
          alt="icon"
        />
      </div>
      <div className=" absolute top-4 lg:top-20 -right-5 lg:-right-9">
        <Image
          className="w-90px h-90px lg:w-170px lg:h-170px object-contain"
          src={'/pattern/Vector4.png'}
          width={170}
          height={170}
          alt="icon"
        />
      </div>
      <Container>
        <CreateBountiesForm />
      </Container>
    </div>
  );
}

import React from 'react';

import Link from 'next/link';
import { CASE_STUDY_DATA } from '@/data/data';
import Container from './ui/container';

const CaseStudies = () => {
  return (
    <Container>
      <div className=" flex w-full flex-col items-center">
        <h1>Case studies</h1>

        <div className="grid md:grid-cols-2 grid-cols-1  w-full gap-6 mt-16">
          {CASE_STUDY_DATA.map((item, index) => (
            <Link
              href={item.s3_url}
              target="_blank"
              className="rounded-lg  flex flex-col gap-6 hover:shadow-lg transition-all ease-in-out cursor-pointer hover:scale-[1.009] focus:shadow-none focus:scale-[1]"
              key={index}
            >
              {item.thumbnail}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CaseStudies;

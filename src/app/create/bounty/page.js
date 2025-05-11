import React from 'react';
import Title from '@/components/ui/title';
import Card from '@/components/ui/card';
import Container from '@/components/ui/container';
import CreateBountiesForm from '@/components/CreateBountiesForm';

export default function pages() {
  return (
    <div className="bg-[#FDF4E9] relative pt-[56px] pb-10 bg_square bg_square_bottom overflow-x-hidden">
      <Container>
        <div className="mb-6 ml-6 lg:ml-0 lg:mb-9">
          <Title className="text-left lg:text-center ">Create Bounty</Title>
          <p className="text-[#00000073] font-normal block lg:hidden">
            Fill out the form below and we’ll get back to you as soon as we can.
          </p>
        </div>
        <Card className="border-0 rounded-2xl lg:rounded-4xl">
          <CreateBountiesForm />
          <div>
            <p className="text-center text-xs text-[#0000004D] hidden lg:block">
              By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
}

import React from "react";
import Card from "./ui/card";
import Container from "./ui/container";
import Image from "next/image";
import PrimaryButton from "./ui/PrimaryButton";

interface User {
  user: {
    fullname: string;
  };
  ranking?: number;
}

interface WinnerProps {
  winderList: User[];
}

const Winner: React.FC<WinnerProps> = ({ winderList }): JSX.Element => {
  // enum: ['pending', 'approved', 'rejected'],

  return (
    <Container className="mt-12">
      <Card className="shadow-xl">
        <div className="mb-4 flex justify-between item-center">
          <h2> Submissions</h2>
          <PrimaryButton className="bg-yellow-bg px-6 lg:px-6  h-fit py-1.5 lg:py-1.5 shadow-none hover:text-black hover:bg-bg-yellow-bg cursor-arrow pointer-events-none">
            winners
          </PrimaryButton>
        </div>
        <div className="my-8">
          {winderList.length > 0 ? (
            <div className="grid items-center sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-8 xl:gap-6 ">
              {winderList.map((user, index) => {
                return (
                  <div
                    key={index}
                    className="cadimage_list_item border border-solid border-black w-fit rounded-3xl bg-white mx-auto"
                  >
                    <div className="cadimage_list_item_  aspect-4/3 overflow-hidden flex items-center justify-center rounded-3xl">
                      <Image
                        src={"/images/crypto-image-1.png"}
                        width={250}
                        height={258}
                        alt="image1"
                        className="object-cover"
                      />
                    </div>
                    <div className="cadimage_list_item_text pt-2.5 pb-4 text-center space-y-2">
                      <h4 className="font-bold text-black">{user.ranking || index}</h4>
                      <h4 className="font-bold text-black">{user.user.fullname || ""}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="min-h-[300px] flex justify-center items-center">
              <h3 className="font-normal text-18">Winner to be announced soon </h3>{" "}
            </div>
          )}
        </div>
      </Card>
    </Container>
  );
};

export default Winner;

import React from "react";

const LeaderBoard = () => {
  const NameBoard = ({ name }: any) => {
    return (
      <div className="h-[50px] bg-secondary rounded-sm flex items-center justify-center">
        {name ? name : "Name"}
      </div>
    );
  };

  return (
    <div className="grid grid-rows-5 gap-y-2">
      <NameBoard />
      <NameBoard />
      <NameBoard name="Next Update" />
    </div>
  );
};

export default LeaderBoard;

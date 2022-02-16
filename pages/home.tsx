import { message } from "antd";
import React, { FC, ReactNode, useState } from "react";

function Home() {
  const handleClick = async () => {
    message.success("Home Working");
  };

  return (
    <>
      <button
        onClick={() => handleClick()}
        type="button"
        className={`py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg`}
      >
        Setup Webauth
      </button>
    </>
  );
}

export default Home;

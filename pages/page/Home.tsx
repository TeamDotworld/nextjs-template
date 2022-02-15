import { message } from "antd";
import React, { FC, ReactNode, useState } from "react";
// import { startAttestation } from "@simplewebauthn/browser";

import { generateAssertion, verifyAttestation } from "../services/auth";
function Home() {
  const handleClick = async () => {
    message.success("Working");
    // try {
    //   let resp = await generateAssertion("prakash.c@dotworld.in");
    //   console.log(resp);
    //   // Pass the options to the authenticator and wait for a response
    //   // let attResp = await startAttestation(resp.data);
    //   let attResp = resp.data;

    //   // POST the response to the endpoint that calls
    //   // @simplewebauthn/server -> verifyAttestationResponse()

    //   const verificationResp = await verifyAttestation({
    //     email: "prakash.c@dotworld.in",
    //     data: attResp,
    //   });

    //   // Wait for the results of verification
    //   const verificationJSON = verificationResp.data;
    //   console.log(verificationJSON);
    // } catch (error) {
    //   // Some basic error handling
    //   console.log(error);
    // }
  };

  return (
    <>
      <p>Working or not</p>
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

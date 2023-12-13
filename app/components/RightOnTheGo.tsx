"use client";
import React, { useContext, useState, useEffect } from "react";
import { Image, Link } from "@nextui-org/react";
export default function RightOnTheGo() {
  return (
    <div className="right-container">
      <h2 className="uppercase">Inspired by Splitwise</h2>
      <span>Get the free Splitwise app and add IOUs from anywhere:</span>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://apps.apple.com/us/app/splitwise/id458023433"
      >
        <Image
          className="mt-3"
          src="/images/iphone.png"
          alt="iphone app link"
          width="160px"
        />
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://play.google.com/store/apps/details?id=com.Splitwise.SplitwiseMobile"
      >
        <Image
          className="mt-3"
          src="/images/android.png"
          alt="android app link"
          width="160px"
        />
      </Link>
    </div>
  );
}

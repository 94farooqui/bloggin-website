import React from "react";
import banner_image from './../assets/banner_image.jpg'

function Banner() {
  return (
    <div className="relative bg-cover bg-center bg-no-repeat h-96 bg-slate-800">
      <img
        src={banner_image}
        alt="Banner Image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-600 opacity-80 flex items-center justify-start text-white 1 ">
        <div className="w-[1200px] mx-auto flex flex-col gap-8">
          <h3 className=" text-5xl font-bold">Ignite Your Mind</h3>
          <p className="font-sans">
            Discover a world of ideas, stories, and insights. <br/>From technology to
            travel, health to happiness, we've got you covered.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;

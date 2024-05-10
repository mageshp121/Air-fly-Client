import React from "react";
import FlightSearch from "../../components/flight/FlightSearch";
import Navbar from "../../components/common/Navbar";

function Home() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100">
      <Navbar />
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                People don't take trips,
                <div className="relative inline-flex">
                  <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]" />
                  <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                    Trips take people
                  </h1>
                </div>
              </h1>
              <p className="mt-8 text-base text-black sm:text-xl">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat.
              </p>
              <div className="mt-10 sm:flex sm:items-center sm:space-x-8">
                <div
                  href="#"
                  title=""
                  className="inline-flex items-center shadow-xl hover:-translate-y-1 bg-black text-white transition-all duration-500  justify-center px-10 py-4 text-base rounded-lg font-semibold text-whitebg-black "
                  role="button"
                >
                  {" "}
                  Search Flight
                </div>
              </div>
            </div>
            <div class="rounded-lg overflow-hidden">
              <img
                class="w-full rounded-lg"
                src="./28791480_tr_vi_17__1_-removebg-preview.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <FlightSearch />
      </section>
    </div>
  );
}

export default Home;

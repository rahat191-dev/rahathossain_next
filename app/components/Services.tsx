"use client";
import React from "react";

interface ServicesTypes {
  image?: string;
  title: string;
  p: string;
}

export default function Services() {
  const serviceList: ServicesTypes[] = [
    {
      title: "Web Design",
      p: "I create modern, responsive, and visually stunning web designs that perfectly match your taste — smart, sleek, and tailored just for you.",
    },
    {
      title: "Web Development",
      p: "From the initial concept to the final launch, I design and develop comprehensive web solutions that are perfectly tailored to meet your unique needs and goals, ensuring a seamless and engaging user experience.",
    },
    {
      title: "Next.js Expert",
      p: "Creating dynamic, responsive, and lightning-fast websites with Next.js for an exceptional user experience.",
    },
    {
      title: "UI/UX Design",
      p: "I craft intuitive and visually appealing interfaces that enhance user experience.",
    },
  ];

  return (
    <main className="text-pg py-8">
      {/* Section Title */}
      <div
        className="flex justify-between items-center mb-6"
        style={{
          borderBottomWidth: "2px item-end",
          borderImage: "linear-gradient(to right, white, transparent) 1",
        }}
      >
        <h2  className="text-xl font-extrabold">
          <span className="text-brand font-extrabold">M</span>y Services
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {serviceList.map((service, idx) => (
    <div
      key={idx}
      className="rounded-xl transition-transform duration-300 flex flex-col"
    >
      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
      <p
        className="text-sm pb-10"
        style={{
          borderBottomWidth: "2px",
          borderImage: "linear-gradient(to right, transparent, white, transparent) 1",
        }}
      >
        {service.p}
        </p>
    </div>
  ))}
</div>

    </main>
  );
}

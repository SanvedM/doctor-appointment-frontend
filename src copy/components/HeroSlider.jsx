import { useState, useEffect } from "react";

const slides = [
  {
    title: "Book Doctor Appointments Easily",
    subtitle: "Trusted specialists at your fingertips",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  },
  {
    title: "Expert Doctors Available",
    subtitle: "Cardiology, Skin, Ortho & more",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464",
  },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-56 rounded-xl overflow-hidden mb-8">
      <img
        src={slides[index].image}
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 text-white">
        <h2 className="text-2xl font-bold">{slides[index].title}</h2>
        <p className="text-sm mt-1">{slides[index].subtitle}</p>
      </div>
    </div>
  );
};

export default HeroSlider;

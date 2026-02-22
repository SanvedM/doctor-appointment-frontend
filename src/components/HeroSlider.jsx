import { useEffect, useState } from "react";

const images = [

  // hospital corridor clean
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden">
      <img
        src={images[index]}
        alt="doctor"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default HeroSlider;

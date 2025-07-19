import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, Star, X } from "lucide-react";

// LikeButton Component
const LikeButton = ({ onClick, isLiked }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1 text-sm ${
      isLiked ? "text-red-500" : "text-gray-500"
    }`}
  >
    <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
    {isLiked ? "Thank you!" : "Click like if this post is useful to you!"}
  </button>
);

// Rating Component
const Rating = ({ rating = 1, maxRating = 5, onChange }) => {
  const ratingTexts = {
    1: "Really Bad",
    2: "Bad",
    3: "Average",
    4: "Good",
    5: "Excellent",
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[...Array(maxRating)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? "#fbbf24" : "none"}
            color={i < rating ? "#fbbf24" : "#d1d5db"}
            className="cursor-pointer"
            onClick={() => onChange && onChange(i + 1)}
          />
        ))}
      </div>
      <span className="text-sm text-gray-700">{ratingTexts[rating]}</span>
    </div>
  );
};

// ImageSlider Component with combined functionality
const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [controlMode, setControlMode] = useState("thumbnails"); // 'dots' or 'thumbnails'
  const [autoplay, setAutoplay] = useState(false);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(nextSlide, 1000);
    }
    return () => clearInterval(interval);
  }, [autoplay, images.length]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative h-80 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Controls */}
      {controlMode === "thumbnails" ? (
        <div className="flex justify-center gap-2 mb-4">
          {images.map((_, index) => (
            <img
              key={index}
              src={images[index]}
              alt={`Thumbnail ${index + 1}`}
              className={`w-12 h-12 object-cover rounded cursor-pointer border-2 ${
                index === currentIndex ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-1 mb-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Settings */}
      <div className="text-center space-y-2">
        <div className="flex justify-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <span>Autoplay:</span>
            <input
              type="checkbox"
              checked={autoplay}
              onChange={(e) => setAutoplay(e.target.checked)}
              className="w-4 h-4"
            />
          </label>

          <label className="flex items-center gap-2">
            <span>Controls:</span>
            <select
              value={controlMode}
              onChange={(e) => setControlMode(e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="thumbnails">Thumbnails</option>
              <option value="dots">Dots</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

// ButtonTabs Component
const ButtonTabs = ({ tabs, activeTab, onTabChange }) => (
  <div className="w-full">
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === tab.id
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>

    <div className="p-6 bg-gray-50">
      <p className="text-sm text-gray-600 leading-relaxed">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </p>
    </div>
  </div>
);

// Accordion Component
const Accordion = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState(
    allowMultiple ? [] : [items[0]?.id]
  );

  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="w-full">
      {items.map((item) => (
        <div key={item.id} className="border-b border-gray-200">
          <button
            onClick={() => toggleItem(item.id)}
            className={`w-full px-4 py-3 text-left text-sm font-medium ${
              openItems.includes(item.id)
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {item.title}
          </button>

          {openItems.includes(item.id) && (
            <div className="px-4 py-3 bg-gray-50">
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Slider2 Component
const Slider2 = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative h-80 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex justify-center mt-4 gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Autoplay:</span> on/off |{" "}
          <span className="font-medium">Thumbnails:</span> on/off
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Autoplay:</span> false
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Controls:</span> dots
        </p>
      </div>
    </div>
  );
};

// LightboxGallery Component
const LightboxGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-4xl">
            <img
              src={selectedImage}
              alt="Lightbox"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
const HomeworkPractices = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("HISTORY");
  const [currentRating, setCurrentRating] = useState(1);

  const ratingTexts = {
    1: "Really Bad",
    2: "Bad",
    3: "Average",
    4: "Good",
    5: "Excellent",
  };

  // Sample data arrays
  const sliderImages = [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1503602642458-232111445657?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=400&fit=crop",
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=300&h=300&fit=crop",

    "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  ];

  const tabsData = [
    {
      id: "HISTORY",
      label: "HISTORY",
      content:
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. ",
    },
    {
      id: "APPROACH",
      label: "APPROACH",
      content:
        "Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    },
    {
      id: "CULTURE",
      label: "CULTURE",
      content:
        "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    },
    {
      id: "METHOD",
      label: "METHOD",
      content:
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    },
  ];

  const singleAccordionData = [
    {
      id: "history",
      title: "HISTORY",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    },
    {
      id: "approach",
      title: "APPROACH",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      id: "culture",
      title: "CULTURE",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      id: "method",
      title: "METHOD",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
  ];

  const multiAccordionData = [
    {
      id: "history2",
      title: "HISTORY",
      content:
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    },
    {
      id: "approach2",
      title: "APPROACH",
      content:
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    },
    {
      id: "culture2",
      title: "CULTURE",
      content:
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    },
    {
      id: "method2",
      title: "METHOD",
      content:
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold text-center mb-8">Homework Session2</h1>

      {/* LikeButton Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">LikeButton</h2>
        <LikeButton isLiked={isLiked} onClick={() => setIsLiked(!isLiked)} />
      </div>

      {/* Rating Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Rating</h2>
        <Rating rating={currentRating} onChange={setCurrentRating} />
      </div>

      {/* Slide with Thumb Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Slide with Thumb</h2>
        <ImageSlider images={sliderImages} />
      </div>

      {/* Button Tabs Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Button Tabs</h2>
        <ButtonTabs
          tabs={tabsData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Button Accordions Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Button Accordions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-md font-medium mb-4">Single Accordions</h3>
            <Accordion items={singleAccordionData} allowMultiple={false} />
          </div>
          <div>
            <h3 className="text-md font-medium mb-4">Multi Accordions</h3>
            <Accordion items={multiAccordionData} allowMultiple={true} />
          </div>
        </div>
      </div>

      {/* Lightbox Gallery Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Lightbox Gallery</h2>
        <LightboxGallery images={galleryImages} />
      </div>
    </div>
  );
};

export default HomeworkPractices;

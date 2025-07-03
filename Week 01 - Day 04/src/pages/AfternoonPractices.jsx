import React from "react";
import NewsSection from "../components/NewsSection";
import AccessoriesSection from "../components/AccessoriesSection";
import DealOfTheDay from "../components/DealOfTheDay";
import ColorFilter from "../components/ColorFilter";
import RatingFilter from "../components/RatingFilter";
import RecentlyViewed from "../components/RecentlyViewed";
import SortFilter from "../components/SortFilter";

const AfternoonPractices = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <NewsSection />
        <AccessoriesSection />
        <DealOfTheDay />
        <ColorFilter />
        <RatingFilter />
        <RecentlyViewed />
        <SortFilter />
      </div>
    </div>
  );
};

export default AfternoonPractices;

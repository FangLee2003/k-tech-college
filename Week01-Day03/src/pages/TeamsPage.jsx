// pages/TeamsPage.jsx
import React from "react";
import Avatar from "../components/Avatar";

const TeamsPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-200 p-4 flex flex-col justify-center">
    <div className="space-y-4 max-w-sm mx-auto w-full">
      <div className="bg-cyan-400 rounded-3xl p-4 flex items-center gap-3">
        <Avatar size="w-10 h-10" bg="bg-red-500">
          <span className="text-white text-sm font-bold">M</span>
        </Avatar>
        <span className="text-white font-medium text-lg">Miriam Jimenez</span>
      </div>

      <div className="bg-purple-500 rounded-3xl p-4 flex items-center gap-3">
        <div className="flex -space-x-2">
          <Avatar size="w-8 h-8" bg="bg-orange-400">
            <span className="text-white text-xs">T</span>
          </Avatar>
          <Avatar size="w-8 h-8" bg="bg-gray-300">
            <div className="w-full h-full bg-gray-400 rounded-full"></div>
          </Avatar>
          <Avatar size="w-8 h-8" bg="bg-blue-400">
            <span className="text-white text-xs">A</span>
          </Avatar>
        </div>
        <div className="text-white">
          <div className="font-medium">Teams</div>
          <div className="text-sm opacity-90">Two recently</div>
        </div>
      </div>

      <div className="bg-yellow-400 rounded-3xl p-4 flex items-center gap-3">
        <div className="flex -space-x-2">
          <Avatar size="w-8 h-8" bg="bg-blue-500">
            <span className="text-white text-xs">N</span>
          </Avatar>
          <Avatar size="w-8 h-8" bg="bg-gray-400">
            <div className="w-full h-full bg-gray-300 rounded-full"></div>
          </Avatar>
        </div>
        <span className="text-white font-medium text-lg">New Teams</span>
      </div>
    </div>

    <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
      <button
        onClick={() => onNavigate("notifications")}
        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        Next →
      </button>
    </div>
  </div>
);

export default TeamsPage;

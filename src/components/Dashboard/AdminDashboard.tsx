import React, { useState } from 'react';
import {
  ShoppingCart, Users, Package, LayoutDashboard
} from 'lucide-react';
import DashBoardContent from './dashBoardContent';
import Orders from './orders';
import Products from './products';
import Userss from './users';


const AdminDashboard: React.FC = () => {
  const [sidebar, setSidebar] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
            <LayoutDashboard className="h-6 w-6 text-blue-600" />
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setSidebar("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
              sidebar === "dashboard"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <LayoutDashboard className="h-6 w-6" /> Dashboard
          </button>

          <button
            onClick={() => setSidebar("products")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
              sidebar === "products"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <Package className="h-5 w-5" /> Products
          </button>

          <button
            onClick={() => setSidebar("orders")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
              sidebar === "orders"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <ShoppingCart className="h-5 w-5" /> Orders
          </button>

          <button
            onClick={() => setSidebar("users")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
              sidebar === "users"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <Users className="h-5 w-5" /> Users
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {sidebar === "dashboard" && <DashBoardContent />}
        {sidebar === "products" && <Products />}
        {sidebar === "orders" && <Orders />}
        {sidebar === "users" && <Userss />}
      </main>
    </div>
  );
};

export default AdminDashboard;

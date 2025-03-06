'use client';

import { useState, useEffect } from 'react';

// Data dummy untuk goods
const goodsData = [
  { id: 1, name: 'Laptop Pro X', category: 'Electronics', price: '$1200', stock: 15 },
  { id: 2, name: 'Wireless Headphones', category: 'Audio', price: '$150', stock: 50 },
  { id: 3, name: 'Smartphone Z10', category: 'Electronics', price: '$800', stock: 25 },
  { id: 4, name: 'Bluetooth Speaker', category: 'Audio', price: '$70', stock: 100 },
  { id: 5, name: 'Gaming Mouse', category: 'Gaming', price: '$50', stock: 30 },
  { id: 6, name: '4K Monitor', category: 'Electronics', price: '$300', stock: 10 },
  { id: 7, name: 'VR Headset', category: 'Gaming', price: '$400', stock: 5 },
  { id: 8, name: 'Mechanical Keyboard', category: 'Gaming', price: '$120', stock: 20 },
  { id: 9, name: 'Smartwatch W2', category: 'Wearables', price: '$200', stock: 40 },
  { id: 10, name: 'Camera DSLR', category: 'Photography', price: '$600', stock: 8 },
];

export default function GoodsPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter data berdasarkan pencarian
  const filteredData = goodsData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset ke halaman pertama saat pencarian berubah
  }, [search]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-lg">
      {/* Header */}
      <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">Goods List</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
        />
      </div>

      {/* Responsive Table or Card Layout */}
      <div className="overflow-x-auto md:block hidden">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-white uppercase bg-teal-500">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-tl-lg">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 rounded-tr-lg">
                Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">{item.stock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No goods found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card Layout for Mobile */}
      <div className="md:hidden space-y-4">
        {paginatedData.length > 0 ? (
          paginatedData.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-all"
            >
              <p className="font-semibold text-gray-900">Name: {item.name}</p>
              <p className="text-gray-700">Category: {item.category}</p>
              <p className="text-gray-700">Price: {item.price}</p>
              <p className="text-gray-700">Stock: {item.stock}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No goods found</div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';

// Data dummy untuk booking
const bookingData = [
  { id: 1, customerName: 'John Doe', service: 'Cleaning', date: '2023-10-15', status: 'Confirmed' },
  { id: 2, customerName: 'Jane Smith', service: 'Repair', date: '2023-10-16', status: 'Pending' },
  { id: 3, customerName: 'Alice Johnson', service: 'Installation', date: '2023-10-17', status: 'Completed' },
  { id: 4, customerName: 'Bob Brown', service: 'Maintenance', date: '2023-10-18', status: 'Confirmed' },
  { id: 5, customerName: 'Charlie White', service: 'Cleaning', date: '2023-10-19', status: 'Pending' },
  { id: 6, customerName: 'David Green', service: 'Repair', date: '2023-10-20', status: 'Completed' },
  { id: 7, customerName: 'Emma Blue', service: 'Installation', date: '2023-10-21', status: 'Confirmed' },
  { id: 8, customerName: 'Frank Black', service: 'Maintenance', date: '2023-10-22', status: 'Pending' },
  { id: 9, customerName: 'Grace Yellow', service: 'Cleaning', date: '2023-10-23', status: 'Completed' },
  { id: 10, customerName: 'Henry Orange', service: 'Repair', date: '2023-10-24', status: 'Confirmed' },
];

export default function BookingPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter data berdasarkan pencarian
  const filteredData = bookingData.filter(
    (item) =>
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.service.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-lg">
      {/* Header */}
      <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">Booking List</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by customer name, service, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-white uppercase bg-teal-500">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-tl-lg">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Service
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3 rounded-tr-lg">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.customerName}</td>
                  <td className="px-6 py-4">{item.service}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Confirmed'
                          ? 'bg-green-200 text-green-800'
                          : item.status === 'Pending'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No booking data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
'use client';

import { useState, useEffect } from 'react';

// Data dummy untuk customer
const customerData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', address: 'New York, USA' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', address: 'London, UK' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '+1122334455', address: 'Sydney, Australia' },
  { id: 4, name: 'Bob Brown', email: 'bob@example.com', phone: '+2233445566', address: 'Berlin, Germany' },
  { id: 5, name: 'Charlie White', email: 'charlie@example.com', phone: '+3344556677', address: 'Paris, France' },
  { id: 6, name: 'David Green', email: 'david@example.com', phone: '+4455667788', address: 'Tokyo, Japan' },
  { id: 7, name: 'Emma Blue', email: 'emma@example.com', phone: '+5566778899', address: 'Toronto, Canada' },
  { id: 8, name: 'Frank Black', email: 'frank@example.com', phone: '+6677889900', address: 'Dubai, UAE' },
  { id: 9, name: 'Grace Yellow', email: 'grace@example.com', phone: '+7788990011', address: 'Singapore' },
  { id: 10, name: 'Henry Orange', email: 'henry@example.com', phone: '+8899001122', address: 'Bangkok, Thailand' },
];

export default function CustomerTable() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter data berdasarkan pencarian
  const filteredData = customerData.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset ke halaman pertama saat pencarian berubah
  }, [search]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-lg">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
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
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 rounded-tr-lg">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{customer.name}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4">{customer.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No customer data found
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
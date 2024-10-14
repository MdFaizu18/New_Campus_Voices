import React, { useState } from 'react'
import {
    Search,
    ChevronDown,
    ChevronUp,
    Edit,
    Trash2,
    Menu,
    Bell
} from 'lucide-react';
import AdminSidebar from '../../components/res/AdminSidebar'

// Mock data for staff members
const staffMembers = [
    // { id: 1, name: "John Doe", department: "Computer Science", position: "Professor", email: "john.doe@example.com",email: "john.doe@example.com",email: "john.doe@example.com",email: "john.doe@example.com" },
    // { id: 2, name: "Jane Smith", department: "Physics", position: "Associate Professor", email: "jane.smith@example.com",email: "john.doe@example.com" ,email: "john.doe@example.com",email: "john.doe@example.com"}, 
    // { id: 3, name: "Bob Johnson", department: "Mathematics", position: "Assistant Professor", email: "bob.johnson@example.com",email: "john.doe@example.com",email: "john.doe@example.com",email: "john.doe@example.com" }, 
    // { id: 4, name: "Alice Brown", department: "Chemistry", position: "Lecturer", email: "alice.brown@example.com",email: "john.doe@example.com",email: "john.doe@example.com",email: "john.doe@example.com" },
    // { id: 5, name: "Charlie Davis", department: "Biology", position: "Professor", email: "charlie.davis@example.com",email: "john.doe@example.com",email: "john.doe@example.com",email: "john.doe@example.com" },
]

export default function ReviewStaff() {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState('name')
    const [sortDirection, setSortDirection] = useState('asc')

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    const sortedStaff = [...staffMembers].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
        return 0
    })

    const filteredStaff = sortedStaff.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="flex h-screen bg-gray-100">
        <AdminSidebar/>
            {/* Sidebar component would go here */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <button className="mr-4 md:hidden">
                                <Menu className="h-6 w-6" />
                            </button>
                            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                                Staff Management
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                <Bell className="h-5 w-5 text-gray-600" />
                            </button>
                            <div className="relative">
                                <button className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                                    <span className="text-sm font-medium text-white">HOD</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-white-100 to-pink-100 py-6">
                    <div className="max-w-7l mx-5">
                        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
                                    Total Staff: {staffMembers.length}
                                </h3>
                                <div className="w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Search staff..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('name')}
                                            >
                                                Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('department')}
                                            >
                                                Department {sortColumn === 'department' && (sortDirection === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('position')}
                                            >
                                                Position {sortColumn === 'position' && (sortDirection === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Staff Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Department Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Mobile No
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredStaff.map((staff) => (
                                            <tr key={staff.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{staff.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.department}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.position}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
import React, { useState } from 'react'
import AdminSidebar from '../../components/res/AdminSidebar'
import { UserPlus, Award, AlertCircle, Check, Bell, Menu } from 'lucide-react'

export default function AddStaffPage() {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleEmployeeSubmit = (e) => {
        e.preventDefault()
        // Handle employee form submission logic here
        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 3000)
    }

    const handleComplimentSubmit = (e) => {
        e.preventDefault()
        // Handle compliment form submission logic here
        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 3000)
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <button
                                className="mr-4 md:hidden"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                                Add New Staff
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
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-100 to-pink-100 p-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="bg-white rounded-lg shadow-xl p-8">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <UserPlus className="mr-2 text-purple-600" />
                                Employee Information
                            </h2>
                            <form onSubmit={handleEmployeeSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Employee form fields (unchanged) */}
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="E.g., John"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="E.g., Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="staffCode" className="block text-sm font-medium text-gray-700 mb-1">
                                        Staff Code
                                    </label>
                                    <input
                                        type="text"
                                        id="staffCode"
                                        name="staffCode"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="E.g., 321001"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="E.g., john.doe@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="E.g., (123) 456-7890"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        id="department"
                                        name="department"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="E.g., Computer Science"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="departmentCode" className="block text-sm font-medium text-gray-700 mb-1">
                                        Department Code
                                    </label>
                                    <input
                                        type="text"
                                        id="departmentCode"
                                        name="departmentCode"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="E.g., CS001"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                                        Experience (Years)
                                    </label>
                                    <input
                                        type="number"
                                        id="experience"
                                        name="experience"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="E.g., 5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Position
                                    </label>
                                    <select
                                        id="jobPosition"
                                        name="jobPosition"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    >
                                        <option value="">Select a position</option>
                                        <option value="professor">Professor</option>
                                        <option value="assistant_professor">Assistant Professor</option>
                                        <option value="lecturer">Lecturer</option>
                                        <option value="staff">Administrative Staff</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors"
                                    >
                                        Add Employee
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white rounded-lg shadow-xl p-8">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <Award className="mr-2 text-purple-600" />
                                Compliment Request
                            </h2>
                            <form onSubmit={handleComplimentSubmit} className="space-y-6">
                                {/* Compliment form fields (unchanged) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="complimentName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="complimentName"
                                            name="complimentName"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="complimentStaffCode" className="block text-sm font-medium text-gray-700 mb-1">
                                            Staff Code
                                        </label>
                                        <input
                                            type="text"
                                            id="complimentStaffCode"
                                            name="complimentStaffCode"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="block text-sm font-medium text-gray-700 mb-2">Compliment Categories</p>
                                    <div className="space-y-2">
                                        {['Teaching', 'Collaborative', 'Syllabus Completion', 'Communication', 'Out of Knowledge'].map((category) => (
                                            <label key={category} className="flex items-center">
                                                <input type="checkbox" name="categories" value={category} className="mr-2" />
                                                <span>{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="newQuotient" className="block text-sm font-medium text-gray-700 mb-1">
                                        New Quotient
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            id="newQuotient"
                                            name="newQuotient"
                                            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                        <button
                                            type="button"
                                            className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors"
                                >
                                    Submit Compliment
                                </button>
                            </form>
                        </div>

                        <div className="bg-white rounded-lg shadow-xl p-8">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <AlertCircle className="mr-2 text-purple-600" />
                                Admin Instructions
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>Ensure all required fields are filled out accurately before submitting.</li>
                                <li>Double-check the Staff Code and Department Code for uniqueness and correctness.</li>
                                <li>Use the Compliment Request form to recognize outstanding staff performance.</li>
                                <li>When adding a new quotient, make sure it's relevant and constructive.</li>
                                <li>Review all submissions for accuracy before finalizing the addition of a new staff member.</li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>

            {showSuccessMessage && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center">
                    <Check className="mr-2" />
                    Form submitted successfully!
                </div>
            )}
        </div>
    )
}
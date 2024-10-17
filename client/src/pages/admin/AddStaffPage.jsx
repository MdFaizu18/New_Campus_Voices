
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AdminSidebar from '../../components/res/AdminSidebar'
import { UserPlus, AlertCircle, Award,Check, Bell, Menu, ChevronRight } from 'lucide-react'
import { toast } from 'react-toastify';
import customFetch from '../../utils/CustomFetch';
import { useNavigate, useParams } from 'react-router-dom';




export default function EnhancedAddStaffPage() {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [newQuotient, setNewQuotient] = useState('');

    // Form state variables for employee information
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [staffCode, setStaffCode] = useState('');
    const [experience, setExperience] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [departmentCode, setDepartmentCode] = useState('');
    const [department, setDepartment] = useState('');
    const [jobPosition, setJobPosition] = useState('');


    // Function to submit employee data
    const handleEmployeeSubmit = async (e) => {
        e.preventDefault();

        try {
            // const response = await customFetch.get("/dashboard-student/current-user");
            // Prepare form data for submission
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("staffCode", staffCode);
            formData.append("experience", experience);
            formData.append("phoneNumber", phoneNumber);
            formData.append("email", email);
            formData.append("departmentCode", departmentCode);
            formData.append("department", department);
            formData.append("jobPosition", jobPosition);
            const data = Object.fromEntries(formData);

            // Submit feedback via customFetch
            await customFetch.post('/dashboard-head/staff', data);
            toast.success("Employee added successfully");

            // Clear form fields after submission
            setFirstName('');
            setLastName('');
            setStaffCode('');
            setExperience('');
            setPhoneNumber('');
            setEmail('');
            setDepartmentCode('');
            setDepartment('');
            setJobPosition('');

        } catch (error) {
            console.error("Error adding employee:", error); // Log the error for debugging
            toast.error(error?.response?.data?.msg || "Failed to add employee");
        }
    };

    const handleComplimentSubmit =() => {}

    const handleCategoryToggle = (category) => {
        setCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
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
                    <div className="max-w-5xl mx-auto space-y-8">
                        <motion.div className="bg-white rounded-lg shadow-2xl p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <motion.h2 className="text-3xl font-bold mb-6 text-center text-purple-600 flex items-center justify-center" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                                <UserPlus className="mr-2 text-pink-500" size={32} /> Employee Information
                            </motion.h2>
                            <form onSubmit={handleEmployeeSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Input fields for the form */}

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-md"
                                        required
                                    />
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-md"
                                        required
                                    />
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <select
                                        id="department"
                                        name="department"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-md"
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        <option value="CSE">CSE</option>
                                        <option value="ECE">ECE</option>
                                        <option value="MECH">MECH</option>
                                        <option value="EEE">EEE</option>
                                        <option value="AIML">AIML</option>
                                    </select>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                                    <input
                                        type="text"
                                        id="experience"
                                        name="experience"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-md"
                                        required
                                    />
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <label htmlFor="departmentCode" className="block text-sm font-medium text-gray-700 mb-1">Department Code</label>
                                    <input
                                        type="text"
                                        id="departmentCode"
                                        name="departmentCode"
                                        value={departmentCode}
                                        onChange={(e) => setDepartmentCode(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-md"
                                        required
                                    />
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <label htmlFor="staffCode" className="block text-sm font-medium text-gray-700 mb-1">Staff Code</label>
                                    <input
                                        type="text"
                                        id="staffCode"
                                        name="staffCode"
                                        value={staffCode}
                                        onChange={(e) => setStaffCode(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-md"
                                        required
                                    />
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-md"
                                        required
                                    />
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-md"
                                        required
                                    />
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700 mb-1">Job Position</label>
                                    <select
                                        id="jobPosition"
                                        name="jobPosition"
                                        value={jobPosition}
                                        onChange={(e) => setJobPosition(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-md"
                                        required
                                    >
                                        <option value="">Select Job Position</option>
                                        <option value="Assistant Professor">Assistant Professor</option>
                                        <option value="Assistant HOD">Assistant HOD</option>
                                        <option value="Administrative Staff">Administrative Staff</option>
                                        <option value="Lecturer">Lecturer</option>
                                    </select>
                                </motion.div>

                                {/* <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                                    <input
                                        type="file"
                                        id="profileImage"
                                        name="profileImage"
                                        onChange={(e) => setProfileImage(e.target.files[0])}
                                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-md"
                                    />
                                </motion.div> */}

                                {/* Submit button */}
                                <motion.button type="submit" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }} className="md:col-span-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-md" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Add Employee
                                    <ChevronRight className="ml-2 w-5 h-5" />
                                </motion.button>
                            </form>
                        </motion.div>


                        {/* to give compliement request  */}
                        <motion.div
                            className="bg-white rounded-lg shadow-2xl p-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <motion.h2
                                className="text-3xl font-bold mb-6 text-center text-purple-600 flex items-center justify-center"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Award className="mr-2 text-pink-500" size={32} />
                                Compliment Request
                            </motion.h2>
                            <form onSubmit={handleComplimentSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <label htmlFor="complimentName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="complimentName"
                                            name="complimentName"
                                            className="w-full px-4 py-2 border-2 border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                            required
                                        />
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <label htmlFor="complimentStaffCode" className="block text-sm font-medium text-gray-700 mb-1">
                                            Staff Code
                                        </label>
                                        <input
                                            type="text"
                                            id="complimentStaffCode"
                                            name="complimentStaffCode"
                                            className="w-full px-4 py-2 border-2 border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                            required
                                        />
                                    </motion.div>
                                </div>
                                <div>
                                    <p className="block text-lg font-medium text-gray-700 mb-3">Compliment Categories</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {['Teaching', 'Collaborative', 'Syllabus Completion', 'Communication', 'Out of Knowledge'].map((category) => (
                                            <motion.button
                                                key={category}
                                                type="button"
                                                onClick={() => handleCategoryToggle(category)}
                                                className={`flex items-center justify-center p-3 rounded-lg transition-all duration-300 ${categories.includes(category)
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <span className="text-sm">{category}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <label htmlFor="newQuotient" className="block text-sm font-medium text-gray-700 mb-1">
                                        New Quotient
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            id="newQuotient"
                                            name="newQuotient"
                                            value={newQuotient}
                                            onChange={(e) => setNewQuotient(e.target.value)}
                                            className="flex-grow px-4 py-2 border-2 border-purple-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setNewQuotient(`prev => ${prev} +`)}
                                            className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition-colors"
                                            aria-label="Add to quotient"
                                        >
                                            +
                                        </button>
                                    </div>
                                </motion.div>
                                <motion.button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Submit Compliment
                                    <ChevronRight className="ml-2 w-5 h-5" />
                                </motion.button>
                            </form>
                        </motion.div>



                          {/* Admin instructions */}                                    
                        <motion.div
                            className="bg-white rounded-lg shadow-2xl p-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
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
                        </motion.div>
                    </div>
                </main>
            </div>

            {showSuccessMessage && (
                <motion.div
                    className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                >
                    <Check className="mr-2" />
                    Form submitted successfully!
                </motion.div>
            )}
        </div>
    )
}















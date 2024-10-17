import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SortAsc, SortDesc, Calendar, ChevronDown, X, ChevronLeft, ChevronRight, Bell, Menu } from 'lucide-react'
import AdminSidebar from '../../components/res/AdminSidebar'
import customFetch from '../../utils/CustomFetch'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


const ImagePreviewModal = ({ isOpen, onClose, imageSrc, name }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white p-4 rounded-lg shadow-xl max-w-2xl max-h-[80vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">{name}'s Profile Picture</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <img src={imageSrc} alt={name} className="w-full h-auto rounded-lg" />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const getYearLabel = (year) => {
    switch (year) {
        case 'I':
            return '1st Year';
        case 'II':
            return '2nd Year';
        case 'III':
            return '3rd Year';
        case 'IV':
            return '4th Year';
        default:
            return `${year} Year`; // Fallback for any other year not specified
    }
};

const FeedbackCard = ({ feedback, isPersonalView }) => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const openImageModal = () => setIsImageModalOpen(true);
    const closeImageModal = () => setIsImageModalOpen(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
            >
                <div className={`h-2 ${feedback.messageType === 'secret' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}></div>
                <div className="px-8 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {!isPersonalView && feedback.messageType !== 'secret' && (
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold overflow-hidden cursor-pointer"
                                    onClick={feedback.image ? openImageModal : undefined}
                                >
                                    {feedback.image ? (
                                        <img src={feedback.image} alt={feedback.name} className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        feedback.name.split(' ').map(n => n[0]).join('')
                                    )}
                                </motion.div>
                            )}
                            <div>
                                {!isPersonalView && feedback.messageType !== 'secret' && (
                                    <h3 className="text-lg font-semibold">{feedback.name}</h3>
                                )}
                                <p className="text-sm text-gray-500">
                                    {new Date(feedback.createdAt).toLocaleDateString('en-GB')} &nbsp;
                                    {new Date(feedback.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">{feedback.category}</span>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full border border-gray-300">{feedback.department}</span>
                            {!isPersonalView && feedback.messageType === 'normal' && (
                                <span className="px-2 py-1 text-xs font-semibold rounded-full border border-gray-300">
                                    {getYearLabel(feedback.year)}
                                </span>
                            )}
                            {!isPersonalView && feedback.messageType === 'secret' && (
                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-black-800">Personal</span>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <p>{feedback.message}</p>
                    </div>
                </div>
            </motion.div>
            <ImagePreviewModal
                isOpen={isImageModalOpen}
                onClose={closeImageModal}
                imageSrc={feedback.image}
                name={feedback.name}
            />
        </>
    );
};


const DatePicker = ({ selectedDate, onChange }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

    const isSelected = (day) => {
        return selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth.getMonth() &&
            selectedDate.getFullYear() === currentMonth.getFullYear()
    }

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    }

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    }

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-100">
                    <ChevronLeft size={20} />
                </button>
                <h2 className="text-lg font-semibold">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-100">
                    <ChevronRight size={20} />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-gray-500 text-sm">
                        {day}
                    </div>
                ))}
                {emptyDays.map((_, index) => (
                    <div key={`empty-${index}`} className="h-8"></div>
                ))}
                {days.map((day) => (
                    <button
                        key={day}
                        onClick={() => onChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${isSelected(day)
                            ? 'bg-purple-600 text-white'
                            : 'hover:bg-gray-100'
                            }`}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default function EnhancedFeedbackReview() {
    const [isPersonalView, setIsPersonalView] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [filterCategory, setFilterCategory] = useState('All')
    const [filterDepartment, setFilterDepartment] = useState('All')
    const [sortOrder, setSortOrder] = useState('newest')
    const [filteredFeedbacks, setFilteredFeedbacks] = useState(feedbacks)
    const [dateRange, setDateRange] = useState({ from: null, to: null })
    const [activeTab, setActiveTab] = useState('all')
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [datePickerType, setDatePickerType] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const data = await customFetch.get('/dashboard-student/feedbacks');
                setFeedbacks(data.data.feeds); // Set the fetched feedbacks
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    toast.error("Please Login !!");
                    navigate('/login-admin'); // Redirect to login-admin
                } else {
                    toast.error("An error occurred. Please try again.");
                    navigate('/'); // Redirect to home
                }
            } finally {
                setLoading(false); // Set loading to false once fetching is complete
            }
        };

        fetchFeedbacks(); // Call the fetch function
    }, [navigate]); // Dependency array includes navigat

    useEffect(() => {
        if (activeTab === 'all') {
            setFilteredFeedbacks(feedbacks.filter(f => f.messageType === "normal"));
        } else if (activeTab === 'personal') {  // Change else to else if
            setFilteredFeedbacks(feedbacks.filter(f => f.messageType === "secret"));
        } else if (activeTab === 'normal') {  // Change else to else if
            setFilteredFeedbacks(feedbacks.filter(f => f.messageType === "normal"));
        }
    }, [activeTab, feedbacks]);





    const handleDateSelect = (date) => {
        if (datePickerType === 'from') {
            setDateRange(prev => ({ ...prev, from: date }))
        } else {
            setDateRange(prev => ({ ...prev, to: date }))
        }
        setShowDatePicker(false)
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                            Feedback Review
                        </h2>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                <Bell className="h-5 w-5 text-gray-600" />
                            </button>
                            <div className="relative">
                                <button className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                                    <span className="text-sm font-medium text-white">AD</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Filters and Search */}
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                <div className="flex flex-wrap items-center gap-4 w-full">
                                    <div className="relative flex-grow">
                                        <input
                                            type="text"
                                            placeholder="Search feedbacks..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>

                                    <div className="relative flex-grow">
                                        <select
                                            value={filterDepartment}
                                            onChange={(e) => setFilterDepartment(e.target.value)}
                                            className="appearance-none w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="All">All Years</option>
                                            <option value="1st Year">1st Year</option>
                                            <option value="2nd Year">2nd Year</option>
                                            <option value="3rd Year">3rd Year</option>
                                            <option value="4th Year">4th Year</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                    </div>
                                    <div className="relative flex-grow">
                                        <button
                                            onClick={() => {
                                                setShowDatePicker(true)
                                                setDatePickerType('from')
                                            }}
                                            className="px-4 py-2 w-full border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <Calendar className="inline-block mr-2 h-4 w-4" />
                                            {dateRange.from ? dateRange.from.toLocaleDateString() : 'From'}
                                        </button>
                                    </div>
                                    <div className="relative flex-grow">
                                        <button
                                            onClick={() => {
                                                setShowDatePicker(true)
                                                setDatePickerType('to')
                                            }}
                                            className="px-4 py-2 w-full border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <Calendar className="inline-block mr-2 h-4 w-4" />
                                            {dateRange.to ? dateRange.to.toLocaleDateString() : 'To'}
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                                        className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        {sortOrder === 'newest' ? <SortDesc className="h-5 w-5" /> : <SortAsc className="h-5 w-5" />}
                                    </button>
                                </div>
                                {/* <div className="flex items-center space-x-2">
                                    <span className={font-medium ${isPersonalView ? 'text-purple-600' : 'text-gray-600'}}>
                                        Personal View
                                    </span>
                                    <button
                                        onClick={() => setIsPersonalView(!isPersonalView)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${isPersonalView ? 'bg-purple-600' : 'bg-gray-200'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPersonalView ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div> */}
                            </div>

                            {/* Tabs */}
                            <div className="mb-6">
                                <div className="flex space-x-1">
                                    {['normal', 'personal'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-t-lg ${activeTab === tab
                                                ? 'bg-white text-purple-600 border-t border-l border-r border-gray-200'
                                                : 'bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Feedback List */}
                        <div className="space-y-4">
                            <AnimatePresence>
                                {filteredFeedbacks.map(feedback => (
                                    <motion.div
                                        key={feedback.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FeedbackCard feedback={feedback} isPersonalView={isPersonalView} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Date Picker Modal */}
            {showDatePicker && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Select  {datePickerType === 'from' ? 'Start' : 'End'} Date</h2>
                            <button onClick={() => setShowDatePicker(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <DatePicker
                            selectedDate={datePickerType === 'from' ? dateRange.from : dateRange.to}
                            onChange={handleDateSelect}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

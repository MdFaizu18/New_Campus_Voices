import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Lock, Search, Filter, SortAsc, SortDesc, Zap, Calendar, ChevronDown, X, ChevronLeft, ChevronRight, Bell, Menu } from 'lucide-react'
import AdminSidebar from '../../components/res/AdminSidebar'


const feedbacks = [
    { id: 1, user: "Alice Johnson", content: "The new library resources are fantastic!", isPersonal: false, timestamp: "2023-06-15 14:30", category: "Academic", sentiment: "Positive", department: "1st Year" },
    { id: 2, user: "Bob Smith", content: "I'm having trouble accessing the online course materials.", isPersonal: false, timestamp: "2023-06-16 09:45", category: "Technical", sentiment: "Negative", department: "2nd Year" },
    { id: 3, user: "Charlie Brown", content: "The cafeteria food quality has improved significantly.", isPersonal: false, timestamp: "2023-06-17 12:15", category: "Facilities", sentiment: "Positive", department: "3rd Year" },
    { id: 4, user: "Diana Prince", content: "I'm experiencing some personal issues that are affecting my studies.", isPersonal: true, timestamp: "2023-06-18 16:20", category: "Personal", sentiment: "Neutral", department: "4th Year" },
    { id: 5, user: "Ethan Hunt", content: "The new gym equipment is great, but we need more treadmills.", isPersonal: false, timestamp: "2023-06-19 08:00", category: "Facilities", sentiment: "Mixed", department: "2nd Year" },
]

const FeedbackCard = ({ feedback, showPersonal }) => {
    const sentimentColor = {
        Positive: 'bg-green-100 text-green-800',
        Negative: 'bg-red-100 text-red-800',
        Neutral: 'bg-gray-100 text-gray-800',
        Mixed: 'bg-yellow-100 text-yellow-800'
    }

    return (
     
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <div className={`h-2 ${feedback.isPersonal ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}></div>
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                            {feedback.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{feedback.user}</h3>
                            <p className="text-sm text-gray-500">{feedback.timestamp}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">{feedback.category}</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${sentimentColor[feedback.sentiment]}`}>{feedback.sentiment}</span>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full border border-gray-300">{feedback.department}</span>
                    </div>
                </div>
                <div className="mt-4 mb-5">
                    {feedback.isPersonal && !showPersonal ? (
                        <div className="flex items-center space-x-2 text-yellow-600">
                            <Lock size={16} />
                            <span>This feedback contains personal information.</span>
                        </div>
                    ) : (
                        <p>{feedback.content}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

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

export default function TailwindFeedbackReview() {
    const [showPersonal, setShowPersonal] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [filterCategory, setFilterCategory] = useState('All')
    const [filterDepartment, setFilterDepartment] = useState('All')
    const [sortOrder, setSortOrder] = useState('newest')
    const [filteredFeedbacks, setFilteredFeedbacks] = useState(feedbacks)
    const [dateRange, setDateRange] = useState({ from: null, to: null })
    const [activeTab, setActiveTab] = useState('all')
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [datePickerType, setDatePickerType] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        let result = feedbacks
        if (searchTerm) {
            result = result.filter(feedback =>
                feedback.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.user.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        if (filterCategory !== 'All') {
            result = result.filter(feedback => feedback.category === filterCategory)
        }
        if (filterDepartment !== 'All') {
            result = result.filter(feedback => feedback.department === filterDepartment)
        }
        if (dateRange.from && dateRange.to) {
            result = result.filter(feedback => {
                const feedbackDate = new Date(feedback.timestamp)
                return feedbackDate >= dateRange.from && feedbackDate <= dateRange.to
            })
        }
        if (activeTab !== 'all') {
            result = result.filter(feedback => feedback.sentiment.toLowerCase() === activeTab)
        }
        result.sort((a, b) => {
            if (sortOrder === 'newest') {
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            } else {
                return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            }
        })
        setFilteredFeedbacks(result)
    }, [searchTerm, filterCategory, filterDepartment, sortOrder, dateRange, activeTab])

    const handleTogglePersonal = () => {
        if (showPersonal) {
            setShowPersonal(false)
        } else {
            setIsDialogOpen(true)
        }
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (password === 'admin123') {
            setShowPersonal(true)
            setIsDialogOpen(false)
            setPassword('')
            setError('')
        } else {
            setError('Incorrect password. Please try again.')
        }
    }

    const handleDateSelect = (date) => {
        if (datePickerType === 'from') {
            setDateRange(prev => ({ ...prev, from: date }))
        } else {
            setDateRange(prev => ({ ...prev, to: date }))
        }
        setShowDatePicker(false)
    }

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <button className="mr-4 md:hidden" onClick={toggleSidebar}>
                                <Menu className="h-6 w-6" />
                            </button>
                            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                                Feedback Review
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

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto bg-gray-50 px-10 py-4">
                    {/* <div className="max-w-7xl mx-auto space-y-6"> */}
                        {/* <div className="bg-white rounded-lg shadow-lg p-6 mb-8"> */}
                        
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search feedbacks..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            <div className="relative">
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="appearance-none w-48 pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="All">All Categories</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Facilities">Facilities</option>
                                    <option value="Personal">Personal</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <select
                                    value={filterDepartment}
                                    onChange={(e) => setFilterDepartment(e.target.value)}
                                    className="appearance-none w-48 pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="All">All Departments</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setShowDatePicker(true)
                                        setDatePickerType('from')
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <Calendar className="inline-block mr-2 h-4 w-4" />
                                    {dateRange.from ? dateRange.from.toLocaleDateString() : 'From'}
                                </button>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setShowDatePicker(true)
                                        setDatePickerType('to')
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                        <div className="flex items-center space-x-2">
                            <span className={`font-medium ${showPersonal ? 'text-purple-600' : 'text-gray-600'}`}>
                                Personal Feedbacks
                            </span>
                            <button
                                onClick={handleTogglePersonal}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${showPersonal ? 'bg-purple-600' : 'bg-gray-200'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showPersonal ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex space-x-1">
                            {['all', 'positive', 'negative', 'neutral'].map((tab) => (
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

                    <div className="h-[600px] overflow-y-auto pr-4">
                        <AnimatePresence>
                            {filteredFeedbacks.map(feedback => (
                                <motion.div
                                    key={feedback.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FeedbackCard feedback={feedback} showPersonal={showPersonal} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Feedback Overview</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Total Feedbacks</span>
                                <span className="font-bold">{feedbacks.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Positive Sentiment</span>
                                <span className="font-bold text-green-600">68%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Negative Sentiment</span>
                                <span className="font-bold text-red-600">22%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Neutral Sentiment</span>
                                <span className="font-bold text-gray-600">10%</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
                        <div className="space-y-2">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span>Academic</span>
                                    <span className="font-bold">40%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span>Technical</span>
                                    <span className="font-bold">25%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span>Facilities</span>
                                    <span className="font-bold">20%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span>Personal</span>
                                    <span className="font-bold">15%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-colors">
                                <Zap className="inline-block mr-2 h-4 w-4" /> Generate Report
                            </button>
                            <button className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                <MessageCircle className="inline-block mr-2 h-4 w-4" /> Respond to Feedbacks
                            </button>
                            <button className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                <Filter className="inline-block mr-2 h-4 w-4" /> Manage Categories
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Enter Admin Password</h2>
                        <p className="text-gray-600 mb-4">Please enter the admin password to view personal feedbacks.</p>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsDialogOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDatePicker && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Select {datePickerType === 'from' ? 'Start' : 'End'} Date</h2>
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
        </div>
      //  </div>
        // </div>
    )
}
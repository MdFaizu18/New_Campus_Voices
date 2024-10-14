import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Lock, FileText, Calendar, Clock, Filter, Trash2 } from 'lucide-react';
import Navbar from '../../components/res/Navbar';
import { redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../../utils/CustomFetch';
import { toast } from 'react-toastify';
import NoImg from '../../assets/images/userprofile/pngImg03.jpg'

export const loader = async () => {
    try {
        const data = await customFetch.get('/dashboard-student/feedbacks');
        return data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            // throw new Error('Access Denied! You are not authorized to access this page.');
            toast.error("Please Login !!")
            return redirect('/')
        } else {
            toast.error("Error occurred while fetching data");
            return redirect('/')
        }
    }
};

const FeedbackCard = ({ feedback, onDelete }) => {
    const { message, createdAt, _id, messageType } = feedback;

    const handleDelete = async () => {
        console.log("Deleting feedback with ID:", _id); // Log the ID for debugging
        try {
            await customFetch.delete(`/dashboard-student/feedbacks/${_id}`);
            onDelete(_id); // Call onDelete prop to remove feedback from the list
            toast.success("Feedback deleted successfully!");
        } catch (error) {
            console.error("Error deleting feedback:", error); // Log the error for debugging
            toast.error("Error occurred while deleting feedback");
        }
    };

    // Format date and time from createdAt
    const date = new Date(createdAt).toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
    const time = new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as HH:MM

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-md p-6 mb-4"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-lg font-medium text-gray-600">Feedback</span>
                    {messageType === 'secret' && (
                        <span className="ml-2 bg-[#7F39E9] text-white text-xs font-bold px-2 rounded">Personal</span>
                    )}
                </div>
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
            <p className="text-gray-800 mb-4 text-lg">{message}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{date}</span>
                </div>
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{time}</span>
                </div>
            </div>
        </motion.div>
    );
};

const CountCard = ({ icon: Icon, count, label }) => (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">{count}</h3>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <p className="text-lg text-white">{label}</p>
    </div>
);

export default function FeedPage() {
    const data = useLoaderData();
    const feeds = data.data.feeds;
    const normalFeedbacksCount = data.data.normalFeedbacksCount;
    const personalFeedbacksCount = data.data.personalFeedbacksCount;
    const feedsTotal = data.data.feedsTotal;

    const [filter, setFilter] = useState('All');
    const [feedbackList, setFeedbackList] = useState(feeds); // Manage state for feedback list

    const categories = ['All', 'Academics', 'Facilities', 'Campus Life', 'Personal'];

    // Assuming 'filter' is the selected category
    const filteredFeedback = filter === 'All'
        ? feedbackList
        : feedbackList.filter(f => f.category === filter);


    const handleDeleteFeedback = (id) => {
        setFeedbackList(prev => prev.filter(feedback => feedback._id !== id));
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-gray-900 mb-8 text-center"
                    >
                        Your Feedback Feed
                    </motion.h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <CountCard icon={MessageCircle} count={normalFeedbacksCount} label="Normal Feeds" />
                        <CountCard icon={Lock} count={personalFeedbacksCount} label="Secret  Feeds" />
                        <CountCard icon={FileText} count={feedsTotal} label="Total Feeds" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg shadow-md p-4 mb-8"
                    >
                        <div className="flex items-center mb-4">
                            <Filter className="w-5 h-5 text-blue-500 mr-2" />
                            <span className="text-lg font-medium text-gray-700">Filter by Category:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${filter === category
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <AnimatePresence>
                        {filteredFeedback.map((feedbackItem) => (
                            <FeedbackCard key={feedbackItem._id} feedback={feedbackItem} onDelete={handleDeleteFeedback} />
                        ))}
                    </AnimatePresence>

                    {filteredFeedback.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <img
                                src={NoImg}
                                alt="No feedback"
        
                                className=" min-h-[200px] min-w-[350px] h-[400px] w-[600px] mx-auto mb-4"
                            />
                            <h2 className="text-2xl font-bold text-gray-700">No Feedbacks to Display</h2>
                        </motion.div>
                    )}

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-gray-600 mt-8"
                    >
                        Note: If you delete your feed, it will be permanently removed from all locations.
                        The personal badge indicates feedback that is private to you.
                    </motion.p>
                </div>
            </div>
        </div>
    );
}

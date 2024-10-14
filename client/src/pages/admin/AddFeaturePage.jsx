import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/res/AdminSidebar';
import { PlusCircle, Edit2, Trash2, Save, X, Menu, Bell } from 'lucide-react';
import customFetch from '../../utils/CustomFetch';
import { toast } from 'react-toastify';

export default function AdminFeatureManagement() {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({ id: '', title: '', description: '', emoji: '' });
  const [editingId, setEditingId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch features on component mount
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await customFetch.get('/dashboard-admin/feature');
        setFeatures(response.data); // Adjust based on your API structure
      } catch (error) {
        console.error('Failed to fetch features', error);
        toast.error('Failed to load features.');
      }
    };
    fetchFeatures();
  }, []);

  const handleAddFeature = async () => {
    if (features.length >= 3) {
      toast.error('You have reached the maximum limit of 3 features.');
      return;
    }

    if (!newFeature.title || !newFeature.description || !newFeature.emoji) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const formData = {
        title: newFeature.title,
        description: newFeature.description,
        emoji: newFeature.emoji,
      };

      const response = await customFetch.post('/dashboard-admin/feature', formData);
      toast.success('Feature added successfully!');
      setFeatures([...features, { ...formData, _id: response.data.id }]);

      setNewFeature({ id: '', title: '', description: '', emoji: '' });
    } catch (error) {
      console.error('Error adding feature:', error);
      toast.error('An error occurred while adding the feature. Please try again.');
    }
  };

  const handleEditFeature = (id) => {
    const featureToEdit = features.find((f) => f._id === id); // Adjust this line to match your data structure
    if (featureToEdit) {
      setNewFeature(featureToEdit);
      setEditingId(featureToEdit._id); // Ensure you're setting the editingId correctly
    }
  };

  const handleUpdateFeature = async () => {
    if (!newFeature.title || !newFeature.description || !newFeature.emoji) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const formData = {
        title: newFeature.title,
        description: newFeature.description,
        emoji: newFeature.emoji,
      };

      await customFetch.patch(`/dashboard-admin/feature/${newFeature._id}`, formData);
      toast.success('Feature updated successfully!');

      setFeatures(features.map((f) => (f._id === newFeature._id ? { ...newFeature } : f))); // Use _id here

      setNewFeature({ id: '', title: '', description: '', emoji: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error updating feature:', error);
      toast.error('An error occurred while updating the feature. Please try again.');
    }
  };

  const handleDeleteFeature = async (id) => {
    try {
      await customFetch.delete(`/dashboard-admin/feature/${id}`);
      toast.success('Feature deleted successfully!');
      setFeatures(features.filter((f) => f._id !== id)); // Use _id here
    } catch (error) {
      console.error('Error deleting feature:', error);
      toast.error('An error occurred while deleting the feature. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setNewFeature({ id: '', title: '', description: '', emoji: '' });
    setEditingId(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <button
                className="mr-4 md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Add Features
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

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
              {features.map((feature) => (
                <div key={feature._id} className="bg-[#FBF5FF] rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-semibold text-gray-800">{feature.title}</h4>
                      <span className="text-3xl">{feature.emoji}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEditFeature(feature._id)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDeleteFeature(feature._id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                {editingId !== null ? 'Edit Feature' : 'Add New Feature'}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Feature Title"
                  value={newFeature.title}
                  onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  placeholder="Feature Description"
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="Emoji (e.g. 🚀) Press 'Windows key + period (.) '"
                  value={newFeature.emoji}
                  onChange={(e) => setNewFeature({ ...newFeature, emoji: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                {editingId ? (
                  <>
                    <button onClick={handleUpdateFeature} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                      <Save className="mr-2" /> Save
                    </button>
                    <button onClick={handleCancelEdit} className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                      <X className="mr-2" /> Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={handleAddFeature} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    <PlusCircle className="mr-2" /> Add Feature
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}





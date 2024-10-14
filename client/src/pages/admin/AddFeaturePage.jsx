import React, { useState } from 'react';
import AdminSidebar from '../../components/res/AdminSidebar';
import { PlusCircle, Edit2, Trash2, Save, X, Menu, Bell, LogOut } from 'lucide-react'

export default function AdminFeatureManagement() {
  const [features, setFeatures] = useState([])
  const [newFeature, setNewFeature] = useState({ title: '', description: '', emoji: '' })
  const [editingId, setEditingId] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleAddFeature = () => {
    if (features.length >= 3) {
      alert("Maximum of 3 features allowed")
      return
    }
    if (!newFeature.title || !newFeature.description || !newFeature.emoji) {
      alert("Please fill in all fields")
      return
    }
    setFeatures([...features, { ...newFeature, id: Date.now() }])
    setNewFeature({ title: '', description: '', emoji: '' })
  }

  const handleEditFeature = (id) => {
    const featureToEdit = features.find(f => f.id === id)
    if (featureToEdit) {
      setNewFeature(featureToEdit)
      setEditingId(id)
    }
  }

  const handleUpdateFeature = () => {
    if (!newFeature.title || !newFeature.description || !newFeature.emoji) {
      alert("Please fill in all fields")
      return
    }
    setFeatures(features.map(f => f.id === editingId ? { ...newFeature, id: f.id } : f))
    setNewFeature({ title: '', description: '', emoji: '' })
    setEditingId(null)
  }

  const handleDeleteFeature = (id) => {
    setFeatures(features.filter(f => f.id !== id))
  }

  const handleCancelEdit = () => {
    setNewFeature({ title: '', description: '', emoji: '' })
    setEditingId(null)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
     <AdminSidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
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

        

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8 ">

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
              {features.map((feature) => (
                <div key={feature.id} className="bg-[#FBF5FF] rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-semibold text-gray-800">{feature.title}</h4>
                      <span className="text-3xl">{feature.emoji}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEditFeature(feature.id)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDeleteFeature(feature.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>



            {/* Feature Form */}
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
                  placeholder="Emoji"
                  value={newFeature.emoji}
                  onChange={(e) => setNewFeature({ ...newFeature, emoji: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                {editingId !== null && (
                  <button onClick={handleCancelEdit} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <X className="inline-block mr-2" size={18} />
                    Cancel
                  </button>
                )}
                <button
                  onClick={editingId !== null ? handleUpdateFeature : handleAddFeature}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {editingId !== null ? (
                    <>
                      <Save className="inline-block mr-2" size={18} />
                      Update Feature
                    </>
                  ) : (
                    <>
                      <PlusCircle className="inline-block mr-2" size={18} />
                      Add Feature
                    </>
                  )}
                </button>
              </div>
            </div>

           

            {/* Quick Tips */}
            <div className="mt-12 bg-indigo-100 rounded-lg p-6 shadow-inner">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">Quick Tips</h3>
              <ul className="list-disc list-inside text-indigo-700 space-y-2">
                <li>You can add up to 3 features</li>
                <li>Use emojis to make your features stand out</li>
                <li>Keep descriptions concise and informative</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

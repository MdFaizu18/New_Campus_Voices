import React, { useState } from 'react'
import {
    Search,
    ChevronDown,
    ChevronUp,
    Edit,
    Trash2,
    Menu,
    Bell
} from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Mock data for staff members
const staffMembers = [
    { id: 1, name: "John Doe", department: "Computer Science", position: "Professor", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", department: "Physics", position: "Associate Professor", email: "jane.smith@example.com" },
    { id: 3, name: "Bob Johnson", department: "Mathematics", position: "Assistant Professor", email: "bob.johnson@example.com" },
    { id: 4, name: "Alice Brown", department: "Chemistry", position: "Lecturer", email: "alice.brown@example.com" },
    { id: 5, name: "Charlie Davis", department: "Biology", position: "Professor", email: "charlie.davis@example.com" },
]

export default function StaffViewPage() {
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
        <AdminSibebar/>
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
                                <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-600">AD</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-100 to-pink-100 p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
                                    Total Staff: {staffMembers.length}
                                </h3>
                                <div className="w-full md:w-64">
                                    <Input
                                        type="text"
                                        placeholder="Search staff..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">ID</TableHead>
                                            <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                                                Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                                            </TableHead>
                                            <TableHead className="cursor-pointer" onClick={() => handleSort('department')}>
                                                Department {sortColumn === 'department' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                                            </TableHead>
                                            <TableHead className="cursor-pointer" onClick={() => handleSort('position')}>
                                                Position {sortColumn === 'position' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                                            </TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredStaff.map((staff) => (
                                            <TableRow key={staff.id}>
                                                <TableCell className="font-medium">{staff.id}</TableCell>
                                                <TableCell>{staff.name}</TableCell>
                                                <TableCell>{staff.department}</TableCell>
                                                <TableCell>{staff.position}</TableCell>
                                                <TableCell>{staff.email}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm" className="mr-2">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
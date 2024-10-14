import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentOutlet from './pages/student/StudentOutlet';
import MainDashboardStudent from './pages/student/MainDashBoardStudent';
import AboutPage from './pages/AboutPage';
import FeedPage from './pages/student/FeedPage';
import UserProfile from './pages/student/UserProfile';
import FeedbackForm from './pages/student/FeedbackForm';
import StaffRatings from './pages/student/StaffRatings';
import AdminOutlet from './pages/admin/AdminOutlet'
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ViewFeedbackPage from './pages/admin/ViewFeedbackPage';
import AddStaffPage from './pages/admin/AddStaffPage';
import HomeOutlet from './pages/HomeOutlet';
import ErrorPage from './pages/ErrorPage';
import ReviewStaff from './pages/admin/ReviewStaff';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import StarRatingsReview from './pages/admin/StarRatingsReview';

// importing actions 
import { action as loginAction } from './pages/LoginPage';
import { action as registerAction } from './pages/RegisterPage';
// importing loaders 
import { loader as userProfileLoader } from './pages/student/UserProfile';
import { loader as stdDashboardLoader } from './pages/student/MainDashBoardStudent';
import { loader as feedLoader } from './pages/student/FeedPage';
import AddFeaturePage from './pages/admin/AddFeaturePage';


// Define the router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeOutlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,

      },
      {
        path: 'login',
        element: <LoginPage />,
        action: loginAction
      },
      {
        path: 'register',
        element: <RegisterPage />,
        action: registerAction
      },
      {
        path: '/redirect/forget-password',
        element: <ForgetPassword />,
        // action: forgetPasswordAction, 
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />,
    
      },
 
    ]
  },
  {
    path: 'student-dashboard',
    element: <StudentOutlet />,
    children: [
      {
        index: true,
        element: <MainDashboardStudent />,
        loader: stdDashboardLoader
      },
      {
        path: 'about',
        element: <AboutPage />,
        loader: stdDashboardLoader
      },
      {
        path: 'feeds',
        element: <FeedPage />,
        loader: feedLoader
      },
      {
        path: 'user-profile',
        element: <UserProfile />,
        loader: userProfileLoader
      },
      {
        path: 'share-feedback',
        element: <FeedbackForm />,
        loader: stdDashboardLoader
      },
      {
        path: 'rate-faculties',
        element: <StaffRatings />,
        loader: stdDashboardLoader
      },


    ]
  },
  {
    path: 'admin-dashboard',
    element: <AdminOutlet />,
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: 'view-feeds',
        element: <ViewFeedbackPage />,
      },
      {
        path: 'add-staff',
        element: <AddStaffPage />,
      },
      {
        path: 'review-staff',
        element: <ReviewStaff />,
      },
      {
        path: 'star-ratings',
        element: <StarRatingsReview />,
      },
      {
        path: 'add-feature',
        element: <AddFeaturePage />,
      },
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

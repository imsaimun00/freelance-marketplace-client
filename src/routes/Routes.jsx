import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllJobs from "../pages/AllJobs";
import AddJob from "../pages/AddJob";
import JobDetails from "../pages/JobDetails";
import UpdateJob from "../pages/UpdateJob";
import MyAddedJobs from "../pages/MyAddedJobs";
import MyAcceptedTasks from "../pages/MyAcceptedTasks";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/allJobs",
                element: <AllJobs />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            // Private Routes
            {
                path: "/addJob",
                element: <PrivateRoute><AddJob /></PrivateRoute>,
            },
            {
                path: "/job/:id",
                element: <PrivateRoute><JobDetails /></PrivateRoute>,
            },
            {
                path: "/updateJob/:id",
                element: <PrivateRoute><UpdateJob /></PrivateRoute>,
            },
            {
                path: "/myAddedJobs",
                element: <PrivateRoute><MyAddedJobs /></PrivateRoute>,
            },
            {
                path: "/my-accepted-tasks",
                element: <PrivateRoute><MyAcceptedTasks /></PrivateRoute>,
            },
        ],
    },
]);

export default router;
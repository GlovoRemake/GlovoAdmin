import './App.css'
// import {useEffect} from "react";
// import {useLoginMutation, useSendRequestCompanyMutation} from "@/services/apiPartner.ts";
import { Navigate, Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import AuthLayout from "@/components/layouts/AuthLayout.tsx";
import DashboardLayout from './components/layouts/DashboardLayout';
import HomeDashboard from './pages/Dashboard/HomeDashboard';
import ProfileDashboard from './pages/Dashboard/ProfileDashboard';
import CompaniesDashboard from './pages/Dashboard/CompaniesDashboard';

function App() {
    // const [testLogin] = useLoginMutation();
    // const [send] = useSendRequestCompanyMutation();

    // useEffect(() => {
    //     const test = async () => {
    //         try {
    //             await testLogin({
    //                 email: "rocafig361@jobraux.com",
    //                 password: "123123123",
    //             });

    //             await send({
    //                 name: "123123",
    //                 description: "123123"
    //             });
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }


    //     test();
    // }, []);

    return (
        <>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                </Route>

                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<HomeDashboard />} />
                    <Route path="dashboard" element={<Navigate to="/" replace />} />
                    <Route path="dashboard/profile" element={<ProfileDashboard />} />
                    <Route path="dashboard/companies" element={<CompaniesDashboard />} />
                </Route>
            </Routes>
            {/* <div className={"bg-black w-full h-screen"}>
            <h1 className={"text-4xl text-green-500"}>Get started</h1>
        </div> */}
        </>
    )
}

export default App

import { useContext } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import { Menu } from "./components/Menu";
import { Home } from "./pages/Home";
import { TrainingPanel } from "./pages/TrainingPanel";
import { Workshop } from "./pages/Workshop";
import { TrainingProgressPanel } from "./pages/TrainingProgressPanel";
import { TrainingManagement } from "./pages/TrainingManagement";
import { ModuleManagement } from "./pages/ModuleManagement";
import { TrainingExecution } from "./pages/TrainingExecution";
import { ChangePassword } from "./pages/ChangePassword";
import { ManageUsers } from "./pages/ManageUsers";


export const Router = () => {
    const userContext = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleAdministratorAcces = () => {
        if(userContext.user?.isAdministrator && location.pathname === '/') navigate('/workshop');
        return (<Home />)
    }

    return(
        <>
            <Menu />
            <Routes>
                <Route path="/" element={handleAdministratorAcces()} />
                <Route path="/manageusers" element={<ManageUsers />}/>
                <Route path="/training" element={<TrainingPanel />} />
                <Route path="/training/:trainingId" element={<TrainingProgressPanel />} />
                <Route path="/workshop" element={<Workshop />} />
                <Route path="/trainingManagement" element={<TrainingManagement />} />
                <Route path="/trainingManagement/:trainingId" element={<TrainingManagement />} />
                <Route path="moduleManagement/:trainingId" element={<ModuleManagement></ModuleManagement>} />
                <Route path="/trainingExecution/:trainingId/:moduleId" element={<TrainingExecution />} />
                <Route path="/changePassword/" element={<ChangePassword />} />
            </Routes>
        </>
    )
}


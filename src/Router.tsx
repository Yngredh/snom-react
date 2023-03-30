import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import { Menu } from "./components/Menu";
import { Home } from "./pages/Home";
import { TrainingPanel } from "./pages/TrainingPanel";
import { Workshop } from "./pages/Workshop";
import { TrainingProgressPanel } from "./pages/TrainingProgressPanel";
import { TrainingManagement } from "./pages/TrainingManagement";
import { TrainingExecution } from "./pages/TrainingExecution";
import { ChangePassword } from "./pages/ChangePassword";
import { ManageUsers } from "./pages/ManageUsers";


export const Router = () => {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    return(
        <>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manageusers" element={<ManageUsers />}/>
                <Route path="/training" element={<TrainingPanel />} />
                <Route path="/training/:trainingId" element={<TrainingProgressPanel />} />
                <Route path="/workshop" element={<Workshop />} />
                <Route path="/trainingManagement" element={<TrainingManagement />} />
                <Route path="/trainingManagement/:trainingId" element={<TrainingManagement />} />
                <Route path="/trainingExecution/:moduleId" element={<TrainingExecution />} />
                <Route path="/changePassword/" element={<ChangePassword />} />
            </Routes>
        </>
    )
}


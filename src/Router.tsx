import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import { Menu } from "./components/Menu";
import { Home } from "./pages/Home";
import { TrainingPanel } from "./pages/TrainingPanel";
import { TrainingProgressPanel } from "./pages/TrainingProgressPanel";
import { TrainingManagement } from "./pages/TrainingManagement";


export const Router = () => {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    return(
        <>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/training" element={<TrainingPanel />} />
                <Route path="/training/:trainingId" element={<TrainingProgressPanel />} />
                <Route path="/trainingManagement" element={<TrainingManagement />} />
            </Routes>
        </>
    )
}


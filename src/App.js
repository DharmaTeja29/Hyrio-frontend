import CompanyDashboard from './components/company/companyDashboard';
import CompanyOpening from './components/company/companyOpening';
import CompanyPosted from "./components/company/companyPosted";
import CompanyJobProfile from "./components/company/companyJobProfile";
import CompanyProfile from './components/company/companyProfile';
import Layout from "./components/layout";
import Login from "./components/login";
import Signup from './components/signup';
import Toast from "./components/toast";
import NotFound from './components/notFound';
import UserLayout from "./components/userLayout";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Toast />
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route index element={<Login />} />
          <Route path='signup' element={<Signup />} />

          <Route path='user/' element={<UserLayout />}>

            <Route index element={<CompanyDashboard />} />
            <Route path="new" element={<CompanyOpening />} />
            <Route path="posted" element={<CompanyPosted />} />
            <Route path="posted/:id" element={<CompanyJobProfile />} />
            <Route path="profile" element={<CompanyProfile />} />

          </Route>

          <Route path='*' element={<NotFound />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
import {Outlet, redirect, useLoaderData, useNavigate} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import {BigSidebar, Navbar, SmallSidebar} from '../components';
import {createContext, useContext, useState} from 'react';
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify';

export interface UserData {
  email: string;
  name: string;
  lastName: string;
  location: string;
  role: string;
  id: string;
}

export type DashboardType = {
  user: object;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => boolean;
  logoutUSer: () => void | undefined;
};

export const loader = async () => {
  // return 'hello world';
  try {
    const {data} = await customFetch.get<UserData>('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
};

export const DashboardContext = createContext<DashboardType | undefined>(
  undefined
);

const DashboardLayout = () => {
  const {user} = useLoaderData() as {user: UserData};
  const navigate = useNavigate();

  console.log(user);

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    return !showSidebar;
  };
  // =============================================================================
  // const logoutUSer = async () => {
  //   // console.log('logout user');
  //   navigate('/');
  //   await customFetch.get<UserData>('/auth/logout');
  //   toast.success('Logging out ...');
  // };
  // =========================================================================
  const logoutUser = async () => {
    try {
      await customFetch.get<UserData>('/auth/logout');
      // After a successful logout, you may want to clear user data or perform any necessary actions.
      // For example:
      // setUser(null); // Clear the user data
      // setIsLoggedIn(false); // Update authentication status
      navigate('/'); // Redirect to the home page or login page
      toast.success('Logged out successfully');
    } catch (error) {
      // Handle logout failure, e.g., show an error message
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        user,

        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={{user}} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = (): DashboardType | undefined => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      'useDashboardContext must be used within a DashboardContext.Provider'
    );
  }
  return context;
};
export default DashboardLayout;

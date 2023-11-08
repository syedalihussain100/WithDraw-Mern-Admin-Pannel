import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import Login from './pages/Login';
import MainLayout from './pages/MainLayout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OpenRoutes } from "./routes/OpenRoutes";
import { PrivateRoutes } from "./routes/PrivateRoute";
import AllUsers from './pages/AllUsers';
import PaymentData from './pages/PaymentData';
import PaymentDetails from './pages/PaymentDetails';
import CreateVideo from './pages/CreateVideo';
import AllVideos from './pages/AllVideos';
import CheckVideo from './pages/CheckVideo';


function App() {
  return (
    <ChakraProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path='/' element=
              {<OpenRoutes><Login /></OpenRoutes>} />
            <Route path='/alluser' element={<PrivateRoutes>
              <AllUsers />
            </PrivateRoutes>} />
            <Route path='/paymentdata' element={<PrivateRoutes>
              <PaymentData />
            </PrivateRoutes>} />
            <Route path='/admin/payment/:id' element={<PrivateRoutes>
              <PaymentDetails />
            </PrivateRoutes>} />
            <Route path='/createvideo' element={<PrivateRoutes>
              <CreateVideo />
            </PrivateRoutes>} />
            <Route path='/allvideos' element={<PrivateRoutes>
              <AllVideos />
            </PrivateRoutes>} />
            <Route path='/getvideo/:id' element={<PrivateRoutes>
              <CheckVideo />
            </PrivateRoutes>} />
          </Routes>
        </MainLayout>

      </Router>
    </ChakraProvider>
  );
}

export default App;

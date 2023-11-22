import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PostDetailsPage from './pages/PostDetailsPage';
import CreatePostPage from './pages/CreatePostPage';
import ProtectedRoute from './components/ProtectedRoute';
import MyPostsPage from './pages/MyPostsPage';


function App() {
  return (



    <BrowserRouter>
      <ToastContainer />

      <Navbar />
      <div className="mt-4">

        <Routes>

          <Route index element={<HomePage />} />



          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/postDetails/:id" element={<PostDetailsPage />} />


          <Route path="/createPost" element={<ProtectedRoute />} >
            <Route path="/createPost" element={<CreatePostPage />} />
          </Route>


          <Route path="/myPosts" element={<ProtectedRoute />} >
            <Route path="/myPosts" element={<MyPostsPage />} />
          </Route>
        </Routes>



      </div>



    </BrowserRouter>

  );
}

export default App;

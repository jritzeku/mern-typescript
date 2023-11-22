import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { logout } from '../redux/actions/UserActions';
import { NavLink, useNavigate } from "react-router-dom";
 

const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector((state: RootStateOrAny) => state.userLogin)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')

    }
    return (
        <div className='fixed top-0 z-40 flex items-center justify-between h-[60px] w-full px-8 bg-purple-600 font-sans   border-b-[2px] shadow-md '>

            <NavLink to='/'>
                <div className='flex items-center gap-4'>
                    <span className='text-white'>
                        iBlog
                    </span>
                </div>
            </NavLink>


            {userInfo ? (
                <ul className='flex items-center gap-10 text-[12px] font-semibold text-white  '>

                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending
                                ? 'pending'
                                : isActive
                                    ? 'border-b-2 border-white'
                                    : ''
                        }
                        to='/createPost'
                    >
                        <li className='flex items-center gap-2 p-2 cursor-pointer hover:brightness-75 hover:rounded-md'>
                            {/* <GoPerson size={18} /> */}
                            <p>Create a Post</p>
                        </li>
                    </NavLink>



                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending
                                ? 'pending'
                                : isActive
                                    ? 'border-b-2 border-white'
                                    : ''
                        }
                        to='/myPosts'
                    >
                        <li className='flex items-center gap-2 p-2 cursor-pointer hover:brightness-75 hover:rounded-md'>
                            {/* <GoPerson size={18} /> */}
                            <p>My Posts</p>
                        </li>
                    </NavLink>


                   



                    <li
                        onClick={handleLogout}
                        className='flex items-center gap-2 p-2 cursor-pointer hover:brightness-75 hover:rounded-md'>
                        {/* <GoPerson size={18} /> */}
                        <p>Log out</p>
                    </li>



                </ul>
            ) : (
                <ul className='flex items-center gap-10 text-[12px] font-semibold text-white  '>
                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending
                                ? 'pending'
                                : isActive
                                    ? 'border-b-2 border-white'
                                    : ''
                        }
                        to='/login'
                    >
                        <li className='flex items-center gap-2 p-2 cursor-pointer hover:brightness-75 hover:rounded-md'>
                            {/* <GoPerson size={18} /> */}
                            <p> Log in</p>
                        </li>
                    </NavLink>

                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending
                                ? 'pending'
                                : isActive
                                    ? 'border-b-2 border-white'
                                    : ''
                        }
                        to='/register'
                    >
                        <li className='flex items-center gap-2  p-2 cursor-pointer hover:brightness-75  '>
                            {/* <GoPersonAdd size={18} /> */}
                            <p>Sign up</p>
                        </li>
                    </NavLink>
                </ul>
            )}








        </div>
    )
}


export default Navbar
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { login } from '../redux/actions/UserActions';
// import Message from '../components/Message';
// import Loader from '../components/Loader';
import { IUser } from '../interfaces/IUser';
import { useEffect, useState } from 'react';



const LoginPage = () => {

    let navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState<IUser['email']>('')
    const [password, setPassword] = useState<IUser['password']>('')

    const { userInfo, loading, error, success } = useSelector((state: RootStateOrAny) => state.userLogin)


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    }


    useEffect(() => {
        if (success || userInfo) {
            navigate("/");
        }
    }, [userInfo, success, dispatch]);





    return (
        <div className='text-center pt-[120px] border-2'>


            <p className=' text-2xl mb-8 text-center'>Log in </p>

            <div className='flex justify-center mb-6'>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center justify-center gap-5 bg-white w-[400px] py-8 px-4'
                >


                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='text '
                        placeholder='Email'
                        className='rounded border-2 text-[14px] p-2 w-full'
                    />



                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Password'
                        className='rounded border-2 text-[14px] p-2 w-full'
                    />

                    <button
                        type='submit'
                        className='bg-purple-500 rounded px-3 py-2 text-[12px] text-white cursor-pointer hover:brightness-90 w-full'
                    >
                        Login
                    </button>
                </form>
            </div>

            <div className='flex flex-col items-center justify-center gap-5'>
                <p className='text-[12px] text-gray-600'>

                    <Link to='/register'>
                        <span className='font-bold text-purple-600 cursor-pointer ml-2'>
                            Don't have an account? Register now.
                        </span>
                    </Link>
                </p>


            </div>
        </div>
    )
}

export default LoginPage


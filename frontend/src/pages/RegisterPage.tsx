import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { register } from '../redux/actions/UserActions'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
import { IUser } from '../interfaces/IUser'

const RegisterPage = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const [name, setName] = useState<IUser['name']>('')
  const [email, setEmail] = useState<IUser['email']>('')
  const [password, setPassword] = useState<IUser['password']>('')

  const { loading, success, error } = useSelector(
    (state: RootStateOrAny) => state.userRegister
  )

  const { userInfo } = useSelector((state: RootStateOrAny) => state.userLogin)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(register({ name, email, password }))
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [dispatch, userInfo, success])


  return (
    <div className='text-center pt-[120px] border-2'>

      
      <p className=' text-2xl mb-8 text-center'>Create an account </p>

      <div className='flex justify-center mb-6'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center gap-5 bg-white w-[400px] py-8 px-4'
        >


          <input
            value={name}
            onChange={(e) => setName(e.target.value)}

            type='text '
            placeholder='Name'
            className='rounded border-2 text-[14px] p-2 w-full'
          />

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
            Register
          </button>
        </form>
      </div>

      <div className='flex flex-col items-center justify-center gap-5'>
        <p className='text-[12px] text-gray-600'>
          Already have an account ?
          {/* since this opens  modal,it is not a link!! */}
          <span className='font-bold text-purple-600 cursor-pointer ml-2'>
            Login
          </span>
        </p>

        <p className='text-[10px] text-gray-500 w-[80%]'>
          Click “Sign Up” to agree to Medium’s Terms of Service and acknowledge
          that Medium’s Privacy Policy applies to you.
        </p>
      </div>
    </div>
  )
}

export default RegisterPage

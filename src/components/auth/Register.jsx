import React from 'react'
import { userSchema } from '../../utils/validation/registrationValidation'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { registerUser } from '../../utils/api/axios.PostAPi'
import  toast  from 'react-hot-toast' 
import { useNavigate } from 'react-router-dom'
import { addEmail } from '../../utils/redux/slices/userSlice'
import { useDispatch } from 'react-redux'




function Register() {

const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(userSchema) })
  const navigate = useNavigate()
  const onFormSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      // Send form data in the request
      if(response?.status===200){
        dispatch(addEmail(response.data.otpDocs.email));
        toast.success("Sucessfully registred please verfy the otp")
        navigate('/verify')
      }else if(response?.response?.status===422){
        toast.error("Request failed please verify the provided data")
      }else{
        toast.error("Oops..! somehting went wrong")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
return (
<>
<section className="bg-white">
  <div className="grid grid-cols-1 lg:grid-cols-2">
    <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
      <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          Sign up with email
        </h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="mt-8">
          <div className="space-y-5">
            <div>
              {errors?.email?.message ?<label htmlFor="" className="text-base font-medium text-red-600">
              {errors?.email?.message}
               </label> : <label htmlFor="" className="text-base font-medium text-gray-900">
                {" "}
                Email address{" "}
              </label> }
              <div className="mt-2.5">
                <input
                 {...register("email")}
                  type="email"
                  placeholder="Enter email to get started"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none  focus:bg-white hover:border-stone-900"
                />
              </div>
            </div>
            <div>
            </div>
            <div>
              <input
                type="submit"
                className="inline-flex items-center rounded-lg justify-center w-full px-4 py-4 text-base font-semibold hover:-translate-y-1 transition-all duration-500 text-white  bg-black border border-transparent focus:outline-none"
                
              />
            </div>
          </div>
        </form>
        
      </div>
    </div>
    <div className="flex mt-3 items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gradient-to-b lg:px-8">
      <div>
        <img
          className="w-full mx-auto"
          src="./28791480_tr_vi_17__1_-removebg-preview.png"
          alt=""
        />
        
      </div>
    </div>
  </div>
</section>
</>
  )
}

export default Register
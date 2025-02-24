import React from 'react'
import SignUpForm from '../_components/auth/SignUp'

const page = () => {
  return (
    <div className="mt-[-60px] w-full bg-[url('/assets/img/signupBg.png')] min-h-screen  bg-cover bg-center">
      <SignUpForm/>
    </div>
  )
}

export default page

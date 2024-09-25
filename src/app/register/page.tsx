import { Payment } from '@/components/payment'
import RegistrationForm from '@/components/registration-form'
import React from 'react'

export default function page() {
  return (
    <div>
        <RegistrationForm />
        <Payment price={3000} discount={200}/>
    </div>
  )
}

'use client';
import Container from '@/components/ui/container'
import React from 'react'

export default function page() {
  return (
    <div>
        <div className="bg-cream-bg relative pt-56px bg_square w-full overflow-x-hidden">
                  <Container>

                    <div className='flex items-center justify-center'>
                        <div className='Signup_form max-w-452px w-full mx-auto'>
                                <h1 className='2xl:text-6xl mb-6 text-center'>Sign up</h1>
                            <div className='bg-white rounded-2xl p-30px'>
                                <form>
                                    <div className=' flex flex-col gap-1 mb-6'>
                                        <label for="First Name">Name</label>
                                        <input id='first_name' className='border border-solid border-light-blue2-bg bg-alabaster-bg py-3.5 px-4 rounded-8 placeholder:text-black/30' type='text' name='First Name' placeholder='Enter your Name'/>
                                    </div>
                                    <div className=' flex flex-col gap-1 mb-6'>
                                        <label for="Telegram ID">Telegram ID</label>
                                        <input id='telegram_id' className='border border-solid border-light-blue2-bg bg-alabaster-bg py-3.5 px-4 rounded-8 placeholder:text-black/30' type='text' name='Telegram ID' placeholder='Enter your Telegram ID'/>
                                    </div>
                                    <div className=' flex flex-col gap-1 mb-6 lg:mb-9'>
                                        <label for="Yap Score">Yap Score</label>
                                        <input id='first_name' className='border border-solid border-light-blue2-bg bg-alabaster-bg py-3.5 px-4 rounded-8 placeholder:text-black/30' type='text' name='Yap Score' placeholder='Yap Score'/>
                                    </div>
                                    <button class="bg-dark-purple1-bg text-center text-white w-full py-4 lg:py-5 px-6 text-16 lg:text-20 font-bold rounded-12 mb-3 cursor-pointer">Continue to Signup</button>
                                    <small className='text-12 font-normal text-black/30'>By submitting this form, you agree to our Terms & Conditions and Privacy Policy.</small>
                                </form>
                            </div>
                        </div>
                    </div>
                  </Container>
        </div>
    </div>
  )
}

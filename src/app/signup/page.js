'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '@/components/ui/container';
import { useAuthStore } from '@/store/auth';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';

const SignupPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const authStore = useAuthStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasHandled, setHasHandled] = useState(false);
  const [formData, setFormData] = useState({
    yapScore: '',
    email: '',
    password: '',
    fullname: '',
    telegramId: '',
    type: 'user',
    projectName: '',
    projectUrl: '',
    firstName: '',
    lastName: '',
    phoneNumber: '+911234567890',
    role: 'user',
    addressInfo: {
      pinCode: '000',
    },
  });

  const yaps = params.get('yaps') || '0';
  const email = params.get('email');
  const auth = params.get('auth');
  const username = params.get('username');
  const name = params.get('name');
  const message = params.get('message');

  // Set data from URL once on mount
  useEffect(() => {
    setFormData((prev) => {
      if (prev.email || prev.fullname || prev.yapScore) return prev;

      return {
        ...prev,
        yapScore: yaps,
        email,
        password: auth,
        fullname: username,
        firstName: name,
        lastName: name,
      };
    });
  }, [ auth, email, name, username,yaps]);

  useLayoutEffect(() => {
    if (hasHandled) return;

    try {
      if (auth || message) {
        router.replace(window.location.pathname, { scroll: false });
      }
      if (message) {
        toast.error(message);
      }
    } catch (error) {
      toast.error('Decryption failed. Please try again or contact support.');
    }

    setHasHandled(true);
  }, [auth, name, username, message, hasHandled, authStore, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.telegramId.trim()) {
      toast.error('Telegram ID is required.');
      return false;
    }

    const yapNum = parseFloat(formData.yapScore);
    if (isNaN(yapNum) || yapNum < 10) {
      toast.error('Yap Score must be 10 or higher.');
      return false;
    }

    return true;
  };

  const signUpHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post('/auth/signup', { ...formData });
      authStore.login({
        user: {
          id: response.data.user.id,
          username: response.data.user.username,
          yaps_score: response.data.user?.yaps_score || yaps,
          name: response.data.user?.firstName,
        },
        token: response.data.accessToken,
        isLogin: true,
      });

      toast.success(response.data.message || 'Signup successful!');
      router.push('/');
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong, please try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream-bg relative pt-56px bg_square w-full overflow-x-hidden">
      <Container>
        <div className="flex items-center justify-center">
          <div className="Signup_form max-w-452px w-full mx-auto">
            <h1 className="2xl:text-6xl mb-6 text-center">Sign up</h1>
            <div className="bg-white rounded-2xl p-30px">
              <form onSubmit={signUpHandler}>
                <div className="flex flex-col gap-1 mb-6">
                  <label htmlFor="username">Name</label>
                  <input
                    id="username"
                    name="username"
                    value={formData.fullname}
                    readOnly
                    className="border border-solid focus:outline-0 border-light-blue2-bg bg-alabaster-bg py-3.5 px-4 rounded-8 placeholder:text-black/30"
                    type="text"
                    placeholder="Enter your Name"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1 mb-6">
                  <label htmlFor="telegramId">Telegram ID</label>
                  <input
                    id="telegramId"
                    name="telegramId"
                    value={formData.telegramId}
                    onChange={handleChange}
                    className="border border-solid focus:outline-0 border-light-blue2-bg bg-alabaster-bg py-3.5 px-4 rounded-8 placeholder:text-black/30"
                    type="text"
                    placeholder="Enter your Telegram ID"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1 mb-6 lg:mb-9">
                  <label htmlFor="yapScore">Yap Score</label>
                  <input
                    id="yapScore"
                    name="yapScore"
                    value={formData.yapScore}
                    readOnly
                    className={cn(
                      'border border-solid focus:outline-0 bg-alabaster-bg py-3.5 px-4 rounded-8 placeholder:text-black/30',
                      parseFloat(formData.yapScore) < 10
                        ? 'border-dark-orange-bg'
                        : 'border-light-blue2-bg'
                    )}
                    type="text"
                    placeholder="Yap Score"
                    required
                  />
                  {parseFloat(formData.yapScore) < 10 && (
                    <span className="text-dark-orange-bg mt-2 text-sm">
                      Access denied — you need a minimum Yap score of 10 to continue.
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={parseFloat(formData.yapScore) < 10 || isSubmitting}
                  className="bg-dark-purple1-bg text-center text-white w-full py-4 lg:py-5 px-6 text-16 lg:text-20 font-bold rounded-12 mb-3 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <span className="flex justify-center items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                      Signing Up...
                    </span>
                  ) : (
                    'Continue to Signup'
                  )}
                </button>

                <small className="text-12 font-normal text-black/30">
                  By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
                </small>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignupPage;

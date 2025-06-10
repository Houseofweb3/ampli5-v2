'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Input from './ui/input';
import axiosInstance from '../utils/axios';
import { toast } from 'react-toastify';
import Card from './ui/card';
import AppointmentCalendar from './AppointmentCalendar';
import Title from './ui/title';

interface FormData {
  name: string;
  email: string;
  telegramId: string;
  projectURL: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  telegramId?: string;
  projectURL?: string;
}

const CreateBountiesForm: React.FC = () => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    telegramId: '',
    projectURL: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.telegramId.trim()) newErrors.telegramId = 'Telegram ID is required';
    if (!form.projectURL.trim()) newErrors.projectURL = 'Project URL is required';
    else if (
      !/^https?:\/\/.+\..+/.test(form.projectURL) && 
      !/^www\.[^.\s]+\.[^\s]+/.test(form.projectURL)
    )
      newErrors.projectURL = 'Invalid URL format (must start with https:// OR www.)';
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const feedbackFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      await axiosInstance.post('/bounty-booking/book', { ...form });
      toast.success('Form has been submitted');
      setIsBookingOpen(true);
    } catch (error) {
      toast.error('Failed to submit form!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {!isBookingOpen ? (
        <div>
          <div className="mb-6 ml-20  lg:ml-0 lg:mb-9">
            <Title className="text-left lg:text-center ">Create Bounty</Title>
            <p className="text-black/45 font-normal text-left lg:text-center ">
              Fill out the form below and we'll get back to you as soon as we can.
            </p>
          </div>
          <Card className="border-0 rounded-2xl lg:rounded-4xl">
            <form className="p-4" onSubmit={feedbackFormHandler}>
              <div className="space-y-4">
                <div>
                  <Input
                    label="Name"
                    name="name"
                    placeholder="Enter your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="abd@xyz,com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <Input
                    label="Telegram ID"
                    name="telegramId"
                    placeholder="t.me//abc"
                    value={form.telegramId}
                    onChange={handleChange}
                    required
                  />
                  {errors.telegramId && <p className="text-red-500 text-sm">{errors.telegramId}</p>}
                </div>

                <div>
                  <Input
                    label="Project URL"
                    name="projectURL"
                    placeholder="e.g. www.ampli5.io"
                    value={form.projectURL}
                    onChange={handleChange}
                    required
                  />
                  {errors.projectURL && <p className="text-red-500 text-sm">{errors.projectURL}</p>}
                </div>

                <button
                  type="submit"
                  className="bg-dark-purple1-bg text-white w-full py-2 text-20 cursor-pointer font-bold rounded mt-4 disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Book a meeting'}
                </button>
              </div>
            </form>
            <div>
              <p className="text-center text-xs text-black/30">
                By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
              </p>
            </div>
          </Card>
        </div>
      ) : (
        <div className="bg_blue_pattern  rounded-2xl lg:rounded-4xl py-8 lg:py-16 relative z-1">
          <div className="mb-6">
            <Title className="text-white text-center lg:text-center ">Book Appointment </Title>
            <p className="text-white font-normal text-left lg:text-center ">
              Fill out the available a slot and book now.
            </p>
          </div>
          <AppointmentCalendar />
        </div>
      )}
    </>
  );
};

export default CreateBountiesForm;

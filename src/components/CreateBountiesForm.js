'use client';

import React, { useState } from 'react';
import Input from './ui/input';

export default function CreateBountiesForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <form className="p-4">
      <div className="space-y-4">
        <Input
          label="Name"
          name="name"
          placeholder="Enter your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          label="Email Address"
          name="email"
          placeholder="Enter your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Subject"
          name="subject"
          placeholder="Enter Subject"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          type="textarea"
          label="Write your message here"
          name="message"
          placeholder="How can we help you?"
          value={form.message}
          onChange={handleChange}
        />
        <button className="bg-[#813DD4] text-center text-white w-full py-2 text-20 font-bold rounded mt-4 cursor-pointer">
          Submit
        </button>
      </div>
    </form>
  );
}

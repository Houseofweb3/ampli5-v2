'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Container from '../../components/ui/container';
import Input from '../../components/ui/input';
import { toast } from 'react-toastify';
import axios from 'axios';

interface FormData {
    fullName: string;
    startupName: string;
    startupDescription: string;
    stage: string;
    generatingRevenue: string;
    monthlyRevenue: string;
    conversationTopics: string[];
    hateAboutGroups: string;
    yearsBuilding: string;
    openToMatching: string;
    city: string;
    heardAbout: string;
    preferredMode: string;
    otherTopic: string;
}

const FounderInquiryForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        startupName: '',
        startupDescription: '',
        stage: '',
        generatingRevenue: '',
        monthlyRevenue: '',
        conversationTopics: [],
        hateAboutGroups: '',
        yearsBuilding: '',
        openToMatching: '',
        city: '',
        heardAbout: '',
        preferredMode: '',
        otherTopic: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            conversationTopics: checked
                ? [...prev.conversationTopics, value]
                : prev.conversationTopics.filter(topic => topic !== value)
        }));
    };

    const validateForm = (): boolean => {
        if (!formData.fullName.trim()) {
            toast.error('Full name is required.');
            return false;
        }
        if (!formData.startupName.trim()) {
            toast.error('Startup name is required.');
            return false;
        }
        if (!formData.startupDescription.trim()) {
            toast.error('Startup description is required.');
            return false;
        }
        if (formData.startupDescription.split(' ').length > 30) {
            toast.error('Startup description must be 30 words or less.');
            return false;
        }
        if (!formData.stage) {
            toast.error('Please select your current stage.');
            return false;
        }
        if (!formData.generatingRevenue) {
            toast.error('Please indicate if you are generating revenue.');
            return false;
        }
        if (!formData.monthlyRevenue) {
            toast.error('Please select your monthly revenue range.');
            return false;
        }
        if (formData.conversationTopics.length === 0) {
            toast.error('Please select at least one conversation topic.');
            return false;
        }
        if (!formData.hateAboutGroups.trim()) {
            toast.error('Please tell us what you hate about founder groups.');
            return false;
        }
        if (!formData.yearsBuilding) {
            toast.error('Please select how many years you have been building.');
            return false;
        }
        if (!formData.openToMatching) {
            toast.error('Please indicate if you are open to 1:1 matching.');
            return false;
        }
        if (!formData.city.trim()) {
            toast.error('Please enter your city.');
            return false;
        }
        if (!formData.heardAbout.trim()) {
            toast.error('Please tell us how you heard about us.');
            return false;
        }
        if (!formData.preferredMode) {
            toast.error('Please select your preferred communication mode.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsSubmitting(true);
            const response = await axios.post('/api/founderfuel/form', formData);

            if (response.status === 201) {
                toast.success('Application submitted successfully! We\'ll be in touch soon.');
                console.log('Form submitted with leadID:', response.data.leadID);
            }

            // Reset form
            setFormData({
                fullName: '',
                startupName: '',
                startupDescription: '',
                stage: '',
                generatingRevenue: '',
                monthlyRevenue: '',
                conversationTopics: [],
                hateAboutGroups: '',
                yearsBuilding: '',
                openToMatching: '',
                city: '',
                heardAbout: '',
                preferredMode: '',
                otherTopic: ''
            });
        } catch (error: any) {
            console.error('Form submission error:', error);
            const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-cream-bg relative pt-56px bg_square w-full overflow-x-hidden min-h-screen">
            <Container>
                <div className="flex items-center justify-center">
                    <div className="max-w-4xl w-full mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-black">
                                A private space for founders of revenue-generating startups
                            </h1>
                            <p className="text-xl lg:text-2xl text-black/80 mb-4">
                                (Pre-Seed → Series A) who want to talk openly — about struggles, burn, hiring nightmares, co-founder conflicts, investor pressure, or just… the silence that comes after "how's it going?".
                            </p>
                            <p className="text-lg text-black/70 mb-8">
                                No pitches. No flexing. Just real talk.
                            </p>
                            <p className="text-lg text-black/70 mb-8">
                                👉 Let's see if this space is right for you.
                            </p>
                        </div>

                        {/* Form */}
                        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Section 1: Founder Basics */}
                                <div className=" pb-8 space-y-6">


                                    {/* Full Name */}
                                    <Input
                                        label="1. What's your full name?"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                    />

                                    {/* Startup Name & Description */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-[#686868]">
                                            2. Startup name & one-line description (max 30 words)
                                        </label>
                                        <Input
                                            name="startupName"
                                            type="text"
                                            value={formData.startupName}
                                            onChange={handleChange}
                                            placeholder="Startup name"
                                            required
                                        />
                                        <Input
                                            name="startupDescription"
                                            type="text"
                                            value={formData.startupDescription}
                                            onChange={handleChange}
                                            placeholder="One-line description (max 30 words)"
                                            required
                                        />
                                        <p className="text-sm text-gray-500">
                                            💡 Example: "Xpo is a SaaS tool that automates influencer payouts."
                                        </p>
                                    </div>

                                    {/* Current Stage */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-[#686868]">
                                            3. What stage are you currently at?
                                        </label>
                                        <div className="space-y-2">
                                            {[
                                                'Pre-seed (some revenue / MVP live)',
                                                'Seed (steady revenue & small team)',
                                                'Series A (scaling operations)'
                                            ].map((option) => (
                                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="stage"
                                                        value={option}
                                                        checked={formData.stage === option}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                                    />
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Generating Revenue */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-[#686868]">
                                            4. Are you currently generating revenue?
                                        </label>
                                        <div className="space-y-2">
                                            {[
                                                'Yes, consistently',
                                                'Yes, but irregular',
                                                'Not yet'
                                            ].map((option) => (
                                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="generatingRevenue"
                                                        value={option}
                                                        checked={formData.generatingRevenue === option}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                                    />
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Monthly Revenue Range */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-[#686868]">
                                            5. What's your current monthly revenue range?
                                        </label>
                                        <div className="space-y-2">
                                            {[
                                                '< $10 K',
                                                '$10 K – $50 K',
                                                '$50 K – $200 K',
                                                '$200 K +'
                                            ].map((option) => (
                                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="monthlyRevenue"
                                                        value={option}
                                                        checked={formData.monthlyRevenue === option}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                                    />
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>


                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-[#686868]">
                                            6. What kind of conversations do you wish you could have with other founders?
                                            <span className="text-gray-500"> (choose up to 3)</span>
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {[
                                                'Mental health & burnout',
                                                'Fundraising pressure',
                                                'Hiring / firing / leadership',
                                                'Loneliness & founder guilt',
                                                'Product-market fit struggles',
                                                'Relationships / life balance'
                                            ].map((topic) => (
                                                <label key={topic} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        value={topic}
                                                        checked={formData.conversationTopics.includes(topic)}
                                                        onChange={handleCheckboxChange}
                                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                    />
                                                    <span className="text-sm text-gray-700">{topic}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <div className="mt-2">
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    value="Something else"
                                                    checked={formData.conversationTopics.includes('Something else')}
                                                    onChange={handleCheckboxChange}
                                                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                />
                                                <span className="text-sm text-gray-700">Something else</span>
                                            </label>
                                            {formData.conversationTopics.includes('Something else') && (
                                                <Input
                                                    name="otherTopic"
                                                    type="text"
                                                    value={formData.otherTopic}
                                                    onChange={handleChange}
                                                    placeholder="Please specify"
                                                    className="mt-2"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Hate About Groups */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-[#686868]">
                                            7. What do you hate about most founder groups today?
                                        </label>
                                        <textarea
                                            name="hateAboutGroups"
                                            value={formData.hateAboutGroups}
                                            onChange={handleChange}
                                            placeholder="Be honest — this helps us keep the vibe right."
                                            rows={4}
                                            maxLength={500}
                                            className="w-full placeholder:text-[#0000004D] focus:outline-none rounded-lg p-3 border bg-[#FAFAFA] border-[#D0D5DD]"
                                            required
                                        />
                                        <p className="text-sm text-gray-500">
                                            💡 Be honest — this helps us keep the vibe right.
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {formData.hateAboutGroups.length}/500 characters
                                        </p>
                                    </div>

                                    {/* Years Building */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-[#686868]">
                                            8. How many years have you been building this startup?
                                        </label>
                                        <div className="space-y-2">
                                            {[
                                                '< 1 year',
                                                '1 – 3 years',
                                                '3 – 5 years',
                                                '5 + years'
                                            ].map((option) => (
                                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="yearsBuilding"
                                                        value={option}
                                                        checked={formData.yearsBuilding === option}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                                    />
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Open to Matching */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-[#686868]">
                                            9. Would you be open to being matched 1:1 with another founder for a private conversation every 2 weeks?
                                        </label>
                                        <div className="space-y-2">
                                            {[
                                                'Yes',
                                                'Maybe, depends on schedule',
                                                'No, prefer group convos only'
                                            ].map((option) => (
                                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="openToMatching"
                                                        value={option}
                                                        checked={formData.openToMatching === option}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                                    />
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* City */}
                                    <Input
                                        label="10. What city are you based in?"
                                        name="city"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter your city"
                                        required
                                    />

                                    {/* Heard About */}
                                    <Input
                                        label="11. How did you hear about us?"
                                        name="heardAbout"
                                        type="text"
                                        value={formData.heardAbout}
                                        onChange={handleChange}
                                        placeholder="Tell us how you found us"
                                        required
                                    />

                                    {/* Preferred Mode */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-[#686868]">
                                            12. Preferred mode to communicate?
                                        </label>
                                        <div className="space-y-2">
                                            {[
                                                'WhatsApp',
                                                'Slack'
                                            ].map((option) => (
                                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="preferredMode"
                                                        value={option}
                                                        checked={formData.preferredMode === option}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                                    />
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
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
                                                Submitting...
                                            </span>
                                        ) : (
                                            "I'm in"
                                        )}
                                    </button>

                                    <small className="text-12 font-normal text-black/30">
                                        By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
                                    </small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default FounderInquiryForm;
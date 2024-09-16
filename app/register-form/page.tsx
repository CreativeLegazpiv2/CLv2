"use client";

import { useState } from 'react';


import Lottie from 'lottie-react'; // Import Lottie component from lottie-react
import graphicDesignAnimation from '../animation/bg1.json'; // Import Lottie animations
import webDevelopmentAnimation from '../animation/bg3.json';
import photographyAnimation from '../animation/bg8.json';
import writingAnimation from '../animation/bg6.json';
import musicAnimation from '../animation/bg5.json';
import gamingAnimation from '../animation/bg4.json';
import filmAnimation from '../animation/bg7.json';
import fineArtsAnimation from '../animation/bg9.json';
import fashionDesignAnimation from '../animation/bg2.json';
import otherAnimation from '../animation/bg10.json'; // Add all other Lottie animations


interface FormAnswers {
    firstName: string;
    creativeField: string[];
    address: string;
    mobileNumber: string;
    email: string;
    bio: string;
    instagram: string;
    facebook: string;
    twitter: string;
    portfoliolink: string;
}

interface Question {
    id: keyof FormAnswers;  // keys from the FormAnswers interface
    question: string;
    type: 'text' | 'textarea' | 'buttons';
    required: boolean;
    options?: string[];
    maxLength?: number;
}

export default function RegisterForm() {
    

    const [currentQuestion, setCurrentQuestion] = useState(-1); // Start with -1 for welcome screen
    const [answers, setAnswers] = useState<FormAnswers>({
        firstName: '',
        creativeField: [],
        address: '',
        mobileNumber: '',
        email: '',
        bio: '',
        instagram: '',
        facebook: '',
        twitter: '',
        portfoliolink: ''
    });

    const [error, setError] = useState<string | null>(null); // Error state
    const [transitioning, setTransitioning] = useState(false); // Transition state

    // List of Lottie animation data based on creative domains
    const backgrounds = [
        { domain: 'Graphic Design', animationData: graphicDesignAnimation },
        { domain: 'Web Development', animationData: webDevelopmentAnimation },
        { domain: 'Photography', animationData: photographyAnimation },
        { domain: 'Writing', animationData: writingAnimation },
        { domain: 'Music', animationData: musicAnimation },
        { domain: 'Gaming', animationData: gamingAnimation },
        { domain: 'Film', animationData: filmAnimation },
        { domain: 'Fine Arts', animationData: fineArtsAnimation },
        { domain: 'Fashion Design', animationData: fashionDesignAnimation },
        { domain: 'Other', animationData: otherAnimation },
    ];

    // Array of questions
    const questions: Question[] = [
        {
            id: 'firstName',
            question: 'Could you please share your first name with us?',
            type: 'text',
            required: true,
        },
        {
            id: 'creativeField',
            question: "We'd love to know more about your work! Which creative domain do you dabble in?",
            type: 'buttons',
            options: [
                'AudioVisual Media',
                'Digital Interactive Media',
                'Creative Services',
                'Design',
                'Publishing and Printed Media',
                'Performing Arts',
                'Visual Arts',
                'Traditional Cultural Expressions',
                'Cultural Sites',
                'Other',
            ],
            required: true,
        },
        {
            id: 'address',
            question: 'Could you kindly share your location with us?',
            type: 'text',
            required: true,
        },
        {
            id: 'mobileNumber',
            question: "May we ask for your mobile number so we can reach out to you whenever you're not online?",
            type: 'text',
            required: true,
        },
        {
            id: 'email',
            question: "Could you please share your email address with us? We'll use it to stay in touch and keep you updated in a more formal way.",
            type: 'text',
            required: true,
        },
        {
            id: 'bio',
            question: "We'd appreciate to know you more, how about sharing a short bio about yourself and your work?",
            type: 'textarea',
            maxLength: 300,
            required: true,
        },
        {
            id: 'instagram',
            question: 'What’s your Instagram? We’d love to see your visual journey there!',
            type: 'text',
            required: false, // Optional
        },
        {
            id: 'facebook',
            question: 'Are you on Facebook? Let’s connect and share creative insights!',
            type: 'text',
            required: false, // Optional
        },
        {
            id: 'twitter',
            question: 'Do you tweet? Share your Twitter, and we’ll keep the conversation going!',
            type: 'text',
            required: false, // Optional
        },
        {
            id: 'portfoliolink',
            question: "We want to know more about your work, so we'll appreciate it if you share your portfolio on Behance, your own website, or any platform you're using.",
            type: 'text',
            required: false, // Optional
        },
    ];

    const progress = ((currentQuestion + 1) / (questions.length + 1)) * 100;

    // Handle text input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setAnswers({ ...answers, [id]: value });
        setError(null); // Clear error when input changes
    };

    // Handle button click for options
    const handleOptionToggle = (option: string) => {
        const selectedOptions = answers.creativeField;
        if (selectedOptions.includes(option)) {
            setAnswers({
                ...answers,
                creativeField: selectedOptions.filter((selected) => selected !== option),
            });
        } else {
            setAnswers({
                ...answers,
                creativeField: [...selectedOptions, option],
            });
        }
        setError(null); // Clear error on selection change
    };

    // Validation logic to ensure required fields are filled
    const validateInput = () => {
        if (currentQuestion === -1) {
            return true;
        }
    
        const currentQuestionObj = questions[currentQuestion];
        if (!currentQuestionObj) {
            setError('An error occurred. Please try again.');
            return false;
        }
    
        const answer = answers[currentQuestionObj.id];
    
        if (currentQuestionObj.required) {
            if (currentQuestionObj.type === 'text' || currentQuestionObj.type === 'textarea') {
                if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
                    setError('This field is required');
                    return false;
                }
            }
    
            if (currentQuestionObj.type === 'buttons' && answers.creativeField.length === 0) {
                setError('Please select at least one option');
                return false;
            }
        }
    
        return true; // Validation passed
    };

    // Move to next question with transition
    const nextQuestion = () => {
        if (validateInput()) {
            setTransitioning(true); // Start fade-out
            setTimeout(() => {
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                } else {
                    setCurrentQuestion(questions.length); // Form completed
                    console.log('Form submitted:', answers);
                }
                setTransitioning(false); // Start fade-in
                setError(null); // Clear error
            }, 300);
        }
    };

    // Determine current background animation based on the current question
    const currentBackgroundAnimation = backgrounds[currentQuestion + 1]?.animationData || backgrounds[0].animationData;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative transition-all duration-500">
            {/* Lottie Background */}
            <Lottie 
                animationData={currentBackgroundAnimation} 
                loop={true} 
                autoplay={true} 
                className="fixed top-0 left-0 w-full h-full object-cover pointer-events-none z-0" 
            />

            {/* Progress Bar */}
            <div className="absolute z-10 top-0 left-0 w-full h-2 bg-transparent">
                <div
                    className="h-full bg-[#403737] transition-width duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Overlay and Form Container */}
            <div className="relative z-20 bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-4xl w-full animate-fade-in-up">
                {/* Welcome Screen */}
                {currentQuestion === -1 && (
                    <div className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
                        <h2 className="text-3xl font-bold mb-6 text-center leading-tight">
                            <span className="underline decoration-[#403737]">Welcome</span> to the Creative Individuals Registration Form!
                        </h2>
                        <p className="text-sm text-gray-700 mb-4 text-center">
                            We&apos;re excited to have you join us. Please take a moment to fill in your details below. Rest assured, your information will be kept secure in accordance with the <strong>Privacy Act</strong>.
                        </p>
                        <button
                            onClick={nextQuestion}
                            className="bg-[#403737] text-white px-6 py-3 rounded-full hover:bg-[#2f2f2f] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2f2f2f] shadow-lg"
                        >
                            Let&apos;s Get Started
                        </button>
                    </div>
                )}

                {/* Form Questions */}
                {currentQuestion >= 0 && currentQuestion < questions.length && (
                    <div className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
                        <h2 className="text-xl font-semibold mb-4 leading-tight">
                            {questions[currentQuestion].question.split(":")[0]}
                            <span className="font-bold text-[#403737]">&nbsp;</span>
                            {questions[currentQuestion].question.split(":")[1]}
                        </h2>

                        {/* Input field for text or textarea questions */}
                        {questions[currentQuestion].type === 'text' && (
                            <input
                                type="text"
                                id={questions[currentQuestion].id}
                                placeholder="Type your answer here..."
                                value={answers[questions[currentQuestion].id] as string}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-transparent border-b-2 border-gray-300 text-black placeholder-gray-500 outline-none mb-6 focus:border-[#403737] transition duration-300 ease-in-out focus:shadow-lg"
                            />
                        )}

                        {questions[currentQuestion].type === 'textarea' && (
                            <textarea
                                id={questions[currentQuestion].id}
                                placeholder="Type your answer here..."
                                value={answers[questions[currentQuestion].id] as string}
                                onChange={handleInputChange}
                                maxLength={questions[currentQuestion].maxLength}
                                rows={4}
                                className="w-full p-3 bg-transparent border-b-2 border-gray-300 text-black placeholder-gray-500 outline-none mb-6 focus:border-[#403737] transition duration-300 ease-in-out focus:shadow-lg"
                            />
                        )}

                        {/* Button selection for "creative field" */}
                        {questions[currentQuestion].type === 'buttons' && (
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {questions[currentQuestion].options?.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleOptionToggle(option)}
                                        className={`px-4 py-2 rounded-full transition ${
                                            answers.creativeField.includes(option)
                                                ? 'bg-[#403737] text-white shadow-lg'
                                                : 'bg-gray-200 text-black'
                                        } hover:bg-[#2f2f2f] hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-[#403737]`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Error message */}
                        {error && <p className="text-red-500 mb-4 animate-pulse">{error}</p>}

                        {/* Button logic: Show "Skip" or "OK" based on input */}
                        <button
                            onClick={nextQuestion}
                            className="bg-[#403737] text-white px-6 py-3 rounded-full hover:bg-[#2f2f2f] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2f2f2f] shadow-lg"
                        >
                            {answers[questions[currentQuestion].id] === '' && !questions[currentQuestion].required ? 'Skip' : 'OK'}
                        </button>
                    </div>
                )}

                {/* Thank You Screen */}
                {currentQuestion === questions.length && (
                    <div className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
                        <h2 className="text-2xl font-semibold mb-4 text-center leading-tight">
                            We&apos;re delighted to have you on board!
                        </h2>
                        <p className="text-sm text-gray-700 mb-4 text-center">
                            We&apos;re also grateful for your time and effort on sharing your details with us. Please keep in touch with us on our website <a href="https://creativelegazpi.ph" className="underline text-[#403737]">creativelegazpi.ph</a> when the directory goes live. Thank you so much! We&apos;ll be in touch soon.
                        </p>
                        <button
                            onClick={() => window.location.href = 'https://creativelegazpi.ph'}
                            className="bg-[#403737] text-white px-6 py-3 rounded-full hover:bg-[#2f2f2f] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2f2f2f] shadow-lg"
                        >
                            Visit Our Website
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

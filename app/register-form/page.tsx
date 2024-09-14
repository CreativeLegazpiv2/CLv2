"use client";

import { useState } from 'react';

// Define the structure for the form answers
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

// Define the structure for a question object
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

    // Array of questions
    const questions: Question[] = [
        {
            id: 'firstName',
            question: 'Please let us know your first name.',
            type: 'text',
            required: true,
        },
        {
            id: 'creativeField',
            question: 'We\'d love to know which creative domain you work on.',
            type: 'buttons',
            options: [
                'Graphic Design',
                'Web Development',
                'Photography',
                'Writing',
                'Music',
                'Gaming',
                'Film',
                'Fine Arts',
                'Fashion Design',
                'Other',
            ],
            required: true,
        },
        {
            id: 'address',
            question: 'Please let us know where you are located. (City/Municipality/Province)',
            type: 'text',
            required: true,
        },
        {
            id: 'mobileNumber',
            question: 'Please let us know your mobile number so we can reach out to you whenever you\'re not online.',
            type: 'text',
            required: true,
        },
        {
            id: 'email',
            question: 'Please share with us your email address for more formal communication with you soon.',
            type: 'text',
            required: true,
        },
        {
            id: 'bio',
            question: 'We\'ll appreciate to know you more, please share a short bio about yourself. (300 characters max)',
            type: 'textarea',
            maxLength: 300,
            required: true,
        },
        {
            id: 'instagram',
            question: 'Let\'s follow each other in Instagram. Here\'s mine @creativelegazpi',
            type: 'text',
            required: false, // Optional
        },
        {
            id: 'facebook',
            question: 'Let\'s also connect in Facebook. Here\'s mine @creativelegazpi',
            type: 'text',
            required: false, // Optional
        },
        {
            id: 'twitter',
            question: 'Let\'s follow each other in Twitter/X too. Here\'s mine @creativelegazpi',
            type: 'text',
            required: false, // Optional
        },
    ];

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
        // Check if currentQuestion is valid
        if (currentQuestion === -1) {
            // No validation needed for the welcome screen
            return true;
        }
    
        const currentQuestionObj = questions[currentQuestion];
        if (!currentQuestionObj) {
            // If currentQuestionObj is not defined, something went wrong
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

    // Move to next question
    const nextQuestion = () => {
        if (validateInput()) {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setError(null); // Clear error when moving to the next question
            } else {
                // Form is completed, handle form submission
                setCurrentQuestion(questions.length); // Set to length for thank-you screen
                console.log('Form submitted:', answers);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: 'url(/assets/images/temp-bg2.jpg)' }}>
            <div className="bg-opacity-80 bg-black p-6 rounded-lg text-white w-full max-w-lg">

                {/* Welcome Screen */}
                {currentQuestion === -1 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Welcome to the Creative Individuals Registration Form! Please fill in your details below.</h2>
                        <button
                            onClick={nextQuestion}
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                        >
                            Let&apos;s Get Started
                        </button>
                    </div>
                )}

                {/* Form Questions */}
                {currentQuestion >= 0 && currentQuestion < questions.length && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">{questions[currentQuestion].question}</h2>

                        {/* Input field for text or textarea questions */}
                        {questions[currentQuestion].type === 'text' && (
                            <input
                                type="text"
                                id={questions[currentQuestion].id}
                                placeholder="Type your answer here..."
                                value={answers[questions[currentQuestion].id] as string}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
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
                                className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
                            />
                        )}

                        {/* Button selection for "creative field" */}
                        {questions[currentQuestion].type === 'buttons' && (
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {questions[currentQuestion].options?.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleOptionToggle(option)}
                                        className={`px-4 py-2 rounded transition ${
                                            answers.creativeField.includes(option)
                                                ? 'bg-orange-500 text-white'
                                                : 'bg-gray-700 text-white'
                                        } hover:bg-orange-600`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Error message */}
                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <button
                            onClick={nextQuestion}
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                        >
                            OK
                        </button>
                    </div>
                )}

                {/* Thank You Screen */}
                {currentQuestion === questions.length && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Thank you for filling out the form!</h2>
                        <p>We appreciate your time and effort in providing us with your details. We&apos;ll be in touch soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

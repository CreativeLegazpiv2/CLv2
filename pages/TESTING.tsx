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
    const [currentQuestion, setCurrentQuestion] = useState<number>(-1); // Start with -1 for welcome screen
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
    const [transitioning, setTransitioning] = useState<boolean>(false); // Transition state

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
            question: '(Optional) Let\'s follow each other in Instagram. Here\'s mine @creativelegazpi',
            type: 'text',
            required: false, // Optional
        },
        {
            id: 'facebook',
            question: '(Optional) Let\'s also connect in Facebook. Here\'s mine @creativelegazpi',
            type: 'text',
            required: false, // Optional
        },
        {
            id: 'twitter',
            question: '(Optional) Let\'s follow each other in Twitter/X too. Here\'s mine @creativelegazpi',
            type: 'text',
            required: false, // Optional
        },
        {
            id: 'portfoliolink',
            question: 'Please provide a link to your portfolio or personal website (optional).',
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
    const validateInput = (): boolean => {
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

    // Move to next question with transition
    const nextQuestion = () => {
        if (validateInput()) {
            setTransitioning(true); // Start fade-out
            setTimeout(() => {
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                } else {
                    // Form is completed, handle form submission
                    setCurrentQuestion(questions.length); // Set to length for thank-you screen
                    submitForm(); // Call the submitForm function
                }
                setTransitioning(false); // Start fade-in
                setError(null); // Clear error when moving to the next question
            }, 300); // Wait for fade-out transition (300ms)
        }
    };

    const submitForm = async () => {
        const formData = {
          'entry.1423761216': answers.firstName,
          'entry.873872541': answers.creativeField.join(','),
          'entry.596935029': answers.address,
          'entry.1486545489': answers.mobileNumber,
          'entry.905488960': answers.email,
          'entry.266776651': answers.bio,
          'entry.933937910': answers.instagram,
          'entry.2052783211': answers.facebook,
          'entry.1476922231': answers.twitter,
          'entry.133240640': answers.portfoliolink,
        };
      
        try {
          const response = await fetch('/api/proxy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          console.log('Form submitted successfully!');
        } catch (error) {
          console.error('Error submitting form:', error);
          setError('There was an error submitting the form. Please try again.');
        }
      };
      
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center">
            <div className="fixed inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/assets/images/Clip%20path%20group.svg')` }} />
            <div className="absolute z-10 top-0 left-0 w-full h-2 bg-transparent">
                <div
                    className="h-full bg-orange-500 transition-width duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative z-10 bg-opacity-80 bg-black p-6 rounded-lg text-white w-full max-w-lg">
                {currentQuestion === -1 && (
                    <div className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
                        <h2 className="text-2xl font-bold mb-4">Welcome to the Creative Individuals Registration Form! Let us know about your details by answering this form.</h2>
                        <button
                            onClick={nextQuestion}
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                        >
                            Let&apos;s Get Started
                        </button>
                    </div>
                )}

                {currentQuestion >= 0 && currentQuestion < questions.length && (
                    <div className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
                        <h2 className="text-2xl font-bold mb-4">{questions[currentQuestion].question}</h2>

                        {questions[currentQuestion].type === 'text' && (
                            <input
                                type="text"
                                id={questions[currentQuestion].id}
                                placeholder="Type your answer here..."
                                value={answers[questions[currentQuestion].id] as string}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-transparent border-b-2 border-white text-white placeholder-gray-400 outline-none mb-4"
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
                                className="w-full p-2 bg-transparent border-b-2 border-white text-white placeholder-gray-400 outline-none mb-4"
                            />
                        )}

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

                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <button
                            onClick={nextQuestion}
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                        >
                            {answers[questions[currentQuestion].id] === '' && !questions[currentQuestion].required ? 'Skip' : 'OK'}
                        </button>
                    </div>
                )}

                {currentQuestion === questions.length && (
                    <div className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
                        <h2 className="text-2xl font-bold mb-4">Thank you for your submission!</h2>
                        <p>Your responses have been recorded successfully.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

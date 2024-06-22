import React from 'react';
import './App.css'; // Ensure App.css imports Tailwind styles
import JobApplicationForm from './JobApplicationForm';

function App() {
  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">Job Application Form</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <JobApplicationForm />
      </div>
    </div>
  );
}

export default App;

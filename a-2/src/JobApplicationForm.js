import React, { useState } from 'react';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingFor: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? [...prev[name], value] : prev[name].filter(skill => skill !== value)) : value
    }));
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.fullName.trim()) {
      validationErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!formData.phoneNumber.trim()) {
      validationErrors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(formData.phoneNumber)) {
      validationErrors.phoneNumber = 'Phone Number must be a valid number';
    }

    if (!formData.applyingFor.trim()) {
      validationErrors.applyingFor = 'Please select a position';
    }

    if (formData.applyingFor === 'Developer' || formData.applyingFor === 'Designer') {
      if (!formData.relevantExperience.trim()) {
        validationErrors.relevantExperience = 'Relevant Experience is required';
      } else if (isNaN(formData.relevantExperience) || formData.relevantExperience <= 0) {
        validationErrors.relevantExperience = 'Relevant Experience must be a valid number greater than 0';
      }
    }

    if (formData.applyingFor === 'Designer' && !formData.portfolioURL.trim()) {
      validationErrors.portfolioURL = 'Portfolio URL is required';
    }

    if (formData.applyingFor === 'Manager' && !formData.managementExperience.trim()) {
      validationErrors.managementExperience = 'Management Experience is required';
    }

    if (formData.additionalSkills.length === 0) {
      validationErrors.additionalSkills = 'At least one skill must be selected';
    }

    if (!formData.preferredInterviewTime.trim()) {
      validationErrors.preferredInterviewTime = 'Preferred Interview Time is required';
    }

    return validationErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      alert(JSON.stringify(formData, null, 2));
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className="max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2">Full Name</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.fullName && 'border-red-500'}`} />
        {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`} />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Phone Number</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.phoneNumber && 'border-red-500'}`} />
        {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Applying for Position</label>
        <select name="applyingFor" value={formData.applyingFor} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.applyingFor && 'border-red-500'}`}>
          <option value="">Select...</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
        {errors.applyingFor && <p className="text-red-500">{errors.applyingFor}</p>}
      </div>

      {(formData.applyingFor === 'Developer' || formData.applyingFor === 'Designer') && (
        <div className="mb-4">
          <label className="block mb-2">Relevant Experience (Years)</label>
          <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.relevantExperience && 'border-red-500'}`} />
          {errors.relevantExperience && <p className="text-red-500">{errors.relevantExperience}</p>}
        </div>
      )}

      {formData.applyingFor === 'Designer' && (
        <div className="mb-4">
          <label className="block mb-2">Portfolio URL</label>
          <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.portfolioURL && 'border-red-500'}`} />
          {errors.portfolioURL && <p className="text-red-500">{errors.portfolioURL}</p>}
        </div>
      )}

      {formData.applyingFor === 'Manager' && (
        <div className="mb-4">
          <label className="block mb-2">Management Experience</label>
          <input type="text" name="managementExperience" value={formData.managementExperience} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.managementExperience && 'border-red-500'}`} />
          {errors.managementExperience && <p className="text-red-500">{errors.managementExperience}</p>}
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-2">Additional Skills</label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input type="checkbox" name="additionalSkills" value="JavaScript" checked={formData.additionalSkills.includes('JavaScript')} onChange={handleChange} className="mr-2" />
            JavaScript
          </label>
          <label className="inline-flex items-center mr-4">
            <input type="checkbox" name="additionalSkills" value="CSS" checked={formData.additionalSkills.includes('CSS')} onChange={handleChange} className="mr-2" />
            CSS
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" name="additionalSkills" value="Python" checked={formData.additionalSkills.includes('Python')} onChange={handleChange} className="mr-2" />
            Python
          </label>
          {errors.additionalSkills && <p className="text-red-500">{errors.additionalSkills}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Preferred Interview Time</label>
        <input type="datetime-local" name="preferredInterviewTime" value={formData.preferredInterviewTime} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.preferredInterviewTime && 'border-red-500'}`} />
        {errors.preferredInterviewTime && <p className="text-red-500">{errors.preferredInterviewTime}</p>}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
    </form>
  );
};

export default JobApplicationForm;

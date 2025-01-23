/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCampaign.css";
import { useStateContext } from "../context";
import './css.css';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // State to track submission success
  const { publishCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
    campaignType: "",//---add2;
    documentlink: " "
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await publishCampaign({ ...form });
      console.log(form);
      setIsSuccess(true); // Set success flag to true on successful submission
      
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      navigate("/"); // Redirect to dashboard after modal is closed
    }, 500); // Slight delay to allow modal to close smoothly
  };

  return (
    <div className="container max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8">
      <div className="header text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-500">Start a Campaign</h1>
      </div>

      {!isSuccess ? (
        <form className="campaign-form space-y-6" onSubmit={handleSubmit}>
          <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label htmlFor="name" className="block text-sm font-medium text-pink-400">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                name="name"
                value={form.name}
                onChange={(e) => handleFormFieldChange('name', e)}
                className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3"
              />
            </div>
            <div className="form-field">
              <label htmlFor="title" className="block text-sm font-medium text-pink-400">
                Campaign Title *
              </label>
              <input
                type="text"
                id="title"
                placeholder="Write a title"
                name="title"
                value={form.title}
                onChange={(e) => handleFormFieldChange('title', e)}
                className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="story" className="block text-sm font-medium text-pink-400">
              Story *
            </label>
            <textarea
              id="story"
              placeholder="Write your story"
              name="description"
              value={form.description}
              onChange={(e) => handleFormFieldChange('description', e)}
              className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 h-40 py-3"
            ></textarea>
          </div>

          <div className="campaign-info flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
            <img src="money.png" alt="Money icon" className="icon w-8 h-8" />
            <h4 className="text-pink-400">You will get 100% of the raised amount</h4>
          </div>

          <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label htmlFor="goal" className="block text-sm font-medium text-pink-400">
                Goal *
              </label>
              <input
                type="text"
                id="goal"
                placeholder="ETH 0.50"
                name="target"
                value={form.target}
                onChange={(e) => handleFormFieldChange('target', e)}
                className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3"
              />
            </div>
            <div className="form-field">
              <label htmlFor="deadline" className="block text-sm font-medium text-pink-400">
                End Date *
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={form.deadline}
                onChange={(e) => handleFormFieldChange('deadline', e)}
                className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="image" className="block text-sm font-medium text-pink-400">
              Campaign Image *
            </label>
            <input
              type="url"
              id="image"
              placeholder="Place image URL of your campaign"
              name="image"
              value={form.image}
              onChange={(e) => handleFormFieldChange('image', e)}
              className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3"
            />
          </div>
          <div className="form-field">
            <label htmlFor="campaignType" className="block text-sm font-medium text-pink-400">
              Campaign Type *
            </label>
            <select
              id="campaignType"
              name="campaignType"
              value={form.campaignType}
              onChange={(e) => handleFormFieldChange('campaignType', e)}
              className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3"
            >
              <option value="" disabled>Select Category</option>
              <option value="education">Education</option>
              <option value="medical">Medical Emergency</option>
              <option value="startup">Startup</option>
              <option value="social">Social Cause</option>
            </select>
          </div>

          <div className="submit-btn text-center">
          <button
            type="submit"
            className={`bg-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-pink-600 hover:shadow-lg focus:outline-none focus:ring focus:ring-pink-300 ${isLoading ? "opacity-70" : ""
              }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader"></div> // Add spinner here
            ) : (
              "Submit new campaign"
            )}
          </button>
        </div>
        </form>
      ) : (
        // If submission is successful, show the modal
        <div>
          <div className="modal-overlay fixed inset-0 bg-gray-900 opacity-50 z-10"></div>
          <div className="modal-content fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white text-center p-8 rounded-lg max-w-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-pink-500 mb-4">Thanks for submitting your campaign!</h2>
              <p className="text-xl text-gray-700 mb-6">Your campaign is now under review. You will be redirected shortly.</p>
              <button
                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
                onClick={handleModalClose}
              >
                Close and Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    
     <div className="alert-box-container flex items-center space-x-4 mt-8">
        <div className="alert-box bg-gray-800 p-4 rounded-lg text-white">
          <p className="text-sm font-semibold">Important Notice</p>
          <p className="text-xs">Click the icon for more details.</p>
        </div>

        
        <div className="form-field w-full md:w-80">
          <label htmlFor="documentLink" className="block text-sm font-medium text-pink-400">
            Document Link
          </label>
          <input
            type="url"
            id="documentLink"
            placeholder="Enter the link to your document"
            name="documentlink"
            value={form.documentlink}
            onChange={(e) => handleFormFieldChange('documentlink', e)}
            className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3"
          />
        </div>

        <div
          className="alert-icon cursor-pointer bg-pink-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          !
        </div>
      </div>

      {isModalOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="modal-content bg-white rounded-lg p-6 text-center shadow-xl">
            <p className="text-lg font-semibold text-gray-800">Hellooo</p>
            <button
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-md shadow-md hover:bg-pink-600"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCampaign;
*/
//////////////
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useStateContext } from "../context";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { publishCampaign } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
    campaignType: "",
    documentlink: "",
    notice: ""
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleFileUpload = async (fieldName, file) => {
    if (!file) return;

    setIsLoading(true);
    const folder = fieldName === "image" ? "camp-image" : "doc-image";
    const filePath = `${folder}/${Date.now()}-${file.name}`;

    try {
      const { data, error } = await supabase.storage
        .from("campaign-images")
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("campaign-images")
        .getPublicUrl(filePath);

      if (publicUrlData) {
        setForm({ ...form, [fieldName]: publicUrlData.publicUrl });
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First publish to blockchain via context
      await publishCampaign({ ...form });

      // Then store in Supabase
      const { data, error } = await supabase
        .from('campaigns')
        .insert([form]);

      if (error) throw error;

      setIsSuccess(true);
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8">
      <div className="header text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-500">Start a Campaign</h1>
      </div>

      {!isSuccess ? (
        <form className="campaign-form space-y-6" onSubmit={handleSubmit}>
          <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label htmlFor="name" className="block text-sm font-medium text-pink-400">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                required
                value={form.name}
                onChange={(e) => handleFormFieldChange('name', e)}
                className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3 px-4"
              />
            </div>
            <div className="form-field">
              <label htmlFor="title" className="block text-sm font-medium text-pink-400">
                Campaign Title *
              </label>
              <input
                type="text"
                id="title"
                placeholder="Write a title"
                required
                value={form.title}
                onChange={(e) => handleFormFieldChange('title', e)}
                className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3 px-4"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="story" className="block text-sm font-medium text-pink-400">
              Story *
            </label>
            <textarea
              id="story"
              placeholder="Write your story"
              required
              value={form.description}
              onChange={(e) => handleFormFieldChange('description', e)}
              className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 h-40 py-3 px-4"
            ></textarea>
          </div>

          <div className="campaign-info flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
            <div className="icon w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white">💰</span>
            </div>
            <h4 className="text-pink-400">You will get 100% of the raised amount</h4>
          </div>

          <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label htmlFor="target" className="block text-sm font-medium text-pink-400">
                Goal *
              </label>
              <input
                type="text"
                id="target"
                placeholder="ETH 0.50"
                required
                value={form.target}
                onChange={(e) => handleFormFieldChange('target', e)}
                className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3 px-4"
              />
            </div>
            <div className="form-field">
              <label htmlFor="deadline" className="block text-sm font-medium text-pink-400">
                End Date *
              </label>
              <input
                type="date"
                id="deadline"
                required
                value={form.deadline}
                onChange={(e) => handleFormFieldChange('deadline', e)}
                className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3 px-4"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="block text-sm font-medium text-pink-400">
              Campaign Image *
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="file"
                onChange={(e) => handleFileUpload("image", e.target.files[0])}
                className="block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3 px-4"
                accept="image/*"
              />
              <input
                type="url"
                placeholder="Or paste image URL"
                value={form.image}
                onChange={(e) => handleFormFieldChange("image", e)}
                className="block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3 px-4"
              />
            </div>
            {form.image && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <div className="flex flex-col items-center">
                  <img
                    src={form.image}
                    alt="Campaign"
                    className="w-full max-w-md rounded-lg shadow-lg"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="campaignType" className="block text-sm font-medium text-pink-400">
              Campaign Type *
            </label>
            <select
              id="campaignType"
              required
              value={form.campaignType}
              onChange={(e) => handleFormFieldChange('campaignType', e)}
              className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3 px-4"
            >
              <option value="">Select Category</option>
              <option value="education">Education</option>
              <option value="medical">Medical Emergency</option>
              <option value="startup">Startup</option>
              <option value="social">Social Cause</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="notice" className="block text-sm font-medium text-pink-400">
              Additional information
            </label>
            <textarea
              id="notice"
              placeholder="Add any important notices or details"
              value={form.notice}
              onChange={(e) => handleFormFieldChange('notice', e)}
              className="mt-1 block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 h-20 py-3 px-4"
            ></textarea>
          </div>

          <div className="form-field">
            <label className="block text-sm font-medium text-pink-400">
              Document Link
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="file"
                onChange={(e) => handleFileUpload("documentlink", e.target.files[0])}
                className="block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3 px-4"
              />
              <input
                type="url"
                placeholder="Or paste document URL"
                value={form.documentlink}
                onChange={(e) => handleFormFieldChange("documentlink", e)}
                className="block w-full rounded-lg bg-gray-800 text-white border-pink-400 focus:ring-pink-500 focus:border-pink-500 py-3 px-4"
              />
            </div>
          </div>

          <div className="submit-btn text-center">
            <button
              type="submit"
              className={`bg-pink-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-pink-600 hover:shadow-lg focus:outline-none focus:ring focus:ring-pink-300 ${
                isLoading ? "opacity-70" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Submit new campaign"}
            </button>
          </div>
        </form>
      ) : (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-content bg-white text-center p-8 rounded-lg max-w-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-pink-500 mb-4">
              Thanks for submitting your campaign!
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Your campaign is now live. You will be redirected to the dashboard shortly.
            </p>
            <button
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
              onClick={handleModalClose}
            >
              Close and Go to Dashboard
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="modal-content bg-white rounded-lg p-6 text-center shadow-xl">
            <p className="text-lg font-semibold text-gray-800">
              Campaign Creation Guidelines
            </p>
            <button
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-md shadow-md hover:bg-pink-600"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default CreateCampaign;
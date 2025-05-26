"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import { Close, Upload, Replay, Search } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { LanguageContext } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import fallbackData from '@/data/data.json'


const UploadPage = () => {
  const { language } = useContext(LanguageContext);
  const { user } = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  // Handle File Upload & Save to localStorage
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        localStorage.setItem("capturedPhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function getRandomItems(arr, count) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Retake Photo
  const retakePhoto = () => {
    setPhoto(null);
    localStorage.removeItem("capturedPhoto");
  };

  // Upload Image
  const detectImage = async () => {
    if (!photo) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "captured_images");
      const cloudinaryResponse = await axios.post("https://api.cloudinary.com/v1_1/drbxfvemo/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = cloudinaryResponse.data.secure_url;


      // plant.id integration

      const base64Image = photo.split(",")[1];

      const data = JSON.stringify({
        images: [`data:image/jpg;base64,${base64Image}`],
        latitude: null,
        longitude: null,
        similar_images: true
      });

      const config = {
        method: "post",
        url: "https://plant.id/api/v3/identification",
        headers: {
          "Api-Key": process.env.NEXT_PUBLIC_PLANT_ID_API_KEY,
          "Content-Type": "application/json"
        },
        data: data,
        maxBodyLength: Infinity
      };

      const response = await axios(config);

      // Extract identified plant details
      const plantResults = response.data.result.classification.suggestions || [];
      if (plantResults.length === 0) {
        alert("No plant identified. Try uploading a clearer image.");
        return;
      }

      const topPlant = plantResults[0].name; // First suggestion
      const SESSION_ID = response.data.access_token; // Session ID for conversation

      const plantInfo = await getPlantInfo(topPlant,SESSION_ID);

      const weedRequestResponse = await axios.post('/api/weeds', { imageUrl, userId: user._id || user.id });


      const allDiseases = fallbackData.potentialDiseases || [];
      const allSolutions = fallbackData.solutions || [];

      const potentialDiseases = getRandomItems(allDiseases, 5);
      const solutions = getRandomItems(allSolutions, 5);
      
      const reportData = {
        image: imageUrl,
        weedName: topPlant,
        description: plantInfo,
        weedId: weedRequestResponse.data.data.id,
        potentialDiseases: potentialDiseases,
        solutions: solutions
      };

      await axios.post('/api/reports', reportData,
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
      );  
      router.push(`/reports`);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(translations[language].uploadError || 'Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const getPlantInfo = async (plantName, SESSION_ID) => {
    try {
      const data = JSON.stringify({
        question: `Tell me about ${plantName}.`,
        prompt: "Provide a short description.",
        temperature: 0.5,
        app_name: "WeedWatcherBot"
      });
  
      const config = {
        method: "post",
        url: `https://plant.id/api/v3/identification/${SESSION_ID}/conversation`, // Replace YOUR_SESSION_ID
        headers: {
          "Api-Key": process.env.NEXT_PUBLIC_PLANT_ID_API_KEY,
          "Content-Type": "application/json"
        },
        data: data,
        maxBodyLength: Infinity
      };
  
      const response = await axios(config);  
      // Extract plant details
      const plantInfo = response.data.messages[1].content || "No additional info available.";
      return plantInfo;
    } catch (error) {
      console.error("Error fetching plant info:", error); 
    }
  };
  
  return (
    <>
    
    <div className="relative h-screen w-screen bg-black flex flex-col justify-between items-center px-4 pb-16">
      <div className="absolute top-4 left-4 z-50">
        <Link href="/">
          <IconButton className="text-white bg-gray-800 rounded-full p-1 hover:bg-gray-700 shadow-md">
            <Close fontSize="large" />
          </IconButton>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-md flex-grow space-y-6">
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-white ml-4">{translations[language].uploading || 'Uploading...'}</p>
          </div>
        ) : (
          <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-500 bg-black relative">
            {photo ? (
              <div className="w-full h-full flex items-center justify-center bg-black">
                <img src={photo} alt="Uploaded" className="max-w-full max-h-full object-contain" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 bg-gray-900 text-white rounded-xl border border-gray-600 shadow-lg">
                <p className="mb-4">{translations[language].uploadPrompt || "Upload an image to proceed"}</p>
                <input type="file" accept="image/*" id="upload-input" style={{ display: "none" }} onChange={handleFileUpload} />
                <label htmlFor="upload-input">
                  <Button variant="contained" component="span" startIcon={<Upload />} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl shadow-md">
                    {translations[language].upload || "Upload Image"}
                  </Button>
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mb-8 flex justify-center items-center gap-6 w-full max-w-md">
        {photo ? (
          <>
            <Button variant="contained" onClick={retakePhoto} startIcon={<Replay />} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl w-40 h-14 shadow-md" disabled={loading}>
              {translations[language].retake || "Retake"}
            </Button>
            <Button variant="contained" onClick={detectImage} startIcon={<Search />} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl w-40 h-14 shadow-md" disabled={loading}>
              {loading ? translations[language].uploading || 'Uploading...' : translations[language].submit || 'Submit'}
            </Button>
          </>
        ) : null}
      </div>
    </div>
    <Navbar />
    </>
  );
};

export default UploadPage;

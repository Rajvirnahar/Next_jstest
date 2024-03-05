import { useState } from "react";

function RedesignedTattoo() {
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [openAIResponse, setOpenAIResponse] = useState("");
  const [isRedesigning, setIsRedesigning] = useState(false);

  function handleFileChange(event) {
    if (event.target.files.length === 0) {
      alert("Please select a file.");
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (image === "") {
      alert("Please upload an image before submitting.");
      return;
    }

    setIsRedesigning(true);

    try {
      const response = await fetch("/api/editUserImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, prompt }),
      });
      const data = await response.json();

      if (data.imageUrl) {
        setImage(data.imageUrl); // Update the image state with the URL of the redesigned image
        setOpenAIResponse(""); // Clear any previous AI response
      } else {
        setOpenAIResponse(data.message); // Display any message from the API, if available
      }
    } catch (error) {
      console.error("Error submitting image:", error);
    } finally {
      setIsRedesigning(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 w-full max-w-4xl rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Upload and Analyze Image</h2>
        {image ? (
          <div className="mb-4 overflow-hidden rounded-lg relative">
            <img src={image} alt="Uploaded" className="w-full object-cover max-h-96" />
            {isRedesigning && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-xl">
                Redesigning...
              </div>
            )}
          </div>
        ) : (
          <div className="mb-4 p-8 text-center">
            <p>Once you upload an image, it will be displayed here.</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Describe the changes you want</label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="text-sm text-gray-900 py-2 px-4 rounded border border-gray-700 bg-gray-800"
              placeholder="e.g., Make the lion more masculine"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold">
              Analyze Image
            </button>
          </div>
        </form>

        {openAIResponse && (
          <div className="border-t border-gray-600 pt-4 mt-4">
            <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
            <p>{openAIResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RedesignedTattoo;




/*

import { useState } from "react";

function RedesignedTattoo() {
  const [image, setImage] = useState("");
  const [openAIResponse, setOpenAIResponse] = useState("");

  function handleFileChange(event) {
    if (event.target.files.length === 0) {
      alert("Please select a file.");
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    if (image === "") {
      alert("Please upload an image before submitting.");
      return;
    }
  
    try {
      const response = await fetch("api/editUserImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });
      const reader = response.body.getReader();
      setOpenAIResponse("");
      let done = false;
      while (!done) {
        const { done: streamDone, value } = await reader.read();
        done = streamDone;
        if (!done) {
          const currentChunk = new TextDecoder().decode(value);
          setOpenAIResponse((prev) => prev + currentChunk);
        }
      }
    } catch (error) {
      console.error("Error submitting image:", error);
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 w-full max-w-4xl rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Upload and Analyze Image</h2>
        {image ? (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img src={image} alt="Uploaded" className="w-full object-cover max-h-96" />
          </div>
        ) : (
          <div className="mb-4 p-8 text-center">
            <p>Once you upload an image, it will be displayed here.</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              onChange={handleFileChange}
            />
          </div>
          
          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold">
              Analyze Image
            </button>
          </div>
        </form>

        {openAIResponse && (
          <div className="border-t border-gray-600 pt-4 mt-4">
            <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
            <p>{openAIResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RedesignedTattoo;
*/
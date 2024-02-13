

export default function EditTattoo() {
const [ image, setImage ] = useState<string>("");
const [ openAIResponse, setOpenAIResponse ] = useState<string>("");
<div className="min-h-screen flex items-center justify-center text-md">
      <div className='bg-slate-800 w-full max-w-2xl rounded-lg shadow-md p-8'>
        <h2 className='text-xl font-bold mb-4'>Uploaded Image</h2>
        { image !== "" ?
          <div className="mb-4 overflow-hidden">
            <img 
              src={image}
              className="w-full object-contain max-h-72"
            />
          </div>
        :
        <div className="mb-4 p-8 text-center">
          <p>Once you upload an image, you will see it here.</p>
        </div>
        }
        

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='flex flex-col mb-6'>
            <label className='mb-2 text-sm font-medium'>Upload Image</label>
            <input
              type="file"
              className="text-sm border rounded-lg cursor-pointer"
              onChange={(e) => handleFileChange(e)}
            />
          </div>
          
          <div className='flex justify-center'>
            <button type="submit" className='p-2 bg-sky-600 rounded-md mb-4'>
              Ask ChatGPT To Analyze Your Image
            </button>
          </div> 

        </form>

        {openAIResponse !== "" ?
        <div className="border-t border-gray-300 pt-4">
          <h2 className="text-xl font-bold mb-2">AI Response</h2>
          <p>{openAIResponse}</p>
        </div>
        :
        null
        }
        

      </div>
    </div>
}
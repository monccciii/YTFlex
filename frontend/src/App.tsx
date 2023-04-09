import { useState } from 'react'
import phoneimg from './assets/phooneimg.png';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [download, setDownload] = useState('');
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const handleProcessVideo = async () => {
    setIsWaiting(true);
    try {
      const response = await fetch('http://localhost:5000/process_video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_url: videoUrl }),
      });

      const data = await response.json();

      if (data.success) {
        setThumbnail(data.thumbnail_url);
        setDownload(data.download_url);
        setIsWaiting(false);
      } else {
        console.error('Error processing video:', data.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">YouTube Flex</h1>
        <p className="text-gray-300 text-xl font-semibold">Download YouTube Videos and Watch Them Anytime, Anywhere!</p>
      </header>
      <section className="w-full max-w-4xl mb-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <img src={phoneimg} alt="Phone" className="w-full max-w-md" />
          <div className="text-center">
            <a href="#getstartto" className="bg-indigo-600 text-xl px-8 py-3 rounded text-white font-semibold transition duration-200 hover:bg-indigo-700 ">Get Started!</a>
            <p className="mt-5 text-gray-300 text-lg font-semibold">Follow these simple steps to download videos:</p>
          </div>
        </div>
      </section>
      <section className="w-full max-w-4xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">Step 1</h2>
            <p className="text-gray-300 text-lg">Input your video link into the textbox.</p>
          </div>
          <div className="text-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">Step 2</h2>
            <p className="text-gray-300 text-lg">Press "Process Video"</p>
          </div>
          <div className="text-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">Step 3</h2>
            <p className="text-gray-300 text-lg">Wait for the video to be processed.</p>
          </div>
        </div>
      </section>
      <section className="w-full max-w-4xl mb-12">
        <div className="flex items-center justify-center gap-6">
          <input
            id='getstartto'
            className="w-full md:w-1/2 py-3 px-6 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <button
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-semibold transition duration-200 hover:bg-indigo-700"
            onClick={handleProcessVideo}
          >
            Process Video
          </button>
        </div>
        {isWaiting ? <p className='mt-5 text-white text-center'>Please wait...</p> : ''}
      </section>
      {thumbnail && (
  <section className="w-full max-w-4xl mb-12">
    <div className="text-center">
      <img src={thumbnail} alt="Video thumbnail" className="w-full max-w-md mx-auto mb-4" />
      <a
        href={download}
        className="bg-green-600 px-8 py-3 rounded-2xl text-white font-bold transition duration-200 hover:bg-green-700"
        download
      >
        Download Video
      </a>
    </div>
  </section>
)}

    </div>
  )
}

export default App

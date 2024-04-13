import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

const Video = () => {
  const [ID, setID] = useState(null);
  const token = sessionStorage.getItem('token')
const location = useLocation();
const [videoId, setvideoId] = useState(null)
//   const { videoId } = useParams();
//   const [searchParams] = useSearchParams();
//   const videoId = searchParams.get("ID");

    useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const encodedID = searchParams.get('ID');
    const decodedID = decodeURIComponent(encodedID);
    setID(decodedID);
    }, [location.search]);

    useEffect(() => {
        const fetchVideoData = async () => {
          try {
            const response = await axios.post('http://localhost:3001/getVideo', { ID:ID },
          {
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
            console.log("Response",response.data);
            setvideoId(extractVideoId(response.data.VideoURL))
          } catch (error) {
            console.log("Many requests");
          }
        };
        fetchVideoData();
      }, [ID, token]);

      const extractVideoId = (url) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match && match[1];
      };

  return (
    <div className='min-h-screen dark:bg-gray-900'>
    <NavBar />
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }} >
    <iframe
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '90%' }}
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      frameborder="0"
      allowfullscreen = "allowfullscreen"
    ></iframe>
  </div>
  
  </div>
  );
};

export default Video;

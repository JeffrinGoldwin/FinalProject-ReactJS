import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import axios from 'axios';

const Video = () => {
  const [ID, setID] = useState(null);
  const [video, setVideo] = useState({})
  const navigate = useNavigate();
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
            const response = await axios.post('http://localhost:3001/getVideo', { ID:ID });
            console.log("Response",response.data);
            setVideo(response.data)
            setvideoId(extractVideoId(response.data.VideoURL))
            // Handle the response data
          } catch (error) {
            console.error('Error fetching video data:', error);
          }
        };
    
        // Call the fetchVideoData function
        fetchVideoData();
      }, [ID]);

      const extractVideoId = (url) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match && match[1];
      };

  return (
    <>
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
  
  </>
  );
};

export default Video;

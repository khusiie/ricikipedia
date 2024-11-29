import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/location?page=${currentPage}`);
        setLocations(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError("Failed to fetch locations.");
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, [currentPage]);

  const handleLocationClick = (locationId, event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/location/${locationId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#1c1c1c] text-white min-h-screen pb-8">
      <h1 className="text-3xl font-bold py-8 text-center bg-gradient-to-r from-[#87CEEB] to-[#00CED1] text-[#1c1c1c]">
        Locations from the Rick and Morty Universe
      </h1>
      <div className='py-4 text-xl flex justify-center'>
         <Link to="/">
             <button className='border-b bg-gradient-to-r from-[#87ebca] to-[#21b960] px-4 py-2 rounded-xl hover:bg-gradient-to-l from-[#00CED1] to-[#87CEEB] transition-colors duration-300 text-[#1c1c1c]'>
              Back To Home
             </button>
         </Link>
      </div>
      
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="text-center py-8 text-xl">Loading locations...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="bg-[#242424] rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                  onClick={(e) => handleLocationClick(location.id, e)}
                >
                  <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
                    {location.name}
                    <span className="bg-gradient-to-r from-[#87CEEB] to-[#00CED1] text-[#1c1c1c] font-bold px-4 py-2 rounded-lg">
                      #{location.id}
                    </span>
                  </h2>
                  <p className="mb-3">
                    <span className="font-bold text-[#87CEEB]">Type:</span> {location.type}
                  </p>
                  <p className="mb-3">
                    <span className="font-bold text-[#00CED1]">Dimension:</span> {location.dimension}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`mx-2 px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-[#87CEEB] to-[#00CED1] text-[#1c1c1c]'
                      : 'bg-[#242424] hover:bg-[#333333] transition-colors duration-300'
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Location;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LocationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
        setLocation(response.data);
        console.log("residents Data" , response.data)
        
        
        const residentsData = await Promise.all(
          response.data.residents.map(url => axios.get(url))
        );
        setResidents(residentsData.map(res => res.data));
      } catch (err) {
        console.error('Error fetching location details:', err);
        setError('Failed to fetch location details');
      } finally {
        setLoading(false);
      }
    };

    fetchLocationDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1c1c1c] text-white flex items-center justify-center">
        <div className="text-2xl animate-pulse">Loading location details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1c1c1c] text-white flex items-center justify-center">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

   const handleCharacterDetails=(locationId ,e)=>{ 
    e.preventDefault();
    e.stopPropagation();
    navigate(`/character/${locationId}`)
   }

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white p-4">
      {/* Header */}
      <div className="container mx-auto">
        <button 
          onClick={() => navigate('/location')}
          className="mb-6 bg-[#24b7b7] hover:bg-[#1c9292] text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
          ← Back to Locations
        </button>
      </div>

      {location && (
        <div className="container mx-auto">
        
          <div className="bg-[#242424] rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold mb-6 text-[#24b7b7]">
              {location.name} <span className="text-2xl">#{location.id}</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-[#1c1c1c] p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-[#24b7b7] mb-2">Type</h2>
                  <p className="text-lg">{location.type}</p>
                </div>
                
                <div className="bg-[#1c1c1c] p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-[#24b7b7] mb-2">Dimension</h2>
                  <p className="text-lg">{location.dimension}</p>
                </div>
                
                <div className="bg-[#1c1c1c] p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-[#24b7b7] mb-2">Number of Residents</h2>
                  <p className="text-lg">{location.residents.length}</p>
                </div>
              </div>

             
              <div className="bg-[#1c1c1c] p-4 rounded-lg">
                <h2 className="text-xl font-bold text-[#24b7b7] mb-4">Notable Residents</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {residents.map(resident => (
                    <div 
                    onClick={(e) => handleCharacterDetails(resident.id, e)}


                      key={resident.id} 
                      className="bg-[#242424] p-3 rounded-lg hover:transform hover:scale-105 transition-transform duration-200"
                    >
                      <img 
                       
                        src={resident.image} 
                        alt={resident.name}
                        className="w-full h-auto rounded-lg mb-2"
                      />
                      <p className="text-sm font-medium text-center truncate">
                        {resident.name}
                      </p>
                    </div>
                  ))}
                </div>
                {location.residents.length > 6 && (
                  <p className="text-center mt-4 text-[#24b7b7]">
                    +{location.residents.length - 6} more residents
                  </p>
                )}
              </div>
            </div>
          </div>

        
          <div className="text-center text-gray-500">
            <p>Created: {new Date(location.created).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDetails;
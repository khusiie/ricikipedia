import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        
        const data = await response.json();
        console.log(data)
        setCharacter(data);
      } catch (err) {
        console.error('Error fetching character:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#2a9d8f] to-gray-900 flex items-center justify-center">
        <div className="text-green-400 text-2xl animate-pulse">
          Traveling through dimensions...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#2a9d8f] to-gray-900 p-4 md:p-8">
    
      <button
        onClick={() => navigate(-1)}
        className="mb-8 bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-2 rounded-lg transition-colors duration-300"
      >
        ← Back to Portal
      </button>

      <div className="max-w-4xl mx-auto">
      
        <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-green-500/20">
       
          <div className="bg-gradient-to-r from-gray-800/50 via-green-900/30 to-gray-800/50 p-6 border-b border-green-500/20">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
              {character.name}
            </h1>
          </div>

        
          <div className="grid md:grid-cols-2 gap-8 p-6">
            
            <div className="space-y-4">
              <div className="relative group">
                <img
                  src={character.image}
                  alt={character.name}
                  className="rounded-xl w-full hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-center">
                <span className={`inline-block px-4 py-2 rounded-full text-black font-bold ${
                  character.status === 'Alive' ? 'bg-green-500' :
                  character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                }`}>
                  {character.status}
                </span>
              </div>
            </div>

          
            <div className="space-y-6">
              <div className="bg-gray-800/30 rounded-xl p-6 border border-green-500/20">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Character Details</h2>
                <div className="space-y-4">
                  <InfoItem label="Species" value={character.species} />
                  <InfoItem label="Gender" value={character.gender} />
                  <InfoItem label="Origin" value={character.origin?.name} />
                  <InfoItem label="Location" value={character.location?.name} />
                  <InfoItem label="Type" value={character.type || 'Unknown'} />
                </div>
              </div>

          
              <div className="bg-gray-800/30 rounded-xl p-6 border border-green-500/20">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Episode Appearances</h2>
                <div className="text-green-300">
                  Featured in {character.episode?.length || 0} episodes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const InfoItem = ({ label, value }) => (
  <div className="group">
    <div className="text-gray-400 text-sm mb-1">{label}</div>
    <div className="text-green-300 text-lg font-medium group-hover:text-green-400 transition-colors duration-300">
      {value}
    </div>
  </div>
);

export default CharacterDetails;
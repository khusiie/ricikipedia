import React, { useState, useEffect , useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    let newFilteredData = [...data];

    if (search.trim() !== "") {
      if (!isNaN(search)) {
        const searchId = Number(search);
        newFilteredData = newFilteredData.filter(
          (character) => character.id === searchId
        );
      } else {
        newFilteredData = newFilteredData.filter((character) =>
          character.name.toLowerCase().includes(search.toLowerCase())
        );
      }
    }

    if (statusFilter !== "all") {
      newFilteredData = newFilteredData.filter(
        (character) => character.status.toLowerCase() === statusFilter
      );
    }

    setFilteredData(newFilteredData);
  }, [data, search, statusFilter]);

  useEffect(() => {
    const fetchData = async (page = 1) => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        setData(response.data.results);
        setFilteredData(response.data.results);
        setTotalPages(Math.ceil(response.data.info.count / 20));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, statusFilter, data]);

  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleLocationClick = (locationId, event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/location/${locationId}`);
  };

  const handleCharacterClick = (characterId, event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/character/${characterId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#2a9d8f] to-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 mb-4">
          Rick and Morty Explorer
        </h2>
        <p className="text-green-300 text-lg md:text-xl animate-pulse">
          Browse Characters Across Infinite Dimensions
        </p>
      </div>

      <div className="max-w-7xl mx-auto bg-black/30 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-green-500/20">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by ID or name"
            value={search}
            onChange={handleInputChange}
            className="flex-1 bg-gray-800/50 text-green-300 placeholder-green-600/50 border border-green-500/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {['asc', 'desc'].map((order) => (
            <button
              key={order}
              onClick={handleSort}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                sortOrder === order
                  ? 'bg-green-500 text-black'
                  : 'bg-gray-800/50 text-green-300 hover:bg-gray-700/50'
              }`}
            >
              {order === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          ))}

          {['all', 'alive', 'dead', 'unknown'].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-300 ${
                statusFilter === status
                  ? 'bg-green-500 text-black'
                  : 'bg-gray-800/50 text-green-300 hover:bg-gray-700/50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {filteredData.length === 0 ? (
          <p className="text-center text-red-400 text-lg">No results found in this dimension</p>
        ) : (
          <div className="grid gap-6">
            {filteredData.map((character) => (
              <div
                key={character.id}
                className="bg-gray-800/40 border border-green-500/20 rounded-xl overflow-hidden hover:border-green-500/40 transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-6 p-4">
                  <div className="space-y-4 text-center">
                    <div className="relative group">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="rounded-lg mx-auto hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={(e) => handleCharacterClick(character.id, e)}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-black font-bold px-6 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        Know More
                      </button>
                    </div>
                    <h3 className="text-2xl font-bold text-green-300">
                      #{character.id} {character.name}
                    </h3>
                  </div>

                  <div className="flex flex-col justify-center space-y-4 text-lg">
                    <p className="text-green-300">
                      <span className="text-gray-400">Gender:</span> {character.gender}
                    </p>
                    <p className="text-green-300">
                      <span className="text-gray-400">Status:</span> {character.status}
                    </p>
                    <p className="text-green-300">
                      <span className="text-gray-400">Species:</span> {character.species}
                    </p>
                    <p className="text-green-300">
                      <span className="text-gray-400">Type:</span> {character.type || 'Unknown'}
                    </p>
                    <div className="space-y-2">
                      <p className="text-gray-400">Origin:</p>
                      <p className="text-green-300">{character.origin.name}</p>
                      <button
                        onClick={(e) => handleLocationClick(character.origin.url.toString().split("/")[5], e)}
                        className="bg-[#2a9d8f] hover:bg-[#238276] text-white px-6 py-2 rounded-lg transition-colors duration-300"
                      >
                        Visit Location #{character.origin.url.toString().split("/")[5]}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-800 text-green-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex mx-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .slice(Math.max(0, currentPage - 6), Math.min(totalPages, currentPage + 4))
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 mx-1 rounded-lg ${
                  currentPage === page
                    ? "bg-green-300 text-gray-800"
                    : "bg-gray-800 text-green-300"
                }`}
              >
                {page}
              </button>
            ))
          }
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-800 text-green-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
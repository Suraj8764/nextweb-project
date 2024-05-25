import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://media-content.ccbp.in/website/react-assignment/resources.json"
        );

        const localResources = JSON.parse(localStorage.getItem('resources')) || [];

        const combinedResources = [...localResources, ...response.data];

        setResources(combinedResources);
        setFilteredResources(combinedResources);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch resources");
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    if (tab === "all") {
      setFilteredResources(resources);
    } else {
      setFilteredResources(
        resources.filter((resource) => resource.tag_name === tab)
      );
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value === "") {
      setFilteredResources(resources);
    } else {
      setFilteredResources(
        resources.filter((resource) =>
          resource.title
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
      );
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== '') {
      const filteredResults = resources.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResources(filteredResults);
    } else {
      setFilteredResources(resources);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredResources(resources);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container">
      <div className="tabs-wrapper">
        <div className="tabs">
          <button
            onClick={() => handleTabClick("all")}
            className={activeTab === "all" ? "active" : ""}
          >
            Resources
          </button>
          <button
            onClick={() => handleTabClick("request")}
            className={activeTab === "request" ? "active" : ""}
          >
            Requests
          </button>
          <button
            onClick={() => handleTabClick("user")}
            className={activeTab === "user" ? "active" : ""}
          >
            Users
          </button>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <i
          className={`fa-solid ${searchQuery ? 'fa-times' : 'fa-magnifying-glass'}`}
          style={{ position: "relative", right: "21rem", cursor: 'pointer' }}
          onClick={searchQuery ? clearSearch : handleSearchSubmit}
        ></i>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="resource-cards">
        {paginatedResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      <div className="pagination">
        {Array.from({
          length: Math.ceil(filteredResources.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;

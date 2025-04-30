import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./FetchData.css";

const FetchData = ({ cat }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        return date.toLocaleDateString('en-IN', options);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const apiUrl = cat
            ? `${process.env.REACT_APP_API_URL}/news?category=${cat}`
            : `${process.env.REACT_APP_API_URL}/news`;

            try {
                const response = await axios.get(apiUrl);
                const formattedData = response.data.articles.map(article => ({
                    ...article,
                    formattedDate: formatDate(article.publishedAt)
                }));
                setData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cat]);

    const renderCards = () => {
        return data.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                    <img src={item.urlToImage || "https://via.placeholder.com/300x200"} className="card-img-top" alt="News visual" />
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.content || "Click below to read more."}</p>
                        <p className="card-source"><b>Source:</b> {item.source?.name || "Unknown"}</p>
                        {item.formattedDate && (
                            <p className="card-publishedAt"><b>Date:</b> {item.formattedDate.split(',')[0]}</p>
                        )}
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="container my-5">
            <h3 style={{ fontSize: "36px" }}>Top Headlines</h3>
            <div className="row">
                {loading ? "Loading..." : (data.length > 0 ? renderCards() : "No news found.")}
            </div>
        </div>
    );
};

export default FetchData;

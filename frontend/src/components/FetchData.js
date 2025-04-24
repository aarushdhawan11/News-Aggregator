import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import "./FetchData.css";

const FetchData = ({ cat }) => {
    const [data, setData] = useState([]);

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
            const apiUrl = cat
    ? `http://localhost:4003/news?category=${cat}`
    : `http://localhost:4003/news`;


            try {
                const response = await axios.get(apiUrl);
                const formattedData = response.data.articles.map(article => ({
                    ...article,
                    formattedDate: formatDate(article.publishedAt)
                }));
                setData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [cat]);

    const renderCards = () => {
        return data.map((item, index) => (
            <div className="col-md-4 mb-4 my-4" key={index}>
                <div className="card" style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                    <img src={item.urlToImage} className="card-img-top" alt="No Pic is there" />
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.content}</p>
                        <p className="card-source"><span style={{color:"black",fontSize:"18px"}}><b>Source:</b></span> {item.source.name}</p>
                        {item.formattedDate && (
                            <p className='card-publishedAt'>
                                <span style={{color:"black",fontSize:"18px"}}><b>Date:</b></span> {item.formattedDate.split(',')[0]}
                            </p>
                        )}
                        <Link to={item.url} target="_blank" className="btn btn-primary">
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="container my-5">
            <h3 style={{fontSize:"50px"}}>Top Headlines</h3>
            <div className="row">
                {data.length > 0 ? renderCards() : "Loading..."}
            </div>
        </div>
    );
};

export default FetchData;

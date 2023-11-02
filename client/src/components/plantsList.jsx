import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PLANTS = gql`
    query GetPlants {
        plants {
            id
            name
            owner {
                username
            }
        }
    }
`;

function PlantsList() {
    const [data, setData] = useState(null);
    const { loading, error, data: queryData } = useQuery(GET_PLANTS);

    useEffect(() => {
        if (queryData) {
            setData(queryData.plants);
        }
    }, [queryData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    if (!data || data.length === 0) return <p>No plants found.</p>;

    return (
        <div>
            <h1>API Data</h1>
            {data.map(({ id, name, owner }) => (
                <div key={id} className="plant-card">
                    <h2>{name}</h2>
                    <p>Owner: {owner.username}</p>
                </div>
            ))}
        </div>
    );
}

export default PlantsList;

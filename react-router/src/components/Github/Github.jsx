import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    
    const data = useLoaderData()

    // const [data, setData] = useState({})
    // useEffect(() => {
    //     fetch("https://api.github.com/users/aqibowais")
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             setData(data)
    //             setLoading(false)
    //         })
    //         .catch(error => {
    //             console.error("Error fetching GitHub data:", error)
    //             setLoading(false)
    //         })
    // }, [])


    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 my-8">
            <div className="flex flex-col md:flex-row items-center mb-6">
                <img 
                    src={data.avatar_url} 
                    alt={data.name || "GitHub User"} 
                    className="w-32 h-32 rounded-full border-4 border-gray-200 mb-4 md:mb-0 md:mr-6"
                />
                <div className="text-center md:text-left">
                    <h1 className="text-2xl font-bold text-gray-800">{data.name || data.login}</h1>
                    <h2 className="text-lg text-gray-600">@{data.login}</h2>
                    {data.bio && <p className="mt-2 text-gray-700">{data.bio}</p>}
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <span className="block text-2xl font-bold text-gray-800">{data.followers}</span>
                    <span className="text-gray-600">Followers</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <span className="block text-2xl font-bold text-gray-800">{data.following}</span>
                    <span className="text-gray-600">Following</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <span className="block text-2xl font-bold text-gray-800">{data.public_repos}</span>
                    <span className="text-gray-600">Repositories</span>
                </div>
            </div>
            
            {data.html_url && (
                <a 
                    href={data.html_url} 
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    View Profile
                </a>
            )}
        </div>
    )
}


export default Github

export const githubInfoLoader = async()=>{
     const data = await fetch("https://api.github.com/users/aqibowais")
     return data.json()
}

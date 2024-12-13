import React from 'react';
import { useSelector } from 'react-redux';

const ExpandLikes = () => {
    const { likes } = useSelector((state) => state.profile);
    console.log("LIKES --> ", likes);

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-800">
            <div className="w-full max-w-lg h-96 border border-gray-700 bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex justify-between items-center border-b border-gray-600 p-4">
                    <p className="text-xl font-semibold">Likes</p>
                </div>

                <div className="p-4 overflow-y-auto">
                    {likes && likes.length > 0 ? (
                        likes.map((like) => (
                            <div key={like._id} className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded-lg transition duration-200 ease-in-out">
                                {/* User Profile Pic */}
                                <div className="h-10 w-10 rounded-full overflow-hidden">
                                    <img 
                                        src={like.profilePicture} 
                                        alt="User" 
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Username */}
                                <div className="text-sm font-medium text-gray-300">
                                    {like.username}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No likes yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExpandLikes;

/* eslint-disable react/prop-types */

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="bg-white border border-gray-100 shadow-md p-6 rounded-lg text-center">
            <div className="text-4xl mb-4 place-items-center text-blue-600">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
};

export default FeatureCard;
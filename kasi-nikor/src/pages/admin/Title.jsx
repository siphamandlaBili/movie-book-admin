import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-6">
      <h1 className="text-white-500 text-lg md:text-xl font-medium">{text1}</h1>
      <h2 className="text-white-800 text-2xl md:text-3xl font-bold">{text2}</h2>
    </div>
  );
};

export default Title;
import React from 'react';
import styled from 'styled-components';

// Styled component for the loading indicator
const LoadingContainer = styled.div`
  position: fixed; /* Fixed position to cover the whole viewport */
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: blue; /* Blue background */
  color: yellow; /* Yellow text color */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  font-size: 24px; /* Adjust font size */
  z-index: 9999; /* Ensure it's above other content */
`;

const LoadingIndicator = () => {
  return (
    <LoadingContainer>
      Loading...
    </LoadingContainer>
  );
};

export default LoadingIndicator;

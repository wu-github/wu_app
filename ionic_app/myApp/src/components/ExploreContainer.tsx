import React from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <div>
        <strong>Wurd</strong>
      </div>
    </div>
  );
};

export default ExploreContainer;

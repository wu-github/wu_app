import React from 'react';
import './ExploreContainer.css';
import { InAppBrowser } from '@ionic-native/in-app-browser';

interface ContainerProps {
  name: string;
}

function ItemSelected (item:string){
  const browser = InAppBrowser.create(item,'_self');
  browser.show();
  return null;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://www.baidu.com">
        UI Components</a></p>
      <p>Explore <a href="https://www.baidu.com">UI Components</a></p>
      <p>Explore <button onClick={e => ItemSelected("https://www.baidu.com")}>
        UI Components</button></p>
    </div>
  );
};

export default ExploreContainer;

import React from 'react';
import { IonContent, IonPage, IonGrid } from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          
            <iframe className="tab1-iframe-baidu" title="baidu.com" src="https://www.baidu.com">

            </iframe>
          
        </IonGrid>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

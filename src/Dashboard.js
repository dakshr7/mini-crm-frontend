import React from 'react';
import AudienceBuilder from './AudienceBuilder';
import Campaigns from './Campaigns';

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to Daksh's Dashboard</h1>
      <AudienceBuilder />
      <Campaigns />
    </div>
  );
};

export default Dashboard;

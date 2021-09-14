import React from 'react';
import Header from './Header/Header';

const Page: React.FC = ({ children }) => {
  return (
    <div className={'page'}>
      <Header />
      <>{children}</>
    </div>
  );
};

export default Page;

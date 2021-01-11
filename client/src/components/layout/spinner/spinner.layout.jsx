import React from 'react';
import spinner from '../../../images/spinner.gif';

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt='Loading...'
        style={{
          width: '200px',
          margin: 'auto',
          display: 'block',
          backgroundColor: 'var(--primary-color)',
        }}
      />
    </div>
  );
};

export default Spinner;

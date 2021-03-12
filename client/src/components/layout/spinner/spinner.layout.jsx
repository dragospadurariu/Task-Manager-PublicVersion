import React from 'react';
import spinner from '../../../images/spinner.gif';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Loader type='ThreeDots' color='#00BFFF' height={100} width={100} />
    </div>
  );
};

export default Spinner;

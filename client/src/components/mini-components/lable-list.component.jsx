import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './card.styles.scss';
import './lable-card.styles.scss';
import './lable-card.styles.scss';
import Modal from 'react-modal';
import LabelPopup from './label-list-popup.component';
import { modalStyles } from '../utils/modal.style';

const LableList = ({ title, style }) => {
  const { labels } = useSelector((state) => state.labelReducer);
  const [showLabelPopup, setShowLabelPopup] = useState(false);
  const [labelData, setLabelData] = useState(null);

  return (
    <div className='card card-third' style={style}>
      <div
        className='card-container'
        style={{ maxHeight: '25rem', overflow: 'auto', padding: 0 }}
      >
        <span className='card-title'>{title}</span>
        <section className='label-list-container'>
          {labels.map((label) => {
            return (
              <div
                className='label-row-container'
                onClick={() => {
                  setLabelData({ title: label.name, id: label._id });
                  setShowLabelPopup((prevState) => !prevState);
                }}
                key={label._id}
              >
                <span>{label.name}</span>
                <span
                  className='label-list-circle'
                  style={{ backgroundColor: `${label.colorCode}` }}
                ></span>
              </div>
            );
          })}
        </section>
      </div>

      <Modal
        ariaHideApp={false}
        className='dashboard-card-popup'
        isOpen={showLabelPopup}
        style={modalStyles}
      >
        <LabelPopup
          setShowLabelPopup={setShowLabelPopup}
          labelData={labelData}
        />
      </Modal>
    </div>
  );
};

export default LableList;

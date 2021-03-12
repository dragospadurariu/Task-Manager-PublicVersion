import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './dashboard-card.styles.scss';
import DashboardPopup from './dashboard-popup.component';
import Modal from 'react-modal';
import { modalStyles } from '../utils/modal.style';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import ToolTipComponent from '../utils/tooltip.component';

const DashboardCard = ({ title, id }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [showDashboardPopup, setShowDashboardPopup] = useState(false);

  const history = useHistory();
  return (
    <div className='dashboard-card-item'>
      <span
        className='icon-material absolute-top-page'
        onClick={() => {
          setShowDashboardPopup((prevState) => !prevState);
          setDashboardData({ title, id });
        }}
      >
        <ToolTipComponent text='Dashboard settings'>
          <span>more_horiz</span>
        </ToolTipComponent>
      </span>
      <span
        className='dashboard-card-title'
        onClick={() => history.push(`/dashboard/${id}`)}
      >
        {title}
      </span>

      <Modal
        ariaHideApp={false}
        className='dashboard-card-popup'
        isOpen={showDashboardPopup}
        style={modalStyles}
      >
        <DashboardPopup
          setShowDashboardPopup={setShowDashboardPopup}
          dashboardData={dashboardData}
        />
      </Modal>
    </div>
  );
};

export default DashboardCard;

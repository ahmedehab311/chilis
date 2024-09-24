import React from 'react';

const OrderStatus = ({ currentStatus }) => {
  const statusMap = {
    Pending: 'Pending',
    PreparingOrder: 'Preparing Order',
    InWay: 'In Way',
    Delivered: 'Delivered',
    Completed: 'Completed',
    Canceled: 'Canceled',
    Rejected: 'Rejected',
  };

  const getStatusIcon = (status) => {
    if (currentStatus === 'Delivered' && status === 'Completed') {
      return '✅';
    } else if (
      (currentStatus === 'Canceled' || currentStatus === 'Rejected') &&
      status === 'Canceled'
    ) {
      return '✅';
    } else if (
      ['Pending', 'InWay', 'PreparingOrder'].includes(currentStatus) &&
      currentStatus === status
    ) {
      return '✅';
    }
    return '';
  };

  return (
    <div>
      <div>
        <span>{getStatusIcon('Pending')}</span>
        <span>{statusMap['Pending']}</span>
      </div>
      <div>
        <span>{getStatusIcon('PreparingOrder')}</span>
        <span>{statusMap['PreparingOrder']}</span>
      </div>
      <div>
        <span>{getStatusIcon('InWay')}</span>
        <span>{statusMap['InWay']}</span>
      </div>
      <div>
        <span>{getStatusIcon('Delivered')}</span>
        <span>{statusMap['Delivered']}</span>
      </div>
      {currentStatus === 'Delivered' && (
        <div>
          <span>{getStatusIcon('Completed')}</span>
          <span>{statusMap['Completed']}</span>
        </div>
      )}
      {(currentStatus === 'Canceled' || currentStatus === 'Rejected') && (
        <div>
          <span>{getStatusIcon('Canceled')}</span>
          <span>{statusMap['Canceled']}</span>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;

import React from 'react';

export default function Spinner() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '50px auto', height: '100px'}}>
      <svg width="80" height="80">
        <use xlinkHref="#spinner"></use>
      </svg>
      <span>&nbsp;Loading...</span>
    </div>
  );
}

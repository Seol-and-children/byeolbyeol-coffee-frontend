import React, { useState, useEffect } from 'react';
import '../css/styles.css';

const FranchiseLogo = ({ backColor, fontColor, name }) => {
return (
    <div>
        <div class="main-image" style={{
        backgroundColor: backColor,
        color: fontColor,
        width: 74,
        height: 26,
        borderRadius: 20,
        }}>
        {name}
      </div>
    </div>
)
}
export default FranchiseLogo;
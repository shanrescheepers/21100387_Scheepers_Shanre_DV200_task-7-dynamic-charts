import React from 'react';
import 'chart.js/auto';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DynamicChart = () => {

    return (
        <div>

        </div>
    );
};


export default DynamicChart;
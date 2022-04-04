import React from 'react';
import 'chart.js/auto';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import TableItem from './TableItem';
import { fontSize } from '@mui/system';

ChartJS.register(ArcElement, Tooltip, Legend);

const DynamicChart = () => {
    const [chartInfo, setChartInfo] = useState([]);
    const [failedInfo, setFailedInfo] = useState([]);
    const [successInfo, setSuccessInfo] = useState([]);

    const [showMissions, setShowMissions] = useState([]);

    const linkval = useRef();
    useEffect(() => {

        axios.get('https://api.spacexdata.com/v5/launches')
            .then((res) => {


                let data = res.data;
                let success = data.filter((item) => item.success === true).length;
                let fail = data.filter((item) => item.success === false).length;

                setChartInfo([success, fail]);

                const successData = [];
                const failData = [];

                for (let i = 0; i < data.length; i++) {
                    if (data[i].success === false) {
                        failData.push({
                            id: data[i].id,
                            imgUrl: data[i].links.patch.small,
                            flightNum: data[i].flight_number,
                            flightName: data[i].name,
                            videoUrl: data[i].links.youtube_id,
                            articleUrl: data[i].links.article
                        });
                    } else {
                        successData.push({
                            id: data[i].id,
                            imgUrl: data[i].links.patch.small,
                            flightNum: data[i].flight_number,
                            flightName: data[i].name,
                            videoUrl: data[i].links.youtube_id,
                            articleUrl: data[i].links.article
                        });
                    }
                }


                setFailedInfo(failData);
                setSuccessInfo(successData);


                let startItem = failData.map((item) => <TableItem id={item.id} fname={item.flightName} fnum={item.flightNum} imgUrl={item.imgUrl} vidlink={item.videoUrl} article={item.articleUrl} />)
                setShowMissions(startItem);

            })
    }, [])
    const faledItems = failedInfo.map((item) => <TableItem id={item.id} fname={item.flightName} fnum={item.flightNum} imgUrl={item.imgUrl} vidlink={item.videoUrl} article={item.articleUrl} />)

    const successItems = successInfo.map((item) => <TableItem id={item.id} fname={item.flightName} fnum={item.flightNum} imgUrl={item.imgUrl} vidlink={item.videoUrl} article={item.articleUrl} />)

    const chartData = {

        labels: ['Success', 'Failures'],
        fontSize: ['60px'],
        datasets: [{
            label: 'Success/Fail for launches',

            data: chartInfo,

            backgroundColor: [
                '#4318ff',
                '#9b111e',
            ],

            borderColor: [
                '#4318ff',
                '#9b111e',
            ],
            borderWidth: 1
        }]
    }



    function updateMission() {
        let getValue = linkval.current.value;

        console.log(getValue);

        if (getValue === "Failed") {
            setShowMissions(faledItems)
        } else if (getValue === "Success") {
            setShowMissions(successItems);
        }
    }

    return (
        <div>
            <div className='left-panel'>
                <Doughnut data={chartData} />
            </div>
            <div className='right-panel'>
                <h3>MISSION INFORMATION</h3>
                <p className='selectp'>Select Failed or Success Missions</p>
                <select className='select' onChange={updateMission} ref={linkval}>

                    <option>Failed</option>
                    <option>Success</option>
                </select>
                <div className='container'>
                    {showMissions}
                </div>
            </div>
        </div>
    );
};


export default DynamicChart;
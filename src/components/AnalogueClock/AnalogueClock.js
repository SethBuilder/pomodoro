import React, { useState, useEffect } from 'react';
import './AnalogueClock.css';


function AnalogueClock({ date, mode, fixedDate, pause, standby }) {
    const [sector, setSector] = useState();

    const deg = 6;
    const hh = date.getHours() * 30;
    const mm = date.getMinutes() * deg;
    const ss = date.getSeconds() * deg;

    useEffect(() => {
        const startDeg = ((date.getMinutes() * deg) + 360 - 90) % 360;
        const startDegFixed = ((fixedDate.getMinutes() * deg) + 360 - 90) % 360;
        const highlightPeriod = mode.duration;
        const endDeg = startDegFixed + (highlightPeriod * deg);
        const pomodoroSector = {
            backgroundColor: '#bcd0e7',
            backgroundImage: `url(clock.png), 
            linear-gradient(${startDeg}deg, transparent 50%,  #fff 50%), 
            linear-gradient(${endDeg}deg,  #fff 50%, transparent 50%)`
        }

        const pauseSector = {
            backgroundColor: '#E4342F',//253 36 76
            backgroundImage: `url(clock.png), 
            linear-gradient(${startDeg}deg, transparent 50%,  #fff 50%), 
            linear-gradient(${endDeg}deg,  #fff 50%, transparent 50%)`
        }

        const noSector = {
            background: '#fff url(clock.png)',
            backgroundSize: 'cover'
        };
        
        if (pause && !standby) {
            setSector(pauseSector);
        } else if (!standby && mode.name === 'Pomodoro' || mode.name === 'Short Break' || mode.name === 'Long Break') {
            setSector(pomodoroSector);
        } else {
            setSector(noSector);
        }
    }, [pause, mode, date, fixedDate, standby])

    return (
        <div className="clock"
            style={sector}
        >
            <div className="hour">
                <div className="hr" id="hr" style={{ transform: `rotateZ(${(hh) + (mm / 12)}deg)` }}>

                </div>
            </div>
            <div className="min">
                <div className="mn" id="mn" style={{ transform: `rotateZ(${mm}deg)` }}>

                </div>
            </div>
            <div className="sec">
                <div className="sc" id="sc" style={{ transform: `rotateZ(${ss}deg)` }}>

                </div>
            </div>
        </div>
    );
}

export default AnalogueClock;
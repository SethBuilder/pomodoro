import React, { useState, useEffect } from 'react'
import AnalogueClock from '../AnalogueClock/AnalogueClock'
import DigitalClock from '../DigitalClock/DigitalClock'
import { Button } from 'evergreen-ui'
import { SegmentedControl } from 'evergreen-ui'
import './Timer.css'

function Timer() {
    const modes = Object.freeze({
        pomodoro: {
            name: 'Pomodoro',
            code: 'pomodoro',
            duration: 25
        },
        shortBreak: {
            name: 'Short Break',
            code: 'shortBreak',
            duration: 5
        },
        longBreak: {
            name: 'Long Break',
            code: 'longBreak',
            duration: 10
        },
        // standby: {
        //     name: 'standby',
        //     code: 'standby',
        //     duration: 3
        // },
        flow: {
            name: 'Flow',
            code: 'flow'
        }
    });
    // Updates every seconds (for clock)
    const [date, setDate] = useState(new Date());

    // Set when start button is clicked (for timers)
    const [fixedDate, setFixedDate] = useState(date);
    const [mode, setMode] = useState(modes.pomodoro);
    const [pause, setPause] = useState(false);
    const [standby, setStandby] = useState(true);

    const controls = {
        options: [
            { label: 'Pomodoro', value: 'pomodoro' },
            { label: 'Short Break', value: 'shortBreak' },
            { label: 'Long Break', value: 'longBreak' }
        ],
        value: 'pomodoro'
    }

    useEffect(() => {

        const tick = () => {
            // console.log(fixedDate)
            setDate(new Date())
            if (pause && date.getSeconds() === 59) {
                setFixedDate(new Date(fixedDate.setMilliseconds(fixedDate.getMilliseconds() + 1000 * 60)))
            }
        }
        const secondsTimer = setInterval(
            () => tick(),
            1000
        )
        return () => {
            if (secondsTimer)
                clearInterval(secondsTimer);
        }
    }, [mode, pause, date, fixedDate])

    return (
        <div className="main-container">
            <div>
                <SegmentedControl
                    width={600}
                    name="switch"
                    height={40}
                    appearance="success"
                    intent="danger"
                    options={controls.options}
                    value={mode.code}
                    onChange={value => setMode(modes[value])}
                />
            </div>
            <div>
                <AnalogueClock standby={standby} fixedDate={fixedDate} date={date} mode={mode} pause={pause} />
            </div>
            <div>
                <DigitalClock standby={standby} mode={mode} pause={pause} />
            </div>
            <div>
                <Button height={40}
                    marginRight={16} appearance="primary" intent="success"
                    onClick={
                        () => {
                            if (pause) {
                                setPause(false)
                            } else {
                                setStandby(false)
                                setFixedDate(date)
                                // setFixedDate(new Date(fixedDate.setSeconds(date.getSeconds() + 60-date.getSeconds())))
                            }
                        }
                    } >
                    Start
                </Button>

                <Button
                    height={40} marginRight={16} appearance="primary" intent="danger"
                    onClick={
                        () => {
                            setPause(true);
                        }
                    } >
                    Pause
                </Button>

                <Button height={40} marginRight={16} appearance="primary"
                    onClick={
                        () => {
                            setStandby(true);
                            setPause(false);
                            setMode(modes.pomodoro)
                        }
                    }>
                    Reset
                </Button>
            </div>
        </div >
    );
}

export default Timer;
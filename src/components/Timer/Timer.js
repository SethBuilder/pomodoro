import React, { useState, useEffect } from 'react'
import AnalogueClock from '../AnalogueClock/AnalogueClock'
import DigitalClock from '../DigitalClock/DigitalClock'
import { Button, Pane } from 'evergreen-ui'
import { SegmentedControl, majorScale } from 'evergreen-ui'
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
    const [pomodoroCount, setPomodoroCount] = useState(0);

    const controls = {
        options: [
            { label: 'Pomodoro', value: 'pomodoro' },
            { label: 'Short Break', value: 'shortBreak' },
            { label: 'Long Break', value: 'longBreak' }
        ],
        value: 'pomodoro'
    }
    const proceed = () => {
        console.log("pomodorocount", pomodoroCount)
        if (pomodoroCount > 3 && mode.code === modes.pomodoro.code) {
            setPomodoroCount(0)
            setMode(modes.longBreak)
            console.log(1)
        }

        else if (mode.code === modes.shortBreak.code || mode.code === modes.longBreak.code) {
            setMode(modes.pomodoro)
            console.log(2)

        }

        else if (mode.code === modes.pomodoro.code) {
            setPomodoroCount(pomodoroCount => pomodoroCount + 1);
            setMode(modes.shortBreak)
            console.log(3)
        }
    }

    useEffect(() => {

        const tick = () => {
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
            <Pane
                height='100%'
                width='100%'
                backgrounf='tealTint'
                display="flex"
                // padding={26}
                // margin={26}
                alignItems="center"
                justifyContent="center"
            >
                <SegmentedControl
                    width={420}
                    name="switch"
                    height={majorScale(5)}
                    appearance="success"
                    intent="danger"
                    options={controls.options}
                    value={mode.code}
                    onChange={value => setMode(modes[value])}
                />
            </Pane>
            <Pane
                height='100%'
                width='100%'
                backgrounf='tealTint'
                display="flex"
                paddingTop={28}
                // margin={26}
                alignItems="center"
                justifyContent="center"
            >
                <AnalogueClock standby={standby} fixedDate={fixedDate} date={date} mode={mode} pause={pause} />
            </Pane>
            <Pane
                height='100%'
                width={100}
                backgrounf='tealTint'
                display="flex"
                paddingTop={28}
                // margin={26}
                alignItems="center"
            // justifyContent="center"
            >
                <DigitalClock standby={standby} mode={mode} pause={pause} proceed={proceed} />
            </Pane>
            <Pane
                height='100%'
                width='100%'
                backgrounf='tealTint'
                display="flex"
                padding={26}
                // margin={26}
                alignItems="center"
                justifyContent="center"
            >
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
            </Pane>
        </div >
    );
}

export default Timer;
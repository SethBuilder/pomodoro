import React, { useEffect, useState, useRef } from "react"
import {  Heading } from 'evergreen-ui'

import "./DigitalClock.css";

function DigitalClock({ mode, pause, standby, proceed }) {
    const [display, setDisplay] = useState(`${mode.duration}:00`);
    const [duration, setDuration] = useState(mode.duration * 60 - 1);
    const [currentMode, setCurrentMode] = useState(mode);
    let countdown;
    countdown = useInterval(() => {
        let minutes, seconds

        // if (!pause) {
        setDuration(duration => duration - 1)
        // console.log(duration + 1)
        minutes = parseInt(duration / 60, 10);
        seconds = parseInt(duration % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        setDisplay(
            `${minutes}:${seconds}`
        );
        document.title = `${minutes}:${seconds}`
        // }
        if (currentMode.code !== mode.code || standby) {
            console.log('CHANGED MODE')
            setDuration(mode.duration * 60 - 1)
            setDisplay(
                `${mode.duration}:00`
            )
            // setCurrentMode(mode)
        }
        else {
            if (duration < 0) {
                clearInterval(countdown)
            }
        }

    }, !pause && duration >= 0 ? 1000 : null, mode, duration, standby, currentMode);

    function useInterval(callback, delay, mode, duration) {
        const savedCallback = useRef();
        

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            let id;
            if (currentMode.code !== mode.code || standby) {
                setDisplay(`${mode.duration}:00`)
                setDuration(mode.duration * 60 - 1)
                setCurrentMode(mode)
            }
            // console.log(duration === 0, 'hhhhhhhh')

            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                id = setInterval(tick, delay);
                return () => clearInterval(id);
            } else if(!pause) {
                console.log('ffdffd')
                proceed()
                setDuration(mode.duration * 60 - 1)
                setDisplay(
                    `${mode.duration}:00`
                )
            }
        }, [delay, duration, standby, currentMode]);
    }

    return (

        < Heading size={ 900} > { display }</Heading >


    );
}

export default DigitalClock;

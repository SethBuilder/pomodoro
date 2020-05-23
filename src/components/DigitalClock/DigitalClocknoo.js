import React from "react";
import "./DigitalClock.css";

class DigitalClock extends React.Component {
    constructor(props) {
        super(props)
        const { mode } = props
        this.state = {
            display: `${mode.duration}:00`,
            duration: mode.duration * 60
        }
        this.countdown = '';
    }

    componentDidMount() {

        // if (standby) {
        // this.setState({ duration: this.props.mode.duration * 60 - 1 })
        // this.setState({
        //     display: `${this.props.mode.duration}:00`
        // }
        // )
        // }
    }
    componentDidUpdate() {
        clearInterval(this.countdown)
        // if (standby) {
        this.setState({ duration: this.props.mode.duration * 60 - 1 })
        this.setState({
            display: `${this.props.mode.duration}:00`
        }
        )
        // }
        // const { mode, pause, standby } = this.props
        // const { display, duration, done } = this.state
        this.countdown = setInterval(() => {
            let minutes, seconds

            if (this.state.duration > 0 && !this.props.pause && !this.props.standby) {
                console.log(this.props)
                // this.setState(duration => ({ duration: duration - 1 }))
                this.setState((state, props) => ({
                    duration: state.duration - 1
                }))
                // console.log(this.state.duration + 1)
                minutes = parseInt(this.state.duration / 60, 10);
                seconds = parseInt(this.state.duration % 60, 10);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                this.setState((state, props) => ({
                    display: `${minutes}:${seconds}`
                })
                );
                document.title = this.state.display
            }

            else {
                // if (this.state.duration < 0) {
                    this.setState((state, props) => ({
                        duration: props.mode.duration
                    }));
                    // this.setState({ done: true })
                    clearInterval(this.countdown);
                // }
            }
        }, 1000);
    }

    componentWillUnmount() {
        return () => {
            clearInterval(this.countdown);
        };
    }
    shouldComponentUpdate(prevProps, prevState) {
        return prevProps.standby !== this.props.standby || prevProps.pause !== this.props.pause || prevProps.mode.duration !== this.props.mode.duration
    }
    render() {
        return (
            <>
                {<h1>{this.state.display}</h1>}
            </>
        )
    }
}
export default DigitalClock;

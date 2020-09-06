import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Clock(props) {
    const [timeString, setTimeString] = useState("");

    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date();
            const newTimeString = formatDate(now);

            setTimeString(newTimeString);
        }, 1000);

        return () => {
            clearInterval(clockInterval);
        };
    }, []);
    return (
        <div>
            <p style={{ fontSize: "42px" }}>{timeString}</p>
        </div>
    );
}
function formatDate(date) {
    const hour = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${hour}:${minutes}:${seconds}`;
}

Clock.propTypes = {};

export default Clock;

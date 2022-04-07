import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import className from 'classnames';
import '../CSS/Calendar.css';
import buildCalendar from './build';
import Modal from './Modal';
import { AddEventContext } from '../hooks/useEventContext';

export default function Calendar() {
    const { eventValue, eventState, setEventState } = useContext(AddEventContext);
    const [calendar, setCalendar] = useState([])
    const [dayName, setDayName] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    const [value, setValue] = useState(moment());
    const [dateSelected, setdateSelected] = useState(true);
    const [eventSet, setSet] = useState(false);

    useEffect(() => {
        setCalendar(buildCalendar(value))
    }, [value]);

    var dateSelectedClass = className({
        'date-selected': dateSelected,
        'event-set': eventSet,
    })

    function currentMonth() {
        return value.format('MMMM');
    }

    function currentYear() {
        return value.format('YYYY')
    }

    //------------- Change Month View ---------------//
    function prevMonth() {
        return value.clone().subtract(1, 'month')
    }

    function nextMonth() {
        return value.clone().add(1, 'month')
    }
    //----------------Change Month View End ------------//


    //------------- Change Year View ---------------//
    function prevYear() {
        return value.clone().subtract(1, 'year')
    }

    function nextYear() {
        return value.clone().add(1, 'year')
    }
    //----------------Change Year View End ------------//


    //-----Add New Event (View Modal) ------//
    function AddEventFunction() {
        setEventState(!eventState)
        console.log(eventValue)
    }
    //---------------------------------------//


    function isSelected(day) {
        return value.isSame(day, 'day')
    }

    function dateBeforeToday(day) {
        return day.isBefore(new Date(), 'day')
    }

    function istodayDate(day) {
        return day.isSame(new Date(), 'day')
    }

    function dayStyles(day){
        if(dateBeforeToday(day)) return "days-before"
        if(isSelected(day)) return "date-selected"
        if(istodayDate(day)) return "date-today"
        if(eventValue) return console.log(eventValue)
        return ""
    }

    return (
        <div className='calendar-container'>
            <div className='calendar-head'>
                <div className='calendar-month-container'>
                    <div className='arrow left' onClick={() => setValue(prevMonth())}></div>
                    <div className='calendar-month'>{currentMonth()}</div>
                    <div className='arrow right' onClick={() => setValue(nextMonth())}></div>
                </div>
                <div className='calendar-year-container'>
                    <div className='arrow left' onClick={() => setValue(prevYear())}></div>
                    <div className='calendar-year'>{currentYear()}</div>
                    <div className='arrow right' onClick={() => setValue(nextYear())}></div>
                </div>
            </div>
            <div className='calendar'>
                <div className='calendar-body'>
                    <div className='day-name'>
                        {dayName.map(d =>
                            <div className='week'>{d}</div>)}
                    </div>
                    {calendar.map(week => {
                        return (
                            <div className='day-container'>
                                {week.map(day => {
                                    return (
                                        <div className='day'
                                            onClick={() => { AddEventFunction(); setValue(day); console.log(eventState) }}>
                                            <div className={dayStyles(day)}>
                                                {day.format("D").toString()}
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
            <Modal />
        </div>
    )
}

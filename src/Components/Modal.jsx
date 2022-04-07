import React, { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import '../CSS/Modal.css'
import { AddEventContext } from '../hooks/useEventContext';

export default function Modal() {
  const [modalVisible, setmodalVisible] = useState(false);
  const [modalHidden, setmodalHidden] = useState(true);
  const {eventValue, eventState, setEvent, setEventState} = useContext(AddEventContext);
  const changeHandler = (event) => eventState && setEvent(event.target.value);
  const eventAddedHandler = ()=> eventState && setEventState(false);
  
  useEffect(() => {
    getAddEventRequest()
  }, [eventState]);

  var modalClass = classNames({
    'modal-hide': modalHidden,
    'modal': modalVisible
  })

  function getAddEventRequest() {
    eventState && setmodalVisible(eventState)
    eventState && setmodalHidden(currentVal => !currentVal)
  }

  function submitEvent() {
    setmodalVisible(currentVal => !currentVal);
    setmodalHidden(currentVal => !currentVal);
  }

  return (
    <div className={modalClass}>
      <div className='modal-context'>
        <div className='modal-header'>Add Event</div>
        <textarea className='modal-event-title modal-textarea' placeholder='Title'></textarea>
        <textarea className='modal-textarea' placeholder='Event details'
          value={eventValue}
          onChange={changeHandler} >
        </textarea>
        <button className='modal-submit' type='button' onClick={() => {
          eventAddedHandler.apply();
          submitEvent();
        }}>
          Submit
        </button>
      </div>
    </div>
  )
}

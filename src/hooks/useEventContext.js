import {createContext} from 'react'

export const AddEventContext = createContext({
    eventValue: "",
    eventState: null,
    setEvent: () => {},
    setEventState: () => {}
});
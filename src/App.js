import { useMemo, useState } from 'react'
import './App.css'
import Calendar from './Components/Calendar'
import { AddEventContext } from './hooks/useEventContext'

export default function App() {
    const [eventState, setEventState] = useState(false)
    const [eventValue, setEventValue] = useState(false)
    const changeEventState = useMemo(() => ({ eventState, setEventState }), [eventState])
    return (
        <div className='App'>
            <AddEventContext.Provider value={changeEventState}>
                <div className="container has-text-centered">
                    <Calendar />
                </div>
            </AddEventContext.Provider>
        </div>
    )
}
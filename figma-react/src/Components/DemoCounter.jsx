import React, { useCallback, useState } from 'react'
import Demo from './Demo'

const DemoCounter = () => {
    const counter = useCallback(() => {
        return "Welcome Callback!"
    }, [])
    const [count, setCount] = useState(0);
    return (
        <div style={{ height: "100%", width: "100%" }}>
            <h1 style={{ margin: "100px 180px" }}>Rahul Pagal h * {count} = Bhout Pagal</h1>
            <button style={{ padding: '20px', margin: "0px 180px" }} onClick={() => { setCount(count + 1); counter() }}>Change</button>
            <Demo counter1={counter} />
        </div>
    )
}

export default DemoCounter
import React, { memo} from 'react'
// import { counterContext } from '../context/counterContext'
// import { useNavigate } from 'react-router-dom';
// import DemoCounter from './DemoCounter';

const Demo = () => {
    // const value = useContext(counterContext);
    // const [count, setCount] = useState(0);
    // const navigate = useNavigate()
    // const ref = useRef(null);
    // const btnref = useRef(null);
    // const arr = new Array(40_00_000).fill(0).map((item, i) => {
    //     return {
    //         index: i,
    //         isNumber: i === 39_00_000,
    //     }
    // })
    // const [number, setNumber] = useState(arr);
    // //useCallback
    console.log("Rerendered!")

    // //useMemo
    // const filterNumber = useMemo(() =>
    //     number.find((item) =>
    //         item.isNumber === true
    //     ), [number]);
    // //useRef
    // const handleBGColor = () => {
    //     ref.current.style.backgroundColor = 'Blue';
    //     ref.current.style.color = 'white';
    //     btnref.current.style.backgroundColor = 'Gray'
    //     btnref.current.style.color = 'white';
    //     btnref.current.style.border = 'none'
    // }
    // //usecontext
    // const handleChange = () => {
    //     if (value.demoText === "demoText") {
    //         value.setDemoText("Hello World!");
    //     }
    //     else {
    //         value.setDemoText("demoText")
    //     }
    // }
    return (
        <div style={{ textAlign: 'center', margin: 100, fontSize: 50 }}>
            <h1>Hello World!</h1>
            {/* <h1 ref={ref}>{value.demoText}</h1>
            <div>
                <h1>{count}</h1>
                <h3>{filterNumber.index}</h3>
            </div>
            <button onClick={() => {
                setCount(count + 1);
                if (count === 10) {
                    setNumber(new Array(40_00_000).fill(0).map((element, i) => {
                        return {
                            index: i,
                            isNumber: i === 10_00_000,
                        }
                    }))
                }
            }}
                style={{ padding: 20 }}
            >+</button>
            <button onClick={() => { handleChange("Hello World!"); handleBGColor() }} style={{ padding: 20 }} ref={btnref}>Change</button>
            <button onClick={() => navigate("/democounter")} style={{ padding: 20 }}>Navigate to Counter</button> */}
        </div>
    )
}

export default memo(Demo)
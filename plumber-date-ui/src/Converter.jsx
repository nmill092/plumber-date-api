import Select from 'react-select'
import { useState } from "react";
import { useEffect } from 'react';

function Converter() { 
    const [zones, setZones] = useState([{}]);
    const [requestedTz, setRequestedTz] = useState(""); 
    const [userTz, setUserTz] = useState("America/Los_Angeles"); 

    useEffect(() => { 
        setUserTz(Intl.DateTimeFormat().resolvedOptions().timeZone); 
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(`http://localhost:80/time-in?tz=${requestedTz}&sourceTz=${userTz}`)
        fetch(`http://localhost:80/time-in?tz=${requestedTz}&sourceTz=${userTz}`)
            .then(res => res.json())
            .then(data => { 
                console.log(data)
            })
    }

    useEffect(() => { 
        fetch("https://plumber-date-api-zl53455gga-uc.a.run.app/time-zones")
            .then(res => res.json())
            .then(data => {
                let options = data.map(tz =>{ return {value: tz, label: tz.replace("_"," ")}})

                setZones(options)
            })
            
            console.log(zones)
    }, [])

    useEffect(() => { 
        console.log(requestedTz)
    }, [requestedTz])

    return(
<div className="grid grid-cols-2 gap-8 bg-white shadow-xl border border-slate-200 rounded-md p-6 ">
    <div></div>
    <form>
    <Select onChange={(e) => { setRequestedTz(e.value)}} options={zones} />
    <button type="submit" onClick={handleSubmit}>Send</button>
    </form>   
</div>
    )
}

export default Converter; 
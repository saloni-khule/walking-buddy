import { useEffect, useState } from "react"
import Gmap from "./Gmap"

//components
import WalkDetails from "../components/WalkDetails"

const Home = () => {
    const [walks, setWalks] = useState(null)
    useEffect(() => {
        const fetchWalks = async () => {
            const response = await fetch('/api/walkDetails')
            const json = await response.json()
            if (response.ok) {
                setWalks(json)

            }

        }

        fetchWalks()
    }, [])




    return (
        <div className="home">

            <h2>Homess</h2>
            <div className="walks">
                {walks && walks.map((walk) => (
                    // < p key={walk._id} > {walk.title}</p>
                    <WalkDetails key={walk._id} walk={walk} />


                ))}
            </div>
            <div><Gmap /></div>
        </div >
    )
}

export default Home
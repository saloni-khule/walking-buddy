
const WalkDetails = ({ walk }) => {
    return (
        <div className="walk-details">
            <h4>{walk.title}</h4>
            <p><strong>From: </strong>{walk.location}</p>
            <p><strong>To: </strong>{walk.destination}</p>
            <p><strong>Time: </strong>{walk.createdAt}</p>


        </div>
    )
}


export default WalkDetails
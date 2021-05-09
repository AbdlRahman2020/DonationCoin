
const Transaction = ({transaction}) => {

    return (
        transaction.map(donation => <div className="singleProject" key={donation.sender}>
        <h3>Sender:  {donation.sender}</h3>
        <h3>Receiver:  {donation.receiver}</h3>
        <p>Amount:  {donation.amount} ETH</p>
    </div>)
    )
}

export default Transaction
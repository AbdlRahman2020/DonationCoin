const Transaction = ({ transaction }) => {
    return (
        <div className="singleProject" >
            <h3>Sender:  {transaction.sender}</h3>
            <h3>Receiver:  {transaction.receiver}</h3>
            <p>Amount:  {transaction.amount} ETH</p>
        </div>
    )
}

export default Transaction
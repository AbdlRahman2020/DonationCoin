import { useState } from 'react';
import Transaction from './Transaction';


const SearchBar = ({ keyword }) => {

    const [transactions, setTransactions] = useState([ ]);

    function onKeyUp(e) {
        if (e.charCode === 13) {
            // TODO:
            // (retrieve the donation from the blockchain and) save the result so that 
            // the transaction component can dynamically update the its rendering
            setTransactions([{
                sender: '12bn4',
                receiver: 'ae34x',
                amount: 2
            }]);
        }
    };

    return (
        <>
        <input
            value={keyword}
            placeholder={"Track a donation"}
            onKeyPress={onKeyUp}
            className="searchbar"
        />
        {transactions.map(transaction => (<Transaction key={transaction.sender} transaction={transaction} />))}
        </>

    );
}

export default SearchBar
const SearchBar = ({ keyword }) => {
    console.log(keyword)

    function onKeyUp(e) {
        if (e.charCode === 13) {
            console.log(e.target.value)
        // TODO:
        // (retrieve the donation from the blockchain and) save the result so that 
        // the transaction component can dynamically update the its rendering
        }
    };

    return (
        <input
            value={keyword}
            placeholder={"Track a donation"}
            onKeyPress={onKeyUp}
            className="searchbar"
        />
    );
}

export default SearchBar
const SearchBar = ({ keyword, setKeyword }) => {
    console.log(keyword)

    function onKeyUp(e) {
        if (e.charCode === 13) {
            console.log(e.target.value)
        //   this.setState({ inputValue: e.target.value });
        }
    };

    return (
        <input
            value={keyword}
            placeholder={"search donation"}
            onKeyPress={onKeyUp}
        />
    );
}

export default SearchBar
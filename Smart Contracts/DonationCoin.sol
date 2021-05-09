pragma solidity >=0.7.0 <0.9.0;


// User the imports and their modifiers/ functions at a later stage.
//import "./ConvertLib.sol";
//import "./ownable.sol";

//using SafeMath for uint256;  
//using SaFfeMath32 for uint32;
//using SafeMath16 for uint16;


contract DonationCoin {
	
	// variable holding the address of the Smart Contract's Owner (Adminstrator)
	address public owner;
	
	// mappings
    mapping (string => address) public charityType;
    mapping (uint => address) public donationsNumber; // Number of donations made by a donor
    mapping (uint => address) public donationToDonator; //
	
	
	
	// events
	event NewDonation(address indexed _from, address indexed _to, uint256 _value); // Fired when a donation is made
    event NewDonor(string _userName, address _address);  // Fired when a new donor is registered

    uint transactionID; // Unique identifier for each  transactionID
    
    constructor() public {
        transactionID = 0;
    }

	struct Donor
	{
		address donor_address;
		string  userName;
		//uint amount;
	}

	Donor[] public donors; // list of donors

	struct Charity
	{
		string category;
		string name;
        address _address;
	}

	Charity[] public charities; // list of charities
	
	struct Donation
	{
	    uint id;
		address _from;
		address _to;
		uint amount;
	    string message; // if the user chooses not to send a message, an empty String should be sent to the function call.
	}

	Donation[] public donations; // list of all donations


	// Register a new Donor
	function _registerDonor(address _address, string memory _userName) public
	{
		donors.push(Donor(_address, _userName ));
		emit NewDonor(_userName, _address);
	}


	function _makeDonation(address payable _receiver, uint _amount, string memory message) public payable returns(uint){
        address _from = msg.sender;
        //require (getBalanceInEth(msg.sender) > amount);
		sendViaTransfer(_receiver);
		transactionID += 1;
		donations.push(Donation(transactionID, _from, _receiver, _amount, message));
		emit NewDonation(msg.sender, _receiver, _amount);
	}
	
	function donationOf(uint256 _id) external view returns (address) {
        return donationToDonator[_id];
  }
	
// 	function getDonations(address _address) public view{
// 	    //return list of donations of an address
// 	}

// 	function getBalanceInEth(address addr) public view returns(uint){
// 		return ConvertLib.convert(getBalance(addr),2);
// 	}

// 	function getBalance(address addr) public view returns(uint) {
// 		return balances[addr];
// 	}

 
 function sendViaTransfer(address payable _to) public payable {
        // This function is no longer recommended for sending Ether.
        _to.transfer(msg.value);
    }

    function sendViaSend(address payable _to) public payable {
        // Send returns a boolean value indicating success or failure.
        // This function is not recommended for sending Ether.
        bool sent = _to.send(msg.value);
        require(sent, "Failed to send Ether");
    }

    function sendViaCall(address payable _to) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
    
}

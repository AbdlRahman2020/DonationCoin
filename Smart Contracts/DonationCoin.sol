pragma solidity >=0.7.0 <0.9.0;


// User the imports and their modifiers/ functions at a later stage.
import "./ConvertLib.sol";
import "./ownable.sol";
import "./"

//using SafeMath for uint256;  
//using SaFfeMath32 for uint32;
//using SafeMath16 for uint16;


contract DonationCoin{
	
	
	// mappings
    mapping (string => address) public charityType; // Maps
    mapping (address => uint) public totalDonations; // Mapping: number of donations to a donor's address
    mapping (uint => address) public donationToDonator; // Mapping: donation to donor's address
	
	
	
	// events
	event NewDonation(address indexed _from, address indexed _to, uint256 _value); // Fired when a donation is made
    event NewDonor(string _id, address _address);  // Fired when a new donor is registered


	struct Donor
	{
		string id;
		//uint balance;
		address donor_address;
	}

	Donor[] public donors; // list of donors

	Struct Charity
	{
		string category;
		string name;
        address _address;
	}

	Charity[] public charities; // list of charities
	
	struct Donation
	{
	    uint256 id;
		address msg.sender;
		uint amount;
		address Charity;
	}

	Donation[] public donations; // list of all donations


	// Register a new Donor
	function _registerDonor(string memory _id, address _address) public
	{
		donors.push(donor(_id, _address));
		emit NewDonor(_id, _address);
	}


	function _makeDonation(address payable _receiver, uint _amount) public payable returns(uint){
        address _from = msg.sender;
        //require (getBalanceInEth(msg.sender) > amount);
		//sendViaTransfer(_receiver);
		donations.push(donation(_from, _amount, _receiver));
		emit NewDonation(msg.sender, _receiver, _amount);
	}
	
    function sendViaTransfer(address payable _to) public payable {
        // This function is no longer recommended for sending Ether.
                    _to.transfer(msg.value);}

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
    // Return 
	function donationOf(uint256 _id) external view returns (address) {
        return donationToDonator[_id];
  }
	
// 	function getDonations(address _address) public view{
// 	    //return list of donations of an address
// 	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}

 

pragma solidity >=0.7.0 <0.9.0;

contract DonationCoin {
	
	// variable holding the address of the Smart Contract's Owner (Adminstrator)
	address public owner;
	
	// mappings
    mapping (address => string) public charityType; // returns string charityType of an address
    mapping (address => uint)public donorDonationCount; // returns uint; number of donations made by a donor
    mapping (uint => address) public donationToDonor; // Maps the donation ID to a donor
	
	
	
	// events
	event NewDonation(address indexed _from, address indexed _to, uint256 _value); // Fired when a donation is made
    event NewDonor(string _userName, address _address);  // Fired when a new donor is registered


	struct Charity
	{
	    address _address;
		string category;
		string goals;
		string name;
	}

	Charity[] public charities; // list of charities
	
	struct Donation
	{
		address _from;
		address _to;
		uint amount;
	    string message; // if the user chooses not to send a message, an empty String should be sent to the function call.
	}

	Donation[] public donations; // list of all donations
	
	struct Donor
	{
		address donor_address;
		string  userName;
		//  Create an array of the donations made by a donor. uint donations[]
		//uint amount;
	}

	Donor[] public donors; // list of donors


	// Register a new Donor
	function _registerDonor(address _address, string memory _userName) public
	{
		donors.push(Donor(_address, _userName ));
		emit NewDonor(_userName, _address);
	}
	

    // This is where all the heavy lifting happens.
    // -> When transfer is done, should increase transaction ID +1, 
    // add the transaction to the donors array of transactions, 
    // add the transaction to the arry of donations and emit new donations.
	function _makeDonation(address payable _receiver, uint _amount, string memory message) external payable returns(uint){
        require(msg.value > 0);
        address _from = msg.sender;
        _receiver.transfer(msg.value);
		//uint transactionID = donations.push(Donation(_from, _receiver, msg.value, message)) ;
		donations.push(Donation(_from, _receiver, msg.value, message)) ;
		//donationToDonor[transactionID] = msg.sender;
		donorDonationCount[msg.sender]++;
		emit NewDonation(msg.sender, _receiver, _amount);
	}
	
	function donate() external payable {
	    
	}
	
	function balanceOf() external view returns(uint) {
	    return address(this).balance;
	}
	
	
	
    // functions to return all the donations made by a donor. params: Donor's address
    function getDonationsByDonor(address _donor) external view returns (uint[] memory) {
        uint[] memory result = new uint[](donorDonationCount[_donor]);
        uint counter = 0;
        for (uint i = 0; i < donations.length; i++) {
          if (donationToDonor[i] == _donor) {
            result[counter] = i;
            counter++;
          }
        }
        return result;
     }
 
 
  	// Function returns the donation of a certain userName
	function donationOf(uint256 _id) external view returns (address) {
        return donations[_id]._from;
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

    function getDonation(uint256 _id) external view returns (
        //uint id,
		address _from,
		address _to,
		uint amount,
	    string memory message
        ) 
        {
        Donation memory _donation = donations[_id];
        _from = _donation._from;
        _to = _donation._to;
        amount = _donation.amount;
        message = _donation.message;
        }

    // This function sends an amount of Ether to a reciever's address, params: reciever's address.
    function sendViaCall(address payable _to) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
    
}
pragma solidity >=0.7.0 <0.9.0;

contract DonationCoin {
    // variable holding the address of the Smart Contract's Owner (Adminstrator)
    address public owner;
    uint256 public totalDonated;

    constructor() {
        owner = msg.sender;
        totalDonated = 0 ether;
    }

    // mappings
    mapping(address => string) public charityType; // returns string charityType of an address
    mapping(address => uint256) public donorDonationCount; // returns uint; number of donations made by a donor
    mapping(address => bool) public isDonorRegistered;
    mapping(address => Donor) public donors;
    mapping(uint256 => address) public donationToDonor; // Maps the donation ID to a donor

    // events
    event NewCharity(address indexed _address, string _cause); // Fired when a new Charity is added.
    event NewDonation(
        address indexed _from,
        address indexed _to,
        uint256 _value,
        string message
    ); // Fired when a donation is made
    event NewDonor(string _userName, address _address); // Fired when a new donor is registered

    struct Charity {
        address _address;
        string cause;
        string name;
        bool isApproved;
        uint256 totalCollected;
    }

    Charity[] public charitiesList; // list of charities
    mapping(address => Charity) charities;

    struct Donation {
        address _from;
        address _to;
        uint256 amount;
        string message; // if the user chooses not to send a message, an empty String should be sent to the function call.
    }

    Donation[] public donations; // list of all donations

    struct Donor {
        address donorAddress;
        string donorName;
    }

    Donor[] public donorsList; // list of donors

    function _registerCharity(
        address _address,
        string memory _cause,
        string memory _name
    ) public {
        require(msg.sender == owner);
        require(charities[_address].isApproved == false);
        Charity memory char = Charity(_address, _cause, _name, true, 0);
        charities[_address] = char;
        charitiesList.push(char);
    }

    function _disapproveCharity(address _address) external {
        require(msg.sender == owner);
        charities[_address].isApproved = false;
    }

    // Register a new Donor
    function _registerDonor(address _address, string memory _donorName) public {
        require(isDonorRegistered[_address] == false);
        donorsList.push(Donor(_address, _donorName));
        isDonorRegistered[_address] = true;
        emit NewDonor(_donorName, _address);
    }

    // This is where all the heavy lifting happens.
    // -> When transfer is done, should increase transaction ID +1,
    // add the transaction to the donors array of transactions,
    // add the transaction to the list of donations and emit new donations.
    function _makeDonation(
        address payable _receiver,
        string memory _donorName,
        string memory _message
    ) external payable returns (uint256) {
        require(msg.value > 0, "Please donate an amount more than 0.");
        require(
            charities[_receiver].isApproved,
            "This Charity is no longer approved!"
        );
        address _from = msg.sender;
        if (isDonorRegistered[_from] == false) {
            _registerDonor(_from, _donorName);
        }

        _receiver.transfer(msg.value); // Transfer the ether to the Charity.

        charities[_receiver].totalCollected += msg.value;
        donations.push(Donation(_from, _receiver, msg.value, _message)); // Adding a new Donation to Donations

        uint256 transactionID = donations.length - 1; // Donation ID.
        donationToDonor[transactionID] = msg.sender;
        donorDonationCount[msg.sender]++;

        emit NewDonation(msg.sender, _receiver, msg.value, _message);
        totalDonated += msg.value;
        return donations.length;
    }

    function balanceOf() external view returns (uint256) {
        return address(this).balance;
    }

    // functions to return all the donation IDs made by a donor. params: Donor's address
    function getDonationsByDonor(address _donor)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](donorDonationCount[_donor]);
        uint256 counter = 0;
        for (uint256 i = 0; i < donations.length; i++) {
            if (donationToDonor[i] == _donor) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getDonation(uint256 _id)
        external
        view
        returns (
            uint256 id,
            address _from,
            address _to,
            uint256 amount,
            string memory message
        )
    {
        Donation memory _donation = donations[_id];
        id = _id;
        _from = _donation._from;
        _to = _donation._to;
        amount = _donation.amount;
        message = _donation.message;
    }

    function getCharityByCause(string memory _cause)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](charitiesList.length);
        uint256 counter = 0;
        for (uint256 i = 0; i < charitiesList.length; i++) {
            if (
                keccak256(bytes(charitiesList[i].cause)) ==
                keccak256(bytes(_cause))
            ) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getDonationsLength() public view returns (uint256) {
        return donations.length;
    }

    //   	function supportDonationCoin(
    // 	    string memory _donorName,
    // 	    string memory _message)
    // 	    external payable
    // 	    //returns(uint)
    // 	    {
    // 	    require(msg.value > 0, "Please donate an amount more than 0.");
    //         address _from = msg.sender;
    //         if (isDonorRegistered[_from] == false){
    //           _registerDonor(_from, _donorName);
    //         }

    //         address payable _receiver =  payable(address(this));

    //         _receiver.transfer(msg.value); // Transfer the ether to this Contract

    // 		charities[_receiver].totalCollected += msg.value;
    // 		donations.push(Donation(_from, _receiver, msg.value, _message)); // Adding a new Donation to Donations

    // 		uint transactionID = donations.length -1; // Donation ID.
    // 		donationToDonor[transactionID] = msg.sender;
    // 		donorDonationCount[msg.sender]++;

    // 		totalDonated += msg.value;
    // 		emit NewDonation(msg.sender, _receiver, msg.value, _message);
    // 	//	return transactionID;
    // 	}
}

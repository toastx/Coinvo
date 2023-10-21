// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract RedPacketContract 
// is VRFConsumerBase 
{
    address public immutable owner;
    uint256 public totalBalance;
    uint256 public remainingBalance;
    uint256 public numPackets;
    uint256 public remainingPackets;

    mapping(address => bool) public claimed;

    event RedPacketClaimed(address indexed user, uint256 amount);
    event RandomNumberGenerated(uint random_number);
    
    // address constant linkAddress = 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D;
    // address constant vrfWrapper = 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D;
   
    // bytes32 internal keyHash = 0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;
    // uint internal fee ;
    // uint public randomResult;
    uint randNonce = 0; 
    struct RedPacket {
        uint256 amount;
        bool claimed;
    }

    RedPacket[] public redPackets;

    mapping(address=>uint256) public redpacketcreation;
    
   
    function randMod() public returns(uint)
    {
        randNonce++;
        return uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,randNonce)));
    } 

    constructor()
        //  VRFConsumerBase(vrfWrapper, linkAddress)
        {
            owner = msg.sender;
            // fee = 0.25 10*18;
            
        }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // function getRandomNumber() public returns (bytes32 requestId) {
    //     require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK in contract");
    //     return requestRandomness(keyHash, fee);
    // }

    // function fulfillRandomness(bytes32 requestId, uint randomness) internal override {
    //     randomResult = randomness;
    //     emit RandomNumberGenerated(randomResult);
    //     sendRedPacket();
    // }

    function createRandomisedRedPackets(uint256 total, uint256 num) public payable onlyOwner {
        require(total > 0 && num > 0, "Total and number of packets must be greater than 0");
        
        totalBalance = total;
        remainingBalance = total;
        numPackets = num;
        remainingPackets = num;

    }
    
   

   function claimRandomisedRedPacket() public payable{
        require(remainingBalance >0, "No red packets available");
        require(remainingPackets > 0,"No red packets available");
        
        if (remainingPackets!=1){
            uint256 random_number = randMod();
            emit RandomNumberGenerated(random_number);
            uint256 amountToClaim = (random_number%(remainingBalance));
            remainingBalance -= amountToClaim;
            remainingPackets -=1;
           (bool callsuccess,) = payable(msg.sender).call{value: amountToClaim*1e18}("");
            require(callsuccess,"failed packet creation");
            emit RedPacketClaimed(msg.sender, amountToClaim*1e18);
            return;
            }
        else{
            remainingPackets -=1;
            (bool callsuccess,) = payable(msg.sender).call{value: remainingBalance*1e18}("");
            require(callsuccess,"failed packet creation");
            emit RedPacketClaimed(msg.sender, remainingBalance*1e18);
            remainingBalance = 0;

        }
}
    
        
    function withdrawRemainingBalance() public onlyOwner payable  {
        require(remainingBalance > 0, "No remaining balance to withdraw");

        payable(owner).transfer(remainingBalance);
        remainingBalance = 0;
        totalBalance = 0;
        remainingPackets=0;
        numPackets=0;
    }
    receive() external payable { }
   
}
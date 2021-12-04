pragma solidity ^0.5.0;

import "./BulveToken.sol";
import "./EurToken.sol";
import "./MorkaToken.sol";
import "./RidikasToken.sol";

contract Farm {
    string public name = "Farm";
    address public owner;

    BulveToken public bulveToken;
    EurToken public eurToken;
    MorkaToken public morkaToken;
    RidikasToken public ridikasToken;

    address[] public allStakers;

    struct User {
        uint eurBalance;
        bool hasStaked;
        bool isStaking;
    }

    struct Currency {
        address[] stakers;
        mapping (address => User) user;
    }

    mapping(string => Currency) currencies;

    constructor(BulveToken _bulveToken, EurToken _eurToken, MorkaToken _morkaToken, RidikasToken _ridikasToken) public {
        bulveToken = _bulveToken;
        eurToken = _eurToken;
        morkaToken = _morkaToken;
        ridikasToken = _ridikasToken;
        owner = msg.sender;
    }

    function getUserBalance(string memory _simbol) public view returns (uint) {
        return currencies[_simbol].user[msg.sender].eurBalance;
    }

    function isUserStaking(string memory _simbol) public view returns (bool) {
        return currencies[_simbol].user[msg.sender].isStaking;
    }

    function stakeTokens(uint _amount, string memory _simbol) public {
        require(_amount > 0, "Farm: amount cannot be 0");

        eurToken.transferFrom(msg.sender, address(this), _amount);

        Currency storage currency = currencies[_simbol];
        User storage user = currency.user[msg.sender];
        user.eurBalance += _amount;

        if (!user.hasStaked) {
            user.hasStaked = true;
            currency.stakers.push(msg.sender);
            allStakers.push(msg.sender);
        }

        user.isStaking = true;
    }

    function unstakeTokens(string memory _simbol) public {
        Currency storage currency = currencies[_simbol];
        User storage user = currency.user[msg.sender];
        uint balance = user.eurBalance;

        require(balance > 0, "Farm: staking balance cannot be 0");
        eurToken.transfer(msg.sender, balance);

        user.eurBalance = 0;
        user.isStaking = false;
    }

    function issueTokens(string memory _simbol) public {
        // require(msg.sender == owner, "Farm: caller must be the owner");

        Currency storage currency = currencies[_simbol];
        address[] storage stakers = currency.stakers;

        for (uint i = 0; i < stakers.length; i++) {
            User storage user = currency.user[stakers[i]];
            if (user.eurBalance > 0) {
                if (stringsEqual(_simbol, "BULVE")) {
                    bulveToken.transfer(stakers[i], user.eurBalance);
                } else if (stringsEqual(_simbol, "MORKA")) {
                    morkaToken.transfer(stakers[i], user.eurBalance);
                } else if (stringsEqual(_simbol, "RIDIKAS")) {
                    ridikasToken.transfer(stakers[i], user.eurBalance);
                } 
            }
        }
    }

    function stringsEqual(string memory a, string memory b) private pure returns(bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }
}
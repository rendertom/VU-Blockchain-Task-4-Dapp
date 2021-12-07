pragma solidity ^0.5.0;

contract EurToken {
  string public name = "Stable Euro Token";
  string public symbol = "EUR";
  uint256 public totalSupply = 1000000;
  address public owner;

  event Transfer(
    address _from,
    address _to,
    uint256 _value
  );

  mapping(address => uint256) public balanceOf;

  constructor() public {
    owner = msg.sender;
    balanceOf[owner] = totalSupply;
  }

  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value, "transfer (EUR): Value exceeds the owner balance");
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[_from] >= _value, "transferFrom (EUR): Value exceeds the owner balance");
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}
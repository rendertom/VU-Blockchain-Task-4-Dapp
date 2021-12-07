pragma solidity ^0.5.0;

contract CowToken {
  string public name = "Cow Token";
  string public symbol = "COW";
  uint256 public totalSupply = 1000000;

  event Transfer(
    address _from,
    address _to,
    uint256 _value
  );

  mapping(address => uint256) public balanceOf;

  constructor() public {
    balanceOf[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value, "transfer (COW): Value exceeds the owner balance");
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[_from] >= _value, "transferFrom (COW): Value exceeds the owner balance");
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}
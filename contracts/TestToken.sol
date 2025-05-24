// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IKYCVerification.sol";

contract TestToken is Ownable, ReentrancyGuard {
    string public name = "TestToken";
    string public symbol = "STT";
    uint256 public totalSupply;
    
    mapping(address => uint256) public balances;
    
    IKYCVerification public kycContract;

    event Mint(address indexed to, uint256 amount);
    event Burn(address indexed from, uint256 amount);

    constructor(address _kycContract) Ownable(msg.sender) {
        kycContract = IKYCVerification(_kycContract);
        totalSupply = 1000;
        balances[msg.sender] = 1000;
    }

    function mint(address to, uint256 amount) external onlyOwner nonReentrant {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Amount must be greater than 0");
        require(kycContract.checkKYC(to), "Recipient not KYC verified");

        balances[to] += amount;
        totalSupply += amount;
        emit Mint(to, amount);
    }

    function burn(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Not enough balance");

        balances[msg.sender] -= amount;
        totalSupply -= amount;
        emit Burn(msg.sender, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
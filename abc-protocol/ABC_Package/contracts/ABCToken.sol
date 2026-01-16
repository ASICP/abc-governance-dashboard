// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title ABCToken
 * @dev Governance and Utility token for the ABC Commons Protocol.
 * Fixed supply of 100,000,000 tokens minted at deployment.
 */
contract ABCToken is ERC20, ERC20Votes, ERC20Permit, Ownable, Pausable {
    constructor(address initialOwner) 
        ERC20("Aligned Beacon Commons", "ABC") 
        ERC20Permit("Aligned Beacon Commons")
        Ownable(initialOwner)
    {
        // Mint fixed supply of 100,000,000 tokens
        _mint(msg.sender, 100_000_000 * 10**decimals());
    }

    /**
     * @dev Pauses all token transfers.
     * Can only be called by the owner.
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     * Can only be called by the owner.
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        require(!paused(), "ABCToken: token transfer while paused");
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}

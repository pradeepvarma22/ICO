// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ICryptoDevs.sol";

contract CryptoDevToken is ERC20, Ownable {
    ICryptoDevs cryptoDevsNFT;
    // In erc20 1 token = 10**18
    // Erc20 tokens will be represented in bignumbers
    //
    // if we write 1 means it will be taken as 10 ** -18
    uint256 public constant oneToken = 10**18;
    uint256 public constant tokensPerNFT = 10 * oneToken; // we need to give 10 tokens for 1 nft

    // if tokensPerNFT = 1  it means that 1 * 10**-18 tokens
    // tokenPerNft = 10 ** 18 refers to 1 token in erc20

    uint256 public constant tokenPrice = 0.001 ether;

    mapping(uint256 => bool) public tokenIdsClaimed;

    uint256 public constant maxTotalSupply = 10000 * oneToken;

    constructor(address _cryptoDevContract) ERC20("Crypto Devs token", "CD") {
        cryptoDevsNFT = ICryptoDevs(_cryptoDevContract);
    }

    // used by the nft holders to claim the erc20 tokens
    // if i have 2 nfts i can claim 20 tokens
    function claim() public {
        address sender = msg.sender;
        uint256 balances = cryptoDevsNFT.balanceOf(sender);
        uint256 amount = 0; // no of tokenIds That not been claimed
        require(balances > 0, "You Dont have any crypto dev nfts");

        for (uint256 i = 0; i < balances; i++) {
            uint256 tokenId = cryptoDevsNFT.tokenOfOwnerByIndex(sender, i);

            if (!tokenIdsClaimed[tokenId]) {
                tokenIdsClaimed[tokenId] = true;
                amount += 1;
            }
        }

        require(amount > 0, "You Have Already Claimed all your tokens ");

        _mint(msg.sender, amount * tokensPerNFT);
    }

    // public mint those who dont have nfts
    function mint(uint256 amount) public payable {
        uint256 _requiredAmount = tokenPrice * amount; // amount is the no of tokens user want to mint
        require(msg.value >= _requiredAmount, "Ether is sent is incorrect");
        uint256 amountWithDecimals = amount * oneToken;
        require(
            totalSupply() + amountWithDecimals <= maxTotalSupply,
            "Exceeds the max total supply available"
        );

        _mint(msg.sender, amountWithDecimals);
    }

    receive() external payable {}

    fallback() external payable {}
}

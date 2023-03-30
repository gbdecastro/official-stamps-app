// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract OfficialStampContract is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    address sender = msg.sender;

    constructor() ERC721("Official Stamp Contract", "OSC") {}

    mapping(address => OfficialStampToken[]) OSC;

    struct OfficialStampToken {
        uint256 id;
        string name;
        uint256 price;
        address owner;
    }

    function createOfficialStampToken() private returns (uint256) {
        uint256 id = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(sender, id);
        return id;
    }

    function buyToken(
        string memory _name,
        uint256 _price,
        address _to
    ) external payable returns (uint256) {
        uint256 token = createOfficialStampToken();

        require(sender == _ownerOf(token), "Just owner can transfer token");

        _transfer(sender, _to, token);

        OSC[_to].push(OfficialStampToken(token, _name, _price, _to));

        return token;
    }

    function getAllTokensFromWallet(
        address _owner
    ) external view returns (OfficialStampToken[] memory _OSC) {
        return OSC[_owner];
    }
}

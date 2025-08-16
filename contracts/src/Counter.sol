// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PokemonVote {
    mapping(uint256 => uint256) public votes;              // pokemonId -> count
    mapping(address => uint256) public lastVoteDay;        // address -> day index
    uint256 public endTime;                                // deadline (epoch seconds)

    event Voted(address indexed voter, uint256 indexed pokemonId, uint256 newCount);
    event DeadlineUpdated(uint256 newEndTime);

    constructor(uint256 _endTime) {
        require(_endTime > block.timestamp, "end in future");
        endTime = _endTime;
    }

    function currentDay() public view returns (uint256) {
        return block.timestamp / 1 days;
    }

    function vote(uint256 pokemonId) external {
        require(block.timestamp < endTime, "voting ended");

        uint256 day = currentDay();
        require(lastVoteDay[msg.sender] < day, "already voted today");

        lastVoteDay[msg.sender] = day;
        votes[pokemonId] += 1;

        emit Voted(msg.sender, pokemonId, votes[pokemonId]);
    }

    // helpers de lecture
    function hasVotedToday(address user) external view returns (bool) {
        return lastVoteDay[user] == currentDay();
    }
}

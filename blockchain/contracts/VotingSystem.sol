// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract VotingSystem {

    // Structure to represent a vote
    struct Vote {
        uint256 voteID;
        uint256 candidateID;
        string candidateName;
        uint256 voterID;
        string voterName;
        address voterAddress;
    }

    // Mapping from a unique identifier (e.g., vote ID) to its corresponding Vote
    mapping(uint256 => Vote) public votes;

    // Array to store all vote IDs
    uint256[] public allVoteIDs;

    // Event triggered when a new vote is cast
    event VoteCast(uint256 indexed voteID, uint256 indexed candidateID, address indexed voterAddress);

    // Variable to track the total number of votes
    uint256 public totalVotes;

    // Modifier to check if the sender is the voter
    modifier onlyVoter(uint256 voteID) {
        require(msg.sender == votes[voteID].voterAddress, "You are not the voter for this vote");
        _;
    }

    // Function to cast a vote
    function castVote(uint256 voteID, uint256 candidateID, string memory candidateName, uint256 voterID, string memory voterName) public {
        // Create a new Vote
        Vote memory newVote = Vote({
            voteID: voteID,
            candidateID: candidateID,
            candidateName: candidateName,
            voterID: voterID,
            voterName: voterName,
            voterAddress: msg.sender
        });

        // Store the vote in the mapping
        votes[voteID] = newVote;

        // Add the vote ID to the array
        allVoteIDs.push(voteID);

        // Increment the totalVotes
        totalVotes++;

        // Emit an event to log the vote
        emit VoteCast(voteID, candidateID, msg.sender);
    }



    // Function to get all vote IDs
    function getAllVoteIDs() public view returns (uint256[] memory) {
        return allVoteIDs;
    }

  function getAllVotes() public view returns (Vote[] memory) {
        uint256 totalVotesCount = allVoteIDs.length;
        Vote[] memory allVotes = new Vote[](totalVotesCount);

        for (uint256 i = 0; i < totalVotesCount; i++) {
            uint256 voteID = allVoteIDs[i];
            Vote memory currentVote = votes[voteID];
            
            // Assign values to the custom object
            allVotes[i] = Vote({
                voteID: currentVote.voteID,
                candidateID: currentVote.candidateID,
                candidateName: currentVote.candidateName,
                voterID: currentVote.voterID,
                voterName: currentVote.voterName,
                voterAddress: currentVote.voterAddress
            });
        }

        return allVotes;
    }
}

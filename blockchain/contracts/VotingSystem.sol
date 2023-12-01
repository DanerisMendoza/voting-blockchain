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
        uint256 positionID;
        string positionName;
        uint256 date; // New variable for the date
    }

    // Mapping from a unique identifier (e.g., vote ID) to its corresponding Vote
    mapping(uint256 => Vote) public votes;

    // Array to store all vote IDs
    uint256[] public allVoteIDs;

    // Event triggered when a new vote is cast
    event VoteCast(
        uint256 indexed voteID,
        uint256 indexed positionID,
        address indexed voterAddress,
        uint256 date
    );

    // Variable to track the total number of votes
    uint256 public totalVotes;

    // Counter for auto-incrementing vote IDs
    uint256 private voteIDCounter;

    // Modifier to check if the sender is the voter
    modifier onlyVoter(uint256 voteID) {
        require(
            msg.sender == votes[voteID].voterAddress,
            "You are not the voter for this vote"
        );
        _;
    }

    // Function to cast a vote
    function castVote(
        uint256 candidateID,
        string memory candidateName,
        uint256 voterID,
        string memory voterName,
        uint256 positionID,
        string memory positionName,
        uint256 date // New parameter for the date
    ) public {
        // Increment the voteIDCounter
        voteIDCounter++;

        // Use the incremented counter as the voteID
        uint256 voteID = voteIDCounter;

        // Create a new Vote with the provided date
        Vote memory newVote = Vote({
            voteID: voteID,
            candidateID: candidateID,
            candidateName: candidateName,
            voterID: voterID,
            voterName: voterName,
            voterAddress: msg.sender,
            positionID: positionID,
            positionName: positionName,
            date: date
        });

        // Store the vote in the mapping
        votes[voteID] = newVote;

        // Add the vote ID to the array
        allVoteIDs.push(voteID);

        // Increment the totalVotes
        totalVotes++;

        // Emit an event to log the vote
        emit VoteCast(voteID, positionID, msg.sender, date);
    }

    // Function to get all vote IDs
    function getAllVoteIDs() public view returns (uint256[] memory) {
        return allVoteIDs;
    }

    function getAllVotes() public view returns (Vote[] memory) {
        // Create an array to store all votes
        Vote[] memory allVotes = new Vote[](totalVotes);

        // Iterate through all vote IDs
        for (uint256 i = 0; i < totalVotes; i++) {
            uint256 voteID = allVoteIDs[i];
            // Fetch the vote details from the mapping
            Vote storage vote = votes[voteID];

            // Convert BigInt values to regular numbers
            uint256 candidateID = uint256(vote.candidateID);
            uint256 voterID = uint256(vote.voterID);
            uint256 positionID = uint256(vote.positionID);

            // Create a new Vote object without 'n'
            Vote memory cleanedVote = Vote({
                voteID: vote.voteID,
                candidateID: candidateID,
                candidateName: vote.candidateName,
                voterID: voterID,
                voterName: vote.voterName,
                voterAddress: vote.voterAddress,
                positionID: positionID,
                positionName: vote.positionName,
                date: vote.date
                // Add other fields as needed
            });

            // Add the vote to the array
            allVotes[i] = cleanedVote;
        }

        // Return the array of all votes
        return allVotes;
    }
}

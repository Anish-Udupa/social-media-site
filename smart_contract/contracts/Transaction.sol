// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Transaction {
    
    struct Post {
        string username;
        string desc;
        string pic;    
    }

    Post[] post_arr;

    function addToBlockchain(string memory username, string memory desc, string memory pic) public {
        post_arr.push(Post(username, desc, pic));
    }

    function getAllTransaction() public view returns(Post[] memory) {
        return post_arr;
    }
    
}
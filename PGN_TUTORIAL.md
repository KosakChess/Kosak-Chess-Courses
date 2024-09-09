# Chess Puzzle PGN Guide

This guide will help you create a proper PGN file that can be used for the chess puzzle website. The website will parse the PGN file and extract information to guide the user through the puzzle, providing feedback based on the moves they make.

## PGN Structure

The PGN file should contain comments for each move, for both sides. Each comment must be a JSON object that contains the following four parts:

1. **Array of Alternative Moves**: An array of alternative moves that are considered acceptable but are not the primary move. If the user plays one of these moves, they will receive feedback indicating that the move is good, but they should find the correct one.

2. **Move Mark**: A string that represents the quality of the move, such as `!` for a great move, `?` for an inaccurate move, etc.

3. **Array of Arrows**: An array of arrow annotations to be displayed on the chessboard. Each arrow is defined by a tuple containing two squares and an optional color. The format is:

   ```
   [ ['a3', 'a5', 'red'], ['g1', 'f3'] ]
   ```

   where the first square is the starting square and the second is the ending square. The optional third element is the color of the arrow (e.g., "red").

4. **Comment**: A string containing a comment to be displayed next to the chessboard. This comment provides insight into the position and explains the reasoning behind the move.

## Example PGN

Below is an example of a PGN file formatted according to these guidelines, including comments for both sides:

```pgn
[Event "Chess Puzzle"]
[Site "YourWebsite.com"]
[Date "2024.09.09"]
[Round "-"]
[White "Puzzle"]
[Black "Solution"]
[Result "*"]

1. e4 {
    "alternatives": ["d4"],
    "mark": "!",
    "arrows": [["e2", "e4", "green"]],
    "comment": "King's Pawn Opening is a solid choice to start the game."
} e5 {
    "alternatives": [],
    "mark": "!",
    "arrows": [["e7", "e5", "green"]],
    "comment": "Black mirrors White's move, maintaining symmetry and control over the center."
}
2. Nf3 {
    "alternatives": ["Nc3"],
    "mark": "!",
    "arrows": [["g1", "f3", "blue"]],
    "comment": "Developing the knight early attacks the e5 pawn and prepares for castling."
} Nc6 {
    "alternatives": ["d6"],
    "mark": "!",
    "arrows": [["b8", "c6", "red"]],
    "comment": "Black develops a knight and defends the e5 pawn, following basic opening principles."
}
3. Bc4 {
    "alternatives": ["Bb5"],
    "mark": "!",
    "arrows": [["f1", "c4", "green"]],
    "comment": "The Giuoco Piano aims for quick control of the center and prepares for kingside castling."
} Bc5 {
    "alternatives": ["Nf6"],
    "mark": "!",
    "arrows": [["f8", "c5", "yellow"]],
    "comment": "Black responds symmetrically, aiming to control the center and prepare for kingside castling."
}
*
```

## Detailed Explanation of JSON Structure

Each move's comment should be a JSON object with the following keys:

- **`alternatives`**: An array of strings representing alternative moves.
- **`mark`**: A string that signifies the quality of the move, such as `"!"`, `"?"`, `"!!"`, etc.
- **`arrows`**: An array of arrays. Each inner array represents an arrow on the chessboard with two required squares and an optional color.
- **`comment`**: A string containing the comment that will be displayed on the website.

## Conclusion

By following this guide, you'll be able to create PGN files that the chess puzzle website can interpret correctly, providing a rich and interactive experience for users. If you have any questions or run into issues, please reach out to the development team.

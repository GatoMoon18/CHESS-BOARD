Apartado 1 || --- Getting started ---
This example shows how to create a chess position, how to play some moves, and how to retrieve some information about the resulting position. More details available in Position.

const { Position } = require('kokopu');

// Create a new position, play some moves...
const position = new Position();
position.play('e4');
position.play('e5');
position.play('Nf3');

// Display an ASCII-art representation of the position.
console.log(position.ascii({ coordinateVisible: true }));

//   +---+---+---+---+---+---+---+---+
// 8 | r | n | b | q | k | b | n | r |
//   +---+---+---+---+---+---+---+---+
// 7 | p | p | p | p |   | p | p | p |
//   +---+---+---+---+---+---+---+---+
// 6 |   |   |   |   |   |   |   |   |
//   +---+---+---+---+---+---+---+---+
// 5 |   |   |   |   | p |   |   |   |
//   +---+---+---+---+---+---+---+---+
// 4 |   |   |   |   | P |   |   |   |
//   +---+---+---+---+---+---+---+---+
// 3 |   |   |   |   |   | N |   |   |
//   +---+---+---+---+---+---+---+---+
// 2 | P | P | P | P |   | P | P | P |
//   +---+---+---+---+---+---+---+---+
// 1 | R | N | B | Q | K | B |   | R |
//   +---+---+---+---+---+---+---+---+
//     a   b   c   d   e   f   g   h
// b KQkq -

// Look at the content of individual squares.
position.square('f3'); // returns 'wn', standing for "white knight"
position.square('e7'); // returns '-', standing for an empty square

// Check the status of the position.
position.turn(); // 'b', i.e. black plays the next move
position.isCheck(); // false
position.isCheckmate(); // false
position.isStalemate(); // false

// List the available moves.
const moves = position.moves();
moves.map(move => position.notation(move)); // or position.figurineNotation(move)

// [ 'a6', 'a5', 'b6', 'b5', 'c6', 'c5', 'd6','d5', 'f6', 'f5', 'g6',
// 'g5', 'h6', 'h5', 'Na6', 'Nc6', 'Qe7', 'Qf6', 'Qg5', 'Qh4', 'Ke7',
// 'Be7', 'Bd6', 'Bc5', 'Bb4', 'Ba3', 'Nf6', 'Nh6', 'Ne7' ]

// Get the FEN representation of the position.
position.fen(); // 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 0 1'

Apartado 2 || --- Set-up a position ---
Several ways are available to set-up a chess position:

set-up from scratch,
copy another position,
load it from a FEN string.
Set-up from scratch
const { Position } = require('kokopu');

const position = new Position('empty'); // initialize the position with an empty board

position.square('a8', 'bk'); // put a black king on square a8
position.square('b6', 'wk'); // put a white king on square b6
position.square('a5', 'wr'); // put a white rook on square a5

console.log(position.ascii());
// +---+---+---+---+---+---+---+---+
// | k |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   | K |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// | R |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// w - -

// Check whether the position is valid or not, according to the chess rules.
position.isLegal(); // false, because black king is in check, but White is to play

// Set-up Black to play the first move
position.turn('b');
position.isLegal(); // true, since the first player is now properly configured

console.log(position.ascii());
// +---+---+---+---+---+---+---+---+
// | k |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   | K |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// | R |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// b - -
Copy
It is also possible to initialize the board from the usual starting position:

const { Position } = require('kokopu');

const position = new Position('start'); // initialize the position with the usual starting position

position.square('e5', 'wp'); // put a white pawn on square e5
position.square('e2', '-'); // clear square e2
position.square('d5', 'bp'); // put a black pawn on square d5
position.square('f5', 'bp'); // put a black pawn on square d5
position.square('d7', '-'); // clear square d7
position.square('f7', '-'); // clear square f7

position.enPassant('f'); // allow "en-passant" on file f

console.log(position.ascii());
// +---+---+---+---+---+---+---+---+
// | r | n | b | q | k | b | n | r |
// +---+---+---+---+---+---+---+---+
// | p | p | p |   | p |   | p | p |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   | p | P | p |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// | P | P | P | P |   | P | P | P |
// +---+---+---+---+---+---+---+---+
// | R | N | B | Q | K | B | N | R |
// +---+---+---+---+---+---+---+---+
// w KQkq f6

position.isMoveLegal('e5', 'd6'); // false
position.isMoveLegal('e5', 'f6'); // returns an object that evaluates to true when converted into a boolean
Copy
Copy another position
const { Position } = require('kokopu');

const p1 = new Position('start');
p1.play('e4');

// Create a copy p2 of position p1. After the copy, each position can be modified without affecting the other.
const p2 = new Position(p1);

p1.play('e5');
p2.play('c5');

console.log(p1.ascii());
// +---+---+---+---+---+---+---+---+
// | r | n | b | q | k | b | n | r |
// +---+---+---+---+---+---+---+---+
// | p | p | p | p |   | p | p | p |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   | p |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   | P |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// | P | P | P | P |   | P | P | P |
// +---+---+---+---+---+---+---+---+
// | R | N | B | Q | K | B | N | R |
// +---+---+---+---+---+---+---+---+
// w KQkq -

console.log(p2.ascii());
// +---+---+---+---+---+---+---+---+
// | r | n | b | q | k | b | n | r |
// +---+---+---+---+---+---+---+---+
// | p | p |   | p | p | p | p | p |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   | p |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   | P |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// | P | P | P | P |   | P | P | P |
// +---+---+---+---+---+---+---+---+
// | R | N | B | Q | K | B | N | R |
// +---+---+---+---+---+---+---+---+
// w KQkq -
Copy
Load a FEN string
The Forsyth-Edwards Notation is a standard notation to describe a chess position, that it is supported by many chess softwares. Kokopu is capable of loading such FEN strings.

const { Position } = require('kokopu');

// Load the FEN that characterizes the beginning of the Italian game variation.
const position = new Position('r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3');

console.log(position.ascii());
// +---+---+---+---+---+---+---+---+
// | r |   | b | q | k | b | n | r |
// +---+---+---+---+---+---+---+---+
// | p | p | p | p |   | p | p | p |
// +---+---+---+---+---+---+---+---+
// |   |   | n |   |   |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   | p |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   | B |   | P |   |   |   |
// +---+---+---+---+---+---+---+---+
// |   |   |   |   |   | N |   |   |
// +---+---+---+---+---+---+---+---+
// | P | P | P | P |   | P | P | P |
// +---+---+---+---+---+---+---+---+
// | R | N | B | Q | K |   |   | R |
// +---+---+---+---+---+---+---+---+
// b KQkq -

// Play some moves, and return the resulting FEN string.
position.play('d6');
position.play('h3');
position.fen(); // 'r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5N1P/PPPP1PP1/RNBQK2R b KQkq - 0 1'

Apartado 3 || --- Load a PGN file ---
The Portable Game Notation is a standard plain-text file format used to describe chess games. The format is capable to describe not only the game moves, but also all the meta-data associated to the games (name of the players, date at which the game has been played, etc.), and move annotations (text comment, alternative variations, etc.).

An example of such PGN file is provided here: example.pgn.

const { pgnRead } = require('kokopu');
const fs = require('fs');

// Read the content of the PGN file provided above.
const pgnText = fs.readFileSync('example.pgn', 'utf8');

// Parse this content.
const database = pgnRead(pgnText);

// Get the number of games in the PGN file.
database.gameCount(); // 2

// Retrieve the first game, and get information about it.
const firstGame = database.game(0);
firstGame.playerName('w'); // 'Bill Gates'
firstGame.playerName('b'); // 'Magnus Carlsen'
firstGame.date(); // 2014-01-22T23:00:00.000Z
firstGame.result(); // '0-1'

// Display the moves that compose the main variation.
const mainVariation = firstGame.mainVariation();
mainVariation.nodes().map(node => node.notation());

// [ 'e4', 'Nc6', 'Nf3', 'd5', 'Bd3', 'Nf6', 'exd5', 'Qxd5', 'Nc3', 'Qh5',
// 'O-O', 'Bg4', 'h3', 'Ne5', 'hxg4', 'Nfxg4', 'Nxe5', 'Qh2#' ]
Copy
Another example, that handles an annotated game, with text comments and sub-variations (more details on this topic in Node and Variation):

const database = /* initialized as above */;
const secondGame = database.game(1);

for (let node = secondGame.mainVariation().first(); node; node = node.next()) { // iteration over the nodes of the main variation

    // Display the move and the associated text comment, if any.
    console.log(node.notation() + (node.comment() ? ' ' + node.comment() : ''));

    // Display the alternative variations, if any.
    node.variations().forEach((variation, index) => {
        let text = '  variation ' + (index + 1) + ' ->';
        if (variation.comment()) {
            text += ' ' + variation.comment();
        }
        for (let nodeInVariation = variation.first(); nodeInVariation; nodeInVariation = nodeInVariation.next()) {
            text += ' ' + nodeInVariation.notation();
            if (nodeInVariation.comment()) {
                text += ' ' + nodeInVariation.comment();
            }
        }
        console.log(text);
    });
}

// e4
// e5
// Nf3
// Nc6
// Nc3
// Nf6
// Bb5
// Bc5
// O-O
// O-O
// Nxe5
// Re8
// Nxc6
// dxc6
// Bc4
// b5
// Be2
// Nxe4
// Nxe4
// Rxe4
// Bf3
// Re6
// c3
// Qd3
// b4
// Bb6
// a4
// bxa4
// Qxa4
// Bd7
// Ra2
// Rae8
// Qa6 Morphy took twelve minutes over his next move, probably to assure himself that the combination was sound and that he had a forced win in every variation.
// Qxf3
// gxf3
// Rg6+
// Kh1
// Bh3
// Rd1
//   variation 1 -> Not Rg1 Rxg1+ Kxg1 Re1+
// Bg2+
// Kg1
// Bxf3+
// Kf1
// Bg2+
//   variation 1 -> Rg2 would have won more quickly. For instance: Qd3 Rxf2+ Kg1 Rg2+ Kh1 Rg1#
// Kg1
// Bh3+
// Kh1
// Bxf2
// Qf1 Absolutely forced.
// Bxf1
// Rxf1
// Re2
// Ra1
// Rh6
// d4
// Be3

Apartado 4 || --- Set-up a game from scratch ---
A Game object describes the total state of a chess game, i.e. the played moves, the corresponding positions, the metadata associated to the game (players' names, date, etc...), and the annotations associated to the moves (text comments, alternative moves considered by the annotator, NAGs, etc...).

Since a Game object can hold several alternative moves proposed by an annotator, the moves are represented through a tree-like structure (rather than a linear-like structure, as it would be the case if only the moves actually played were considered). There are two secondary objects used to represent this tree structure:

Node represents one move together with the annotations associated to this move. It gives access to the positions before and after the move is played (see methods Node.positionBefore and Node.position). It also gives access to the following move in the game (see Node.next), and the alternative moves - aka. the variations - if any (see Node.variations).
Variation represents a sequence of Node objects, aka a sequence of moves. A Game object holds a so-called "main variation" (see Game.mainVariation) that is the root of the tree structure.
You can create a Game object from scratch as follows:

const { Game, pgnWrite } = require('kokopu');

const game = new Game();

// Set the player's names and event
game.playerName('w', 'Alice');
game.playerName('b', 'Bob');
game.event('1st International Open of Whatever');

// Start the main variation
let current = game.mainVariation(); // `current` points at a `Variation` object here
current = current.play('e4'); // `current` points at a `Node` object from now on
current = current.play('e5');

// Let's introduce an alternative to move 1...e5
let alternative1 = current.addVariation(); // `alternative1` points at a `Variation` object here
alternative1 = alternative1.play('c5'); // `alternative1` points at a `Node` object from now on
alternative1 = alternative1.play('Nf3');

// Let's introduce another alternative to move 1...e5
let alternative2 = current.addVariation(); // `alternative2` points at a `Variation` object here
alternative2 = alternative2.play('e6'); // `alternative2` points at a `Node` object from now on
alternative2 = alternative2.play('d4');

// Back to the main variation
current = current.play('Bc4');
current = current.play('Nc6');
current = current.play('Qh5');
current = current.play('Nf6');
current = current.play('Qxf7#');
current.comment('That is the Scholar\'s Mate');
game.result('1-0');

// Display an ASCII-art representation of the game.
console.log(game.ascii());

// Event: 1st International Open of Whatever
// White: Alice
// Black: Bob
// 1.e4
// 1...e5
//  |
//  +- 1...c5
//  |  2.Nf3
//  |
//  +- 1...e6
//  |  2.d4
//  |
// 2.Bc4
// 2...Nc6
// 3.Qh5
// 3...Nf6
// 4.Qxf7# That is the Scholar's Mate
// 1-0

// Generate the PGN-representation of the game.
console.log(pgnWrite(game));

// [Event "1st International Open of Whatever"]
// [Site "?"]
// [Date "????.??.??"]
// [Round "?"]
// [White "Alice"]
// [Black "Bob"]
// [Result "1-0"]
//
// 1. e4 e5 (1... c5 2. Nf3) (1... e6 2. d4) 2. Bc4 Nc6 3. Qh5 Nf6 4. Qxf7# {That
// is the Scholar's Mate} 1-0

Apartado 5 || --- Game/JSON conversion ---
A Game object can be serialized to JSON using method Game.pojo, while the corresponding de-serialization operation is achieved by method Game.fromPOJO.

An example of JSON de-serialization from file example.json is presented below:

const { Game } = require('kokopu');
const fs = require('fs');

// Read the content of the JSON file provided above
const jsonText = fs.readFileSync('example.json', 'utf8');

// De-serialize this content.
const game = Game.fromPOJO(JSON.parse(jsonText));

// Display an ASCII-art representation of the game.
console.log(game.ascii());

// Event: 1st American Chess Congress (4.6)
// Site: New York, NY USA
// Date: November 3, 1857
// White: Paulsen, Louis
// Black: Morphy, Paul
// 1.e4
// 1...e5
// 2.Nf3
// 2...Nc6
// 3.Nc3
// 3...Nf6
// 4.Bb5
// 4...Bc5
// 5.O-O
// 5...O-O
// 6.Nxe5
// 6...Re8
// 7.Nxc6
// 7...dxc6
// 8.Bc4
// 8...b5
// 9.Be2
// 9...Nxe4
// 10.Nxe4
// 10...Rxe4
// 11.Bf3
// 11...Re6
// 12.c3
// 12...Qd3
// 13.b4
// 13...Bb6
// 14.a4
// 14...bxa4
// 15.Qxa4
// 15...Bd7
// 16.Ra2
// 16...Rae8
// 17.Qa6 Morphy took twelve minutes over his next move, probably to assure himself that the combination was sound and that he had a forced win in every variation.
// 17...Qxf3 !!
// 18.gxf3
// 18...Rg6+
// 19.Kh1
// 19...Bh3
// 20.Rd1
//  |
//  +- Not
//  |  20.Rg1
//  |  20...Rxg1+
//  |  21.Kxg1
//  |  21...Re1+ −+
//  |
// 20...Bg2+
// 21.Kg1
// 21...Bxf3+
// 22.Kf1
// 22...Bg2+
//  |
//  +- 22...Rg2 ! would have won more quickly. For instance:
//  |  23.Qd3
//  |  23...Rxf2+
//  |  24.Kg1
//  |  24...Rg2+
//  |  25.Kh1
//  |  25...Rg1#
//  |
// 23.Kg1
// 23...Bh3+
// 24.Kh1
// 24...Bxf2
// 25.Qf1 Absolutely forced.
// 25...Bxf1
// 26.Rxf1
// 26...Re2
// 27.Ra1
// 27...Rh6
// 28.d4
// 28...Be3
// 0-1
Copy
The reverse JSON serialization operation is achieved similarly:

const game = /* initialized as above */;

// Display the JSON representing the game.
console.log(JSON.stringify(game.pojo()));

// {"white":{"name":"Paulsen, Louis"},"black":{"name":"Morphy, Paul"},"event":"1st American Chess Congress",
// "round":4,"subRound":6,"date":"1857-11-03","site":"New York, NY USA","result":"0-1","mainVariation":["e4",
// "e5","Nf3","Nc6","Nc3","Nf6","Bb5","Bc5","O-O","O-O","Nxe5" etc...
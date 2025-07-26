Kokopu-React


Kokopu-React is a React-based library to create and display chessboard and chess-related components. Kokopu-React is built on top of Kokopu, a headless library that implements all the chess logic (game rules, parsing of FEN and PGN formats...).

----------------------------------------------------------------------------------------
Home
Kokopu-React is a React-based library to create and display chessboard and chess-related components. Kokopu-React is built on top of Kokopu, a headless library that implements all the chess logic (game rules, parsing of FEN and PGN formats...).

https://www.npmjs.com/package/kokopu-react

Installation
npm install kokopu-react
If you use Webpack, please look at webpack configuration to get more information on how to configure it to handle Kokopu-React propertly.

Main components
Chessboard: SVG image representing a chessboard diagram. Optionally, the user may interact with the board (move pieces, click on squares...). Annotations such as square markers or arrows can also be added to the board.
Movetext: represents a chess game, i.e. the headers (name of the players, event, etc.), the moves, and all the related annotations if any (comments, variations, NAGs...).
Example
1
2
3
4
5
6
7
8
a
b
c
d
e
f
g
h
View Code
<Chessboard position="rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" />
<Chessboard position="rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" />
Breaking changes
Versions 2.0.0 and 3.0.0 introduce some breaking changes with regard to the previous versions. To determine whether your codebase needs to be adapted or not when upgrading Kokopu-React, please look at:

migration guide to 3.x to upgrade from 2.x to 3.0.0 (or any subsequent version).
migration guide to 2.x and migration guide to 3.x to upgrade from 1.x to 3.0.0 (or any subsequent version).

COMPONENT 1 || --- ErrorBox ---
import { ErrorBox } from 'kokopu-react';
Display an error message.

Props & methods
Prop name	Type	Default	Description
message	string	Required	
Additional message providing details about the error.

title	string	Required	
Title of the error box.

errorIndex	number		
Index of the character within text that results in the error.

lineNumber	number		
Index (1-based) of the line in which is the character that results in the error.

text	string		
Raw text whose processing results in the error.

Something went wrong
This message describes what went wrong.
View Code
<ErrorBox title="Something went wrong" message="This message describes what went wrong." />

COMPONENT 2 || --- SquareMarkerIcon --- 
import { SquareMarkerIcon } from 'kokopu-react';
SVG icon representing a square marker.

Props & methods
Prop name	Type	Default	Description
size	number	Required	
Width and height (in pixels) of the icon.

color	string	currentcolor	
CSS color to use to colorize the icon (for example: 'green', '#ff0000'...).

View Code
<SquareMarkerIcon size={40} color="blue" />

COMPONENT 3 || --- TextMarkerIcon --- 
import { TextMarkerIcon } from 'kokopu-react';
SVG icon representing a text marker.

Props & methods
Prop name	Type	Default	Description
size	number	Required	
Width and height (in pixels) of the icon.

symbol	AnnotationSymbol	Required	
Symbol to represent on the icon.

color	string	currentcolor	
CSS color to use to colorize the icon (for example: 'green', '#ff0000'...).

A
View Code
<TextMarkerIcon size={40} symbol="A" color="blue" />

COMPONENT 4 || --- ArrowMarkerIcon ---
import { ArrowMarkerIcon } from 'kokopu-react';
SVG icon representing an arrow marker.

Props & methods
Prop name	Type	Default	Description
size	number	Required	
Width and height (in pixels) of the icon.

color	string	currentcolor	
CSS color to use to colorize the icon (for example: 'green', '#ff0000'...).

View Code
<ArrowMarkerIcon size={40} color="blue" />


COMPONENT 5 || --- ChessPieceIcon ---
import { ChessPieceIcon } from 'kokopu-react';
SVG icon representing a colored chess piece, or a list of colored chess pieces.

Props & methods
Prop name	Type	Default	Description
size	number	Required	
Width and height (in pixels) of each chess piece icon.

type	ChessPieceIconType | ChessPieceIconType[]	Required	
Chess piece(s) to display.

pieceset	string	cburnett	
Piece theme ID. Must be a property of Chessboard.piecesets().

View Code
<ChessPieceIcon size={40} type={[ 'wk', 'bp', 'bp' ]} />


COMPONENT 5 || --- Chessboard ---
import { Chessboard } from 'kokopu-react';
SVG image representing a chessboard diagram. Optionally, the user may interact with the board (move pieces, click on squares...). Annotations such as square markers or arrows can also be added to the board.

Props & methods
Prop name	Type	Default	Description
animated	boolean	Required	
Whether moves are animated or not.

colorset	string	Required	
Color theme ID. Must be a property of Chessboard.colorsets().

coordinateVisible	boolean	Required	
Whether the row and column coordinates are visible or not.

moveArrowColor	AnnotationColor	Required	
Color of the move arrow.

moveArrowVisible	boolean	Required	
Whether moves are highlighted with an arrow or not.

pieceset	string	Required	
Piece theme ID. Must be a property of Chessboard.piecesets().

squareSize	number	Required	
Size of the squares (in pixels). Must be an integer between Chessboard.minSquareSize() and Chessboard.maxSquareSize().

turnVisible	boolean	Required	
Whether the turn flag is visible or not.

arrowMarkers	string | Partial<Record<"a1a1" | "a1a2" | "a1a3" | "a1a4" | "a1a5" | "a1a6" | "a1a7" | "a1a8" | "a1b1" | "a1b2" | "a1b3" | "a1b4" | "a1b5" | "a1b6" | "a1b7" | "a1b8" | "a1c1" | "a1c2" | "a1c3" | ... 4076 more ... | "h8h8", AnnotationColor>>		
Arrow markers, defined as a {@link ArrowMarkerSet} (e.g. { e2e4: 'g', g8f6: 'r', g8h6: 'y' }) or as a comma-separated CAL string (e.g. 'Ge2e4,Rg8f6,Yg8h6').

bottomComponent	(attr: Pick<StaticBoardGraphicProps, "squareSize" | "coordinateVisible" | "turnVisible">) => Element		
Optional component, to be rendered below the chessboard, and customized with the same square-size / coordinate-visible / turn-visible parameter values as actually used for the chessboard (which may be different from what is defined in props because of small-screen limits).

editedArrowColor	AnnotationColor		
Color of the edited arrow. Mandatory if interactionMode === 'editArrows', ignored otherwise.

flipped	boolean	false	
Whether the board is flipped (i.e. seen from Black's point of view) or not.

interactionMode	"movePieces" | "clickSquares" | "editArrows" | "playMoves"		
Type of action allowed with the mouse on the chessboard. If undefined, then the user cannot interact with the component.

'movePieces' allows the user to drag & drop the chess pieces from one square to another (regardless of the chess rules),
'clickSquares' allows the user to click on squares,
'editArrows' allows the user to draw arrow markers from one square to another (warning: attribute editedArrowColor must be set),
'playMoves' allows the user to play legal chess moves (thus no interaction is possible if the displayed position is not legal).
move	string | MoveDescriptor		
Displayed move (optional), defined either as a kokopu.MoveDescriptor object or as a SAN string) (e.g. 'Nf3'). Use '--' for a null-move. In all cases, the move must be a legal move in position defined in attribute position.

onArrowEdited	(from: "a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | ... 36 more ... | "h8", to: "a1" | ... 62 more ... | "h8") => void		
Callback invoked when an arrow is dragged (only if interactionMode is set to 'editArrows').

onMovePlayed	(move: string) => void		
Callback invoked when a move is played (only if interactionMode is set to 'playMoves').

onPieceMoved	(from: "a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | ... 36 more ... | "h8", to: "a1" | ... 62 more ... | "h8") => void		
Callback invoked when a piece is moved through drag&drop (only if interactionMode is set to 'movePieces').

onSquareClicked	(square: "a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | ... 36 more ... | "h8") => void		
Callback invoked when the user clicks on a square (only if interactionMode is set to 'clickSquares').

position	string | Position	start	
Displayed position. Can be a kokopu.Position object, a FEN string, 'start' (usual starting position), or 'empty' (empty board).

Optionally, the FEN string can be prefixed with 'variant:', variant corresponding to one of the game variant supported by Kokopu. For instance: 'chess960:nrkbqrbn/pppppppp/8/8/8/8/PPPPPPPP/NRKBQRBN w KQkq - 0 1'.

smallScreenLimits	SmallScreenLimit[]		
Limits applicable on small-screen devices. For instance, if set to [ { width: 768, squareSize: 40 }, { width: 375, squareSize: 24, coordinateVisible: false } ] then on screens with resolution ≤768 pixels, the square size will be limited to 40 (whatever the value of the squareSize attribute); in addition, on screens with resolution ≤375 pixels, the square size will be limited to 24 and the row and column coordinates will always be hidden (whatever the value of the coordinateVisible attribute).

squareMarkers	string | Partial<Record<"a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | ... 38 more ... | "h8", AnnotationColor>>		
Square markers, defined as a {@link SquareMarkerSet} (e.g. { e4: 'g', d5: 'r' }) or as a comma-separated CSL string (e.g. 'Rd5,Ge4').

textMarkers	string | Partial<Record<"a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | ... 38 more ... | "h8", { ...; }>>		
Text markers, defined as a {@link TextMarkerSet} (e.g. { e4: { symbol: 'A', color: 'g' }, d5: { symbol: 'z', color: 'r' }}) or as a comma-separated CTL string (e.g. 'Rzd5,GAe4').

topComponent	(attr: Pick<StaticBoardGraphicProps, "squareSize" | "coordinateVisible" | "turnVisible">) => Element		
Optional component, to be rendered above the chessboard, and customized with the same square-size / coordinate-visible / turn-visible parameter values as actually used for the chessboard (which may be different from what is defined in props because of small-screen limits).

Method name	Parameters	Description
minSquareSize()		
Minimum square size (inclusive).

maxSquareSize()		
Maximum square size (inclusive).

colorsets()		
Available colorsets for theming.

piecesets()		
Available piecesets for theming.

1
2
3
4
5
6
7
8
a
b
c
d
e
f
g
h
View Code
<Chessboard position="r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3" />

COMPONENTE 6 || --- NavigationBoard ---
import { NavigationBoard } from 'kokopu-react';
Component displaying the positions occurring in a chess game, with navigation buttons to browse these positions.

Props & methods
Prop name	Type	Default	Description
animated	boolean	Required	
Whether moves are animated or not.

colorset	string	Required	
Color theme ID. Must be a property of Chessboard.colorsets().

coordinateVisible	boolean	Required	
Whether the row and column coordinates are visible or not.

moveArrowColor	AnnotationColor	Required	
Color of the move arrow.

moveArrowVisible	boolean	Required	
Whether moves are highlighted with an arrow or not.

pieceset	string	Required	
Piece theme ID. Must be a property of Chessboard.piecesets().

squareSize	number	Required	
Size of the squares (in pixels). Must be an integer between Chessboard.minSquareSize() and Chessboard.maxSquareSize().

turnVisible	boolean	Required	
Whether the turn flag is visible or not.

additionalButtons	NavigationBar	[]	
Additional buttons to be added to the toolbar.

flipButtonVisible	boolean	true	
Whether the flip button is visible or not in the toolbar.

flipped	boolean		
Whether the board is flipped (i.e. seen from Black's point of view) or not. If provided (i.e. if the flip state is controlled), the attribute onFlippedChanged must be provided as well.

game	string | Game | Database	new Game()	
Displayed game. Can be a kokopu.Game object, a kokopu.Database object, or a PGN string.

gameIndex	number	0	
Index of the game to display (only if attribute game is a kokopu.Database or a PGN string): 0 for the first game of the database/PGN, 1 for the second one, etc. If omitted, the first game of the database/PGN is displayed.

initialFlipped	boolean	false	
Whether the board is initially flipped (i.e. seen from Black's point of view) or not, when the flip state is uncontrolled. Ignored if the flipped attribute is provided.

initialIsPlaying	boolean	false	
Whether auto-play is initially enabled or not. Ignored if the isPlaying attribute is provided.

initialNodeId	string	start	
ID of the move initially selected (or 'start'/'end' for the beginning/end of the main variation) when the component is uncontrolled. Use kokopu.Node#id to get the ID of a game move. Ignored if the nodeId attribute is provided.

isPlaying	boolean		
Whether auto-play is enabled or not. If provided (i.e. if the is-playing state is controlled), the attribute onIsPlayingChanged must be provided as well.

nodeId	string		
ID of the selected move (or 'start'/'end' for the beginning/end of the main variation). Use kokopu.Node#id to get the ID of a game move. If provided (i.e. if the component is controlled), the attribute onNodeIdChanged must be provided as well.

onFlippedChanged	(flipped: boolean) => void		
Callback invoked in controlled-flip-state mode, when the user flips the board.

Arguments
flipped New flip state.
onIsPlayingChanged	(isPlaying: boolean) => void		
Callback invoked in controlled-is-playing-state mode, when the user clicks on the play/stop button.

Arguments
isPlaying New is-playing state.
onNodeIdChanged	(nodeId: string) => void		
Callback invoked in controlled-component mode, when the user changes the selected move.

Arguments
nodeId ID of the selected move (as returned by kokopu.Node#id), or 'start' for the beginning of the main variation.
playButtonVisible	boolean	false	
Whether the play/stop button is visible or not in the toolbar.

smallScreenLimits	SmallScreenLimit[]		
Limits applicable on small-screen devices. For instance, if set to [ { width: 768, squareSize: 40 }, { width: 375, squareSize: 24, coordinateVisible: false } ] then on screens with resolution ≤768 pixels, the square size will be limited to 40 (whatever the value of the squareSize attribute); in addition, on screens with resolution ≤375 pixels, the square size will be limited to 24 and the row and column coordinates will always be hidden (whatever the value of the coordinateVisible attribute).

Method name	Parameters	Description
focus()		
Set the focus to the current component.

1
2
3
4
5
6
7
8
a
b
c
d
e
f
g
h
View Code
const pgn = `
[Event "Television Exhibition"]
[Site "London ENG"]
[Date "2014.01.23"]
[Round "?"]
[White "Bill Gates"]
[Black "Magnus Carlsen"]
[Result "0-1"]

1.e4 Nc6 2.Nf3 d5 3.Bd3 Nf6 4.exd5 Qxd5 5.Nc3 Qh5 6.O-O Bg4
7.h3 Ne5 8.hxg4 Nfxg4 9.Nxe5 Qh2# 0-1`;

<NavigationBoard game={pgn} initialNodeId="end" playButtonVisible />

COMPONENTE 7 || --- Movetext ---
import { Movetext } from 'kokopu-react';
Display a chess game, i.e. the headers (name of the players, event, etc.), the moves, and all the related annotations if any (comments, variations, NAGs...).

Props & methods
Prop name	Type	Default	Description
diagramOptions	Partial<StaticBoardGraphicProps> & { flipped?: boolean; }	{}	
Options applicable to the diagrams in the comments. See Chessboard for more details about each option.

diagramVisible	boolean	true	
Whether the diagrams within the comments (if any) are displayed or not.

game	string | Game | Database	new Game()	
Displayed game. Can be a kokopu.Game object, a kokopu.Database object, or a PGN string.

gameIndex	number	0	
Index of the game to display (only if attribute game is a kokopu.Database or a PGN string): 0 for the first game of the database/PGN, 1 for the second one, etc. If omitted, the first game of the database/PGN is displayed.

headerVisible	boolean	true	
Whether the game headers (if any) are displayed or not.

interactionMode	"selectMove"		
Type of action allowed with the mouse/keys on the component. If undefined, then the user cannot interact with the component.

'selectMove' allows the user to select a move.
onMoveSelected	(nodeId: string, evtOrigin: MoveSelectEventOrigin) => void		
Callback invoked when the user selects a move (only if interactionMode is set to 'selectMove').

Arguments
nodeId ID of the selected move (as returned by kokopu.Node#id), 'start' for the beginning of the main variation, or undefined if the user unselects the previously selected move.evtOrigin Origin of the event. Can be: - 'key-first': the event has been triggered by the "go-to-first-move" key (aka. the home key), - 'key-previous': the event has been triggered by the "go-to-previous-move" key (aka. the arrow left key), - 'key-next': the event has been triggered by the "go-to-next-move" key (aka. the arrow right key), - 'key-last': the event has been triggered by the "go-to-last-move" key (aka. the end key), - 'key-exit': the event has been triggered by the "unselect-move" key (aka. the escape key), - 'click': the event has been triggered by a mouse click on a move.
pieceSymbols	"native" | "localized" | "figurines" | PieceSymbolMapping	native	
Symbols to use for the chess pieces. See {@link moveFormatter}.

selection	string		
ID of the selected move (or 'start'/'end' for the beginning/end of the main variation). Use kokopu.Node#id to get the ID of a game move.

Method name	Parameters	Description
focus()		
Set the focus to the current component.

Bill Gates
Magnus Carlsen
Television Exhibition
January 23, 2014 – London ENG
1.e4Nc62.Nf3d53.Bd3Nf64.exd5Qxd55.Nc3Qh56.O-OBg47.h3Ne58.hxg4Nfxg4
1
2
3
4
5
6
7
8
a
b
c
d
e
f
g
h
9.Nxe5Qh2#0–1
View Code
const pgn = `
[Event "Television Exhibition"]
[Site "London ENG"]
[Date "2014.01.23"]
[Round "?"]
[White "Bill Gates"]
[Black "Magnus Carlsen"]
[Result "0-1"]

1.e4 Nc6 2.Nf3 d5 3.Bd3 Nf6 4.exd5 Qxd5 5.Nc3 Qh5 6.O-O Bg4
7.h3 Ne5 8.hxg4 Nfxg4 {[#]} 9.Nxe5 Qh2# 0-1`;

<Movetext game={pgn} pieceSymbols="figurines" />
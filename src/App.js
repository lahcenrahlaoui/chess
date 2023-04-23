import { useState } from "react";

import Piece from "./components/Piece";

import b_bishop from "./images/b_bishop_svg_NoShadow.svg";
import w_bishop from "./images/w_bishop_svg_NoShadow.svg";

import b_king from "./images/b_king_svg_NoShadow.svg";
import w_king from "./images/w_king_svg_NoShadow.svg";

import b_queen from "./images/b_queen_svg_NoShadow.svg";
import w_queen from "./images/w_queen_svg_NoShadow.svg";

import b_knight from "./images/b_knight_svg_NoShadow.svg";
import w_knight from "./images/w_knight_svg_NoShadow.svg";

import b_rook from "./images/b_rook_svg_NoShadow.svg";
import w_rook from "./images/w_rook_svg_NoShadow.svg";

import b_pawn from "./images/b_pawn_svg_NoShadow.svg";
import w_pawn from "./images/w_pawn_svg_NoShadow.svg";

function App() {
    const [turn, setTurn] = useState("w");

    const checkIfPieceExist = (position, color) => {
        console.log(state[position].includes("/" + color))
        if (state[position] === ""  || !state[position].includes("/" + color)) {
            return true;
        }
        return false;
    };

    const makeDirection = (position, piece) => {
        const p = position.split("");
        const direction = [];
        const color = piece[0];
        if (piece.includes("rook")) {
            for (let i = 1; i <= 8; i++) {
                direction.push(p[0] + i);
            }
            for (let i = 0; i < 8; i++) {
                direction.push((i + 10).toString(36) + p[1]);
            }
            const removeDuplicate = direction.filter((dir) => position !== dir);
            const x = removeDuplicate.filter((item) => {
                if (checkIfPieceExist(item, color)) {
                    return item;
                }
            });
            return x;
        } else if (piece.includes("queen")) {
            for (let i = 1; i <= 8; i++) {
                direction.push(p[0] + i);
            }
            for (let i = 0; i < 8; i++) {
                direction.push((i + 10).toString(36) + p[1]);
            }
            const index = cols.indexOf(p[0]);

            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const letter = (i + index + 10).toString(36);
                    const number = parseInt(p[1]) + i;

                    if (cols.includes(letter) && rows.includes(number)) {
                        direction.push(letter + number);
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const letter = (i + index + 10).toString(36);
                    const number = parseInt(p[1]) - i;

                    if (cols.includes(letter) && rows.includes(number)) {
                        direction.push(letter + number);
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const letter = (-i + index + 10).toString(36);
                    const number = parseInt(p[1]) - i;

                    if (cols.includes(letter) && rows.includes(number)) {
                        direction.push(letter + number);
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const letter = (-i + index + 10).toString(36);
                    const number = parseInt(p[1]) + i;

                    if (cols.includes(letter) && rows.includes(number)) {
                        direction.push(letter + number);
                    }
                }
            }

            const removeDuplicate = [...new Set(direction)];
            return removeDuplicate.filter((dir) => position !== dir);
        } else if (piece.includes("pawn")) {
            if (piece[0] === "w") {
                if (p[1] === "2") {
                    direction.push(p[0] + (parseInt(p[1]) + 2));
                }
                direction.push(p[0] + (parseInt(p[1]) + 1));
            } else {
                if (p[1] === "7") {
                    direction.push(p[0] + (parseInt(p[1]) - 2));
                }
                direction.push(p[0] + (parseInt(p[1]) - 1));
            }
            console.log(direction);
            return direction.filter((dir) => position !== dir);
        } else if (piece.includes("king")) {
            direction.push(p[0] + p[1]);

            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) + 1) +
                    (parseInt(p[1]) + 1)
            );
            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) - 1) +
                    (parseInt(p[1]) + 1)
            );
            direction.push(p[0] + (parseInt(p[1]) + 1));

            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) + 1) +
                    parseInt(p[1])
            );
            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) - 1) +
                    parseInt(p[1])
            );

            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) + 1) +
                    (parseInt(p[1]) - 1)
            );
            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) - 1) +
                    (parseInt(p[1]) - 1)
            );
            direction.push(p[0] + (parseInt(p[1]) - 1));

            const removeErrorCases = direction.filter((item) => {
                if (rows.includes(parseInt(item[1])) && item !== "position") {
                    return item;
                }
            });

            return removeErrorCases;
        } else if (piece.includes("bishop")) {
            const index = cols.indexOf(p[0]);

            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const letter = (i + index + 10).toString(36);
                    const number = parseInt(p[1]) + i;

                    if (cols.includes(letter) && rows.includes(number)) {
                        direction.push(letter + number);
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const letter = (i + index + 10).toString(36);
                    const number = parseInt(p[1]) - i;

                    if (cols.includes(letter) && rows.includes(number)) {
                        direction.push(letter + number);
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const letter = (-i + index + 10).toString(36);
                    const number = parseInt(p[1]) - i;

                    if (cols.includes(letter) && rows.includes(number)) {
                        direction.push(letter + number);
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const letter = (-i + index + 10).toString(36);
                    const number = parseInt(p[1]) + i;

                    if (cols.includes(letter) && rows.includes(number)) {
                        direction.push(letter + number);
                    }
                }
            }

            const removeDuplicate = [...new Set(direction)];
            return removeDuplicate.filter((dir) => position !== dir);
        } else if (piece.includes("knight")) {
            const knightPositions = [];

            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) + 2) +
                    (parseInt(p[1]) + 1)
            );
            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) - 2) +
                    (parseInt(p[1]) + 1)
            );
            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) + 2) +
                    (parseInt(p[1]) - 1)
            );
            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) - 2) +
                    (parseInt(p[1]) - 1)
            );
            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) + 1) +
                    (parseInt(p[1]) + 2)
            );
            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) - 1) +
                    (parseInt(p[1]) + 2)
            );
            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) + 1) +
                    (parseInt(p[1]) - 2)
            );
            direction.push(
                String.fromCharCode(p[0].charCodeAt(p[0].length - 1) - 1) +
                    (parseInt(p[1]) - 2)
            );

            const removeErrorCases = direction.filter((item) => {
                if (
                    rows.includes(parseInt(item[1])) &&
                    cols.includes(item[0]) &&
                    item !== "position" &&
                    item.length < 3
                ) {
                    return item;
                }
            });
            console.log("XXXXXXXXXXXXXXXXXxx");
            console.log(removeErrorCases);
            return removeErrorCases;
        }
    };

    const initialPi = {
        a1: w_rook,
        b1: w_knight,
        c1: w_bishop,
        d1: w_queen,
        e1: w_king,
        f1: w_bishop,
        g1: w_knight,
        h1: w_rook,
        a2: w_pawn,
        b2: w_pawn,
        c2: w_pawn,
        d2: w_pawn,
        e2: w_pawn,
        f2: w_pawn,
        g2: w_pawn,
        h2: w_pawn,
        a3: "",
        b3: "",
        c3: "",
        d3: "",
        e3: "",
        f3: "",
        g3: "",
        h3: "",
        a4: "",
        b4: "",
        c4: "",
        d4: "",
        e4: "",
        f4: "",
        g4: "",
        h4: "",
        a5: "",
        b5: "",
        c5: "",
        d5: "",
        e5: "",
        f5: "",
        g5: "",
        h5: "",
        a6: "",
        b6: "",
        c6: "",
        d6: "",
        e6: "",
        f6: "",
        g6: "",
        h6: "",
        a7: b_pawn,
        b7: b_pawn,
        c7: b_pawn,
        d7: b_pawn,
        e7: b_pawn,
        f7: b_pawn,
        g7: b_pawn,
        h7: b_pawn,
        a8: b_rook,
        b8: b_knight,
        c8: b_bishop,
        d8: b_queen,
        e8: b_king,
        f8: b_bishop,
        g8: b_knight,
        h8: b_rook,
    };

    const [state, setState] = useState(initialPi);

    const rows = [1, 2, 3, 4, 5, 6, 7, 8].reverse();
    const letteres = "abcdefgh";
    const cols = letteres.split("");

    const content = [];

    const pieces = {
        b_bishop: b_bishop,
        b_rook: b_rook,
        b_knight: b_knight,
        b_king: b_king,
        b_queen: b_queen,
        b_pawn: b_pawn,
        w_bishop: w_bishop,
        w_rook: w_rook,
        w_knight: w_knight,
        w_king: w_king,
        w_queen: w_queen,
        w_pawn: w_pawn,
    };

    const handleClick = (piece, fc, sc) => {
        setState({ ...state, [fc]: "", [sc]: pieces[piece] });
    };

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < cols.length; j++) {
            content.push(
                <Piece
                    sum={i + j}
                    key={i + "" + j}
                    row={rows[i]}
                    col={cols[j]}
                    initialPieces={state}
                    onClick={handleClick}
                    makeDirection={makeDirection}
                    turn={turn}
                    setTurn={setTurn}
                />
            );
        }
    }

    return <div className="App">{content}</div>;
}

export default App;

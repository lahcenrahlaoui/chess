import { createElement, useEffect, useRef, useState } from "react";

import b_bishop from "../images/b_bishop_svg_NoShadow.svg";
import w_bishop from "../images/w_bishop_svg_NoShadow.svg";

import b_king from "../images/b_king_svg_NoShadow.svg";
import w_king from "../images/w_king_svg_NoShadow.svg";

import b_queen from "../images/b_queen_svg_NoShadow.svg";
import w_queen from "../images/w_queen_svg_NoShadow.svg";

import b_knight from "../images/b_knight_svg_NoShadow.svg";
import w_knight from "../images/w_knight_svg_NoShadow.svg";

import b_rook from "../images/b_rook_svg_NoShadow.svg";
import w_rook from "../images/w_rook_svg_NoShadow.svg";

import b_pawn from "../images/b_pawn_svg_NoShadow.svg";
import w_pawn from "../images/w_pawn_svg_NoShadow.svg";

const items = [];
let piece;
let fc;
let sc;
let dir;
let once = 0;

const Piece = ({
    row,
    col,
    initialPieces,
    onClick,
    sum,
    makeDirection,
    turn,
    setTurn,
}) => {
    const ref = useRef();

    // useEffect(() => {
    //     if (turn === "b") {
    //         const x = ref.current;
    //         piece = x.children[0]?.getAttribute("src")?.split("/media/")[1][0];
    //         fc = x.id;
    //         sc = "e4";

    //         if (piece === "b" && once === 0) {
    //             dir = makeDirection(fc, piece);

    //             once = 1;
    //             console.log(fc);

    //             onClick(piece, fc, sc);
    //             setTurn("w");
    //         }
    //     }
    // }, [turn]);

    const getFirstElement = () => {
        const checkTurn =
            ref.current.children[0]
                .getAttribute("src")
                .split("/media/")[1][0] === turn;
        if (checkTurn) {
            items.push(ref.current);
            piece = items[0].children[0]
                .getAttribute("src")
                .split("/media/")[1]
                .split("_svg")[0];
            fc = ref.current.id;
            dir = makeDirection(fc, piece);
            for (let i = 0; i < dir.length; i++) {
                const el = document.getElementById(dir[i]);
                const content = document.createElement("div");
                content.classList.add("point");
                el.append(content);
            }
        }
    };
    const getSecondElement = () => {
        items.push(ref.current);
        sc = ref.current.id;

        if (items[1].children[0]?.getAttribute("src")) {
            const typeSecondPiece = items[1].children[0]
                .getAttribute("src")
                .split("/media/")[1][0];

            if (typeSecondPiece === piece[0]) {
                items.splice(0, 999);
            }
        }

        if (items[0] === items[1] || !dir.includes(sc)) {
            for (let i = 0; i < dir.length; i++) {
                const el = document.getElementById(dir[i]);
                const child = el.lastElementChild;

                el.removeChild(child);
            }

            items.splice(0, 999);
        }
    };
    const moveThePiece = () => {
        for (let i = 0; i < dir.length; i++) {
            const el = document.getElementById(dir[i]);
            const child = el.lastElementChild;
            el.removeChild(child);
            items.splice(0, 999);
        }
        setTurn((s) => {
            if (s === "b") {
                return "w";
            } else {
                return "b";
            }
        });
        onClick(piece, fc, sc);
    };

    const handleClick = () => {
        if (items.length < 3) {
            if (ref.current.children[0] && !items[0]) {
                getFirstElement();
            } else if (items[0]) {
                getSecondElement();
            }
        }
        if (items.length === 2) {
            moveThePiece();
        }
    };

    return (
        <div
            ref={ref}
            id={col + row}
            className={`${sum % 2 === 0 ? "green" : "red"} relativeDiv`}
            onClick={handleClick}
        >
            {initialPieces[col + row] && (
                <img src={initialPieces[col + row]} alt="" />
            )}
        </div>
    );
};

export default Piece;

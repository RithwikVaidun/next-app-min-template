"use client";
import React, { useState, useEffect } from "react";
// import TypingArea from "./TypingArea"; // Import the TypingArea component
import WORDS from "an-array-of-english-words";
import { Highlight, Mark, Text, TextInput } from "@mantine/core";

// import { TextInput } from "@mantine/core";

function getValidWords(words, allowedLetters, numWords) {
  const allowedSet = new Set(allowedLetters);
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Filter words to include only those that contain allowed letters
  const validWords = words.filter((word) =>
    [...word].every((letter) => allowedSet.has(letter))
  );

  // If fewer valid words are found than the requested number, allow repetition
  if (validWords.length < numWords) {
    const result = [];
    for (let i = 0; i < numWords; i++) {
      result.push(validWords[Math.floor(Math.random() * validWords.length)]);
    }
    return result;
  }

  // Shuffle valid words and return the specified number
  const shuffledWords = validWords.sort(() => 0.5 - Math.random());
  return shuffledWords.slice(0, numWords);
}

function wordsToNumbers(words, letterToNumberMap) {
  return words.map((word) => {
    return [...word]
      .map((letter) => letterToNumberMap[letter] || "") // Convert each letter to its mapped number, or an empty string if not found
      .join(""); // Join the array of numbers into a single string
  });
}

const allowedLetters = "arstneio";
const maps = { a: 1, r: 2, s: 3, t: 4, n: 5, e: 6, i: 7, o: 8 };
const numWords = 10;
// const homeRowWords = getValidWords(WORDS, allowedLetters, numWords);
// const numbers = wordsToNumbers(homeRowWords, maps);

const numbers = [
  "28483",
  "7227414785",
  "312312",
  "41247563363",
  "127838",
  "3461275",
  "4828374763",
  "374",
  "144175623",
  "2844153",
];
const homeRowWords = [
  "rotos",
  "irritation",
  "sarsar",
  "tartinesses",
  "arioso",
  "stearin",
  "torosities",
  "sit",
  "attainers",
  "rottans",
];

const SpeedTypingGame = () => {
  const [input, setInput] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const handleInput = (event) => {
    console.log("input: ", event.target.value);
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    console.log("key: ", event.key);
    if (event.key === homeRowWords[wordIndex][charIndex]) {
      setInput((prevInp) => prevInp + event.key);
      setCharIndex((chIdx) => chIdx + 1);
    } else if (event.key === " " && input === homeRowWords[wordIndex]) {
      console.log("word complete");
      setWordIndex((ind) => ind + 1);
      setInput("");
      setCharIndex(0);
      console.log(homeRowWords[wordIndex]);
    } else {
      console.log("wrong key");
    }
  };

  const resetGame = () => {
    setCharIndex(0);
  };

  const combinedWords = homeRowWords.join(" ");
  const combinedNumbers = numbers.join(" ");

  const completedWords = homeRowWords.slice(0, wordIndex).join(" ");

  return (
    <div>
      <h1>Touch Type Practice</h1>
      <div>
        <Highlight highlight={[input, completedWords]}>
          {homeRowWords.join(" ")}
        </Highlight>

        {/* <p>{numbers.join(" ")}</p> */}
      </div>
      <TextInput type="text" value={input} onKeyDown={handleKeyDown} />
    </div>
    // <div className="container">
    //
    // </div>
  );
};

export default SpeedTypingGame;

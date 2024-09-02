"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TextInput,
  Button,
  Stack,
  Flex,
  Paper,
  Box,
  Switch,
  Grid,
} from "@mantine/core";
import WORDS from "an-array-of-english-words";
import WordRow from "./components/WordRow";
import NumberRow from "./components/NumberRow";

const allowedLetters = "arstneio";

const letterToMotionMap: { [key: string]: { hand: string; finger: string } } = {
  a: { hand: "L", finger: "1" },
  r: { hand: "L", finger: "2" },
  s: { hand: "L", finger: "3" },
  t: { hand: "L", finger: "4" },
  n: { hand: "R", finger: "1" },
  e: { hand: "R", finger: "2" },
  i: { hand: "R", finger: "3" },
  o: { hand: "R", finger: "4" },
};
const numWords = 10;

function getValidWords(
  words: string[],
  allowedLetters: string,
  numWords: number
) {
  const allowedSet = new Set(allowedLetters);
  const validWords = words.filter((word) =>
    Array.from(word).every((letter) => allowedSet.has(letter))
  );
  const shuffledWords = validWords.sort(() => 0.5 - Math.random());
  return shuffledWords.slice(0, numWords);
}

function wordsToMotions(words: string[]) {
  return words.map((word) =>
    Array.from(word).map((letter) => letterToMotionMap[letter])
  );
}

export default function HomePage() {
  const [homeRowWords, setHomeRowWords] = useState<string[]>([]);
  const [motions, setMotions] = useState<{ hand: string; finger: string }[][]>(
    []
  );
  const [input, setInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [hideWords, setHideWords] = useState(false);
  const [allowBackspace, setAllowBackspace] = useState(false);

  const generateNewWords = () => {
    const words = getValidWords(WORDS, allowedLetters, numWords);
    setHomeRowWords(words);
    setMotions(wordsToMotions(words));
    setInput("");
    setWordIndex(0);
    setCharIndex(0);
  };

  useEffect(() => {
    generateNewWords();
  }, []);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (showTimer && !timerRef.current) startTimer();

    if (event.key === homeRowWords[wordIndex]?.[charIndex]) {
      setInput((prevInput) => prevInput + event.key);
      setCharIndex((prevIndex) => prevIndex + 1);
      setErrorIndex(null);
    } else if (event.key === " " && input === homeRowWords[wordIndex]) {
      setWordIndex((prevIndex) => prevIndex + 1);
      setInput("");
      setCharIndex(0);
      setErrorIndex(null);
    } else if (allowBackspace && event.key === "Backspace") {
      if (charIndex > 0) {
        setInput((prevInput) => prevInput.slice(0, -1));
        setCharIndex((prevIndex) => prevIndex - 1);
        setErrorIndex(null);
      } else if (wordIndex > 0) {
        setWordIndex((prevIndex) => prevIndex - 1);
        setInput(homeRowWords[wordIndex - 1]);
        setCharIndex(homeRowWords[wordIndex - 1].length);
        setErrorIndex(null);
      }
    } else if (event.key !== "Shift") {
      setErrorIndex(charIndex);
    }

    if (
      wordIndex === numWords - 1 &&
      charIndex === homeRowWords[wordIndex]?.length - 1
    ) {
      generateNewWords();
      stopTimer();
    }
  };

  const resetTyping = () => {
    setInput("");
    setWordIndex(0);
    setCharIndex(0);
    setErrorIndex(null);
    setTimer(0);
  };

  return (
    <Stack align="center" mt="xl" gap="xl">
      <Text size="xl" fw={700} c="primary">
        Touch Type Practice
      </Text>
      <Paper w="95%" p="md" shadow="sm" radius="md" bg="#f0f0f0">
        <Flex direction="column" align="center" gap={0}>
          <Flex direction="column" align="center" gap={0}>
            {!hideWords && (
              <WordRow
                words={homeRowWords.slice(0, 10)}
                wordIndex={wordIndex}
                charIndex={charIndex}
                errorIndex={errorIndex}
              />
            )}
            <NumberRow
              motions={motions.slice(0, 10)}
              wordIndex={wordIndex}
              charIndex={charIndex}
            />
          </Flex>
          <Flex direction="column" align="center" gap={0} mt="xs">
            {!hideWords && (
              <WordRow
                words={homeRowWords.slice(10, 20)}
                wordIndex={wordIndex - 10}
                charIndex={charIndex}
                errorIndex={errorIndex}
              />
            )}
            <NumberRow
              motions={motions.slice(10, 20)}
              wordIndex={wordIndex - 10}
              charIndex={charIndex}
            />
          </Flex>
        </Flex>
        <TextInput
          value={input}
          onKeyDown={handleKeyDown}
          placeholder="Start typing here..."
          size="md"
          radius="md"
          mt="md"
        />
      </Paper>
      <Flex gap="md" align="center" wrap="wrap" justify="center">
        <Button onClick={generateNewWords} variant="light" radius="md">
          New Words
        </Button>
        <Button onClick={resetTyping} variant="light" radius="md">
          Reset Typing
        </Button>
        <Switch
          label="Show Timer"
          checked={showTimer}
          onChange={(event) => setShowTimer(event.currentTarget.checked)}
        />
        <Switch
          label="Hide Words"
          checked={hideWords}
          onChange={(event) => setHideWords(event.currentTarget.checked)}
        />
        <Switch
          label="Allow Backspace"
          checked={allowBackspace}
          onChange={(event) => setAllowBackspace(event.currentTarget.checked)}
        />
        {showTimer && <Text>Time: {timer}s</Text>}
      </Flex>
    </Stack>
  );
}

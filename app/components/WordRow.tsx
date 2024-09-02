import React from "react";
import { Flex, Box, Text } from "@mantine/core";

interface WordRowProps {
  words: string[];
  wordIndex: number;
  charIndex: number;
  errorIndex: number | null;
}

const WordRow: React.FC<WordRowProps> = ({
  words,
  wordIndex,
  charIndex,
  errorIndex,
}) => {
  return (
    <Flex wrap="nowrap" gap={4} justify="center">
      {words.map((word, wIndex) => (
        <Flex key={wIndex} mr={7}>
          {word.split("").map((char, cIndex) => (
            <Box key={cIndex} w={14} ta="center">
              <Text
                size="xl"
                fw={500}
                c={
                  wIndex < wordIndex ||
                  (wIndex === wordIndex && cIndex < charIndex)
                    ? "primary"
                    : wIndex === wordIndex && cIndex === errorIndex
                    ? "red"
                    : wIndex === wordIndex && cIndex === charIndex
                    ? "green" // Highlight the next character to be typed
                    : "inherit"
                }
              >
                {char}
              </Text>
            </Box>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

export default WordRow;

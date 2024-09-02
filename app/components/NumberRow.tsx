import React from "react";
import { Flex, Box, Text } from "@mantine/core";

interface NumberRowProps {
  motions: { hand: string; finger: string }[][];
  wordIndex: number;
  charIndex: number;
}

const getCharColor = (
  motion: { hand: string; finger: string },
  wIndex: number,
  cIndex: number,
  currentWordIndex: number,
  currentCharIndex: number
): string => {
  if (motion.hand === "L") {
    return "red";
  } else if (motion.hand === "R") {
    return "blue";
  } else if (
    wIndex < currentWordIndex ||
    (wIndex === currentWordIndex && cIndex < currentCharIndex)
  ) {
    return "primary";
  } else if (wIndex === currentWordIndex && cIndex === currentCharIndex) {
    return "green";
  } else {
    return "inherit";
  }
};

const NumberRow: React.FC<NumberRowProps> = ({
  motions,
  wordIndex,
  charIndex,
}) => {
  return (
    <Flex wrap="nowrap" gap={4} justify="center">
      {motions.map((word, wIndex) => (
        <Flex key={wIndex} mr={7}>
          {word.map((motion, cIndex) => (
            <Box key={cIndex} w={14} ta="center" pos="relative">
              <Text
                size="xl"
                c={getCharColor(motion, wIndex, cIndex, wordIndex, charIndex)}
              >
                {motion.finger}
              </Text>
              {wIndex === wordIndex && cIndex === charIndex && (
                <Box
                  pos="absolute"
                  bottom={-2}
                  left={0}
                  right={0}
                  h={2}
                  bg="blue"
                />
              )}
            </Box>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

export default NumberRow;

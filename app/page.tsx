"use client";

import { useState, useEffect, useCallback } from 'react';
import { Text, TextInput, Button, Stack, Box } from '@mantine/core';

const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect.",
  "Type as fast as you can!",
  "Improve your typing skills with this app."
];

export default function HomePage() {
  const [currentText, setCurrentText] = useState('');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);

  const newText = useCallback(() => {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setCurrentText(randomText);
    setInputText('');
    setResult('');
    setStartTime(null);
  }, []);

  useEffect(() => {
    newText();
  }, [newText]);

  const handleInput = (value: string) => {
    setInputText(value);
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value === currentText) {
      const endTime = Date.now();
      const totalTime = ((endTime - startTime!) / 1000).toFixed(2);
      const wordsPerMinute = Math.round((currentText.split(" ").length / Number(totalTime)) * 60);
      setResult(`Time: ${totalTime}s | Speed: ${wordsPerMinute} WPM`);
      setTimeout(newText, 2000);
    }
  };

  return (
    <Stack align="center" mt="xl">
      <Text size="xl">Typing Practice</Text>
      <Box w="80%" maw={600}>
        <Text size="lg" mb="md">{currentText}</Text>
        <TextInput
          value={inputText}
          onChange={(event) => handleInput(event.currentTarget.value)}
          placeholder="Start typing here..."
          size="md"
        />
      </Box>
      <Text size="lg" mt="md">{result}</Text>
      <Button onClick={newText} mt="md">New Text</Button>
    </Stack>
  );
}

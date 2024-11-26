import { Play, Pause, TimerIcon, RotateCcw } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

import { Button } from '../../ui/button';

interface TimerProps {
  duration: number; // Duración inicial en segundos
  onFinish?: () => void; // Callback al finalizar
}

const Timer: React.FC<TimerProps> = ({ duration, onFinish }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ['/alarm.mp3'],
      volume: 0.5,
      onend: () => {
        setIsSoundPlaying(false);
      },
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.play();
      setIsSoundPlaying(true);
    }
  };

  const stopSound = () => {
    if (soundRef.current) {
      soundRef.current.stop();
      setIsSoundPlaying(false);
    }
  };

  useEffect(() => {
    setTimeRemaining(duration);
    setIsRunning(false); // Reset the timer state when duration changes
    stopSound(); // Stop any playing sound
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && onFinish) {
      onFinish();
      playSound();
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining, onFinish]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className='flex justify-between items-center space-x-2 mb-4'>
      <TimerIcon className='w-5 h-5' />
      <span className='text-2xl font-mono'>{formatTime(timeRemaining)}</span>
      <div className='flex items-center space-x-2'>
        <Button size='icon' variant='outline' onClick={() => setIsRunning((prev) => !prev)}>
          {isRunning ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
        </Button>
        {isSoundPlaying ? (
          <Button size='icon' variant='outline' onClick={stopSound}>
            <span className='h-4 w-4'>⏹️</span>
          </Button>
        ) : (
          <Button
            size='icon'
            variant='outline'
            onClick={() => {
              setIsRunning(false);
              setTimeRemaining(duration);
              stopSound();
            }}
          >
            <RotateCcw className='h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Timer;

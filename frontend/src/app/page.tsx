"use client";
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, Clock } from 'lucide-react';

export default function TimerPage() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStartPause = () => {
    if (time === 0 && !isRunning) {
      const totalSeconds = inputMinutes * 60 + inputSeconds;
      setTime(totalSeconds);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setInputMinutes(0);
    setInputSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'minutes') {
      setInputMinutes(Math.max(0, parseInt(value) || 0));
    } else {
      setInputSeconds(Math.max(0, parseInt(value) || 0));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">MiniTimer</h1>

          <div className="mb-8">
            <div className="text-7xl font-bold text-primary-600 mb-4">
              {formatTime(time || (inputMinutes * 60 + inputSeconds))}
            </div>
            <div className="text-sm text-gray-500">Time Remaining</div>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <div className="flex items-center">
              <input
                type="number"
                name="minutes"
                value={inputMinutes}
                onChange={handleInputChange}
                className="w-16 text-center border border-gray-300 rounded-md py-2 text-lg"
                min="0"
              />
              <span className="ml-2 text-gray-600">Minutes</span>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                name="seconds"
                value={inputSeconds}
                onChange={handleInputChange}
                className="w-16 text-center border border-gray-300 rounded-md py-2 text-lg"
                min="0"
                max="59"
              />
              <span className="ml-2 text-gray-600">Seconds</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleStartPause}
              className={`flex items-center justify-center w-16 h-16 rounded-full shadow-md transition-all duration-200 ${isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-primary-600 hover:bg-primary-700'} text-white`}
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all duration-200"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center">
            <Settings className="w-5 h-5 mr-2" />
            Timer Instructions
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <Clock className="w-4 h-4 mt-1 mr-2 text-primary-500 flex-shrink-0" />
              <span>Set your desired time using the minute and second inputs</span>
            </li>
            <li className="flex items-start">
              <Clock className="w-4 h-4 mt-1 mr-2 text-primary-500 flex-shrink-0" />
              <span>Click the play button to start the timer</span>
            </li>
            <li className="flex items-start">
              <Clock className="w-4 h-4 mt-1 mr-2 text-primary-500 flex-shrink-0" />
              <span>Use pause to temporarily stop the timer</span>
            </li>
            <li className="flex items-start">
              <Clock className="w-4 h-4 mt-1 mr-2 text-primary-500 flex-shrink-0" />
              <span>Click reset to clear the timer and start over</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
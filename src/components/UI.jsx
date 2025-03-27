import { useState, useEffect } from 'react';
import { Play, Pause, Flag, VolumeX, Volume2 } from 'lucide-react';

const UI = ({ startGame, pauseGame, isPaused, isGameStarted }) => {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [muted, setMuted] = useState(false);
  const [currentWord, setCurrentWord] = useState({
    spanish: '¡Hola!',
    english: 'Hello!',
  });

  const spanishWords = [
    { spanish: '¡Hola!', english: 'Hello!' },
    { spanish: 'Adelante', english: 'Forward' },
    { spanish: 'Izquierda', english: 'Left' },
    { spanish: 'Derecha', english: 'Right' },
    { spanish: 'Saltar', english: 'Jump' },
    { spanish: 'Correr', english: 'Run' },
    { spanish: '¡Vamos!', english: "Let's go!" },
  ];

  const handleStartGame = () => {
    setShowStartScreen(false);
    startGame();
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const togglePause = () => {
    pauseGame();
  };

  useEffect(() => {
    if (isGameStarted && !isPaused) {
      const wordInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * spanishWords.length);
        setCurrentWord(spanishWords[randomIndex]);
      }, 5000);

      return () => clearInterval(wordInterval);
    }
  }, [isGameStarted, isPaused]);

  if (showStartScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90 p-6">
        <div className="bg-purple-900 text-white rounded-2xl max-w-md w-full py-12 px-6 text-center shadow-2xl">
          <h1 className="text-4xl font-bold mb-4">Welcome to Habla+</h1>
          <p className="text-gray-200 text-lg">
            In this game, you'll explore the city and meet Spanish speakers. Complete tasks, answer questions, and prove your Spanish skills as you play.
          </p>

          <button
            onClick={handleStartGame}
            className="!mt-10 !bg-purple-600 !hover:bg-purple-700 !text-white !font-bold !py-4 !px-10 !rounded-full !text-lg !w-full"
          >
            <div className="flex items-center justify-center gap-2">
              <Play className="h-5 w-5" />
              <span>Start Game</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top HUD */}
      <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-40 bg-black bg-opacity-80 shadow-md">
        <div className="flex items-center space-x-3 bg-purple-900 p-3 rounded-lg text-white">
          <Flag className="h-5 w-5 text-purple-300" />
          <span className="font-semibold">Habla+ Adventure</span>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={toggleMute}
            className="!bg-purple-800 p-3 rounded-lg text-white hover:!bg-purple-700 transition"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

          <button
            onClick={togglePause}
            className="!bg-purple-800 p-3 rounded-lg text-white hover:!bg-purple-700 transition"
            aria-label={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? <Play className="h-5 w-5 text-purple-300" /> : <Pause className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Floating Word Display */}
      {isGameStarted && !isPaused && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-purple-900 px-6 py-4 rounded-xl text-white shadow-md max-w-xs text-center">
          <span className="block text-xs text-purple-300 uppercase tracking-wider mb-1">Spanish Word</span>
          <h3 className="text-2xl font-bold">{currentWord.spanish}</h3>
          <p className="text-purple-200">{currentWord.english}</p>
        </div>
      )}

      {/* Pause Menu */}
      {isPaused && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-purple-900 text-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Game Paused</h2>
            <p className="text-purple-200 mb-6">Take a break and review your Spanish skills.</p>

            <div className="bg-purple-800 p-4 rounded-xl mb-6">
              <h3 className="text-xl font-bold text-purple-300">Practice:</h3>
              <p className="text-2xl font-bold mt-2">{currentWord.spanish}</p>
              <p className="text-purple-200">{currentWord.english}</p>
            </div>

            <button
              onClick={togglePause}
              className="!bg-purple-600 !hover:bg-purple-700 !text-white !font-bold !py-3 !px-8 !rounded-full !transition"
            >
              Continue (Continuar)
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UI;

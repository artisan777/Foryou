import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomePage from './pages/WelcomePage';
import MemoryLanePage from './pages/MemoryLanePage';
import MiniGamePage from './pages/MiniGamePage';
import ConfessionPage from './pages/ConfessionPage';
import ProposalPage from './pages/ProposalPage';
import FinalMessagePage from './pages/FinalMessagePage';

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    <WelcomePage key="welcome" onNext={() => setCurrentPage(1)} />,
    <MemoryLanePage key="memory" onNext={() => setCurrentPage(2)} />,
    <MiniGamePage key="game" onNext={() => setCurrentPage(3)} />,
    <ConfessionPage key="confession" onNext={() => setCurrentPage(4)} />,
    <ProposalPage key="proposal" onNext={() => setCurrentPage(5)} />,
    <FinalMessagePage key="final" />
  ];

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        {pages[currentPage]}
      </AnimatePresence>
    </div>
  );
}

export default App;
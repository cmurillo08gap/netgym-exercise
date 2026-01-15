/**
 * Baseball Players App
 * 
 * Main application component that orchestrates the player list,
 * sorting controls, and side panel for viewing/editing players.
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchPlayers } from './services/api';
import PlayerList from './components/PlayerList';
import SidePanel from './components/SidePanel';

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('hits');
  const [sortDir, setSortDir] = useState('desc');
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  // Fetch players when sort changes
  const loadPlayers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPlayers(sortBy, sortDir);
      setPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [sortBy, sortDir]);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  const handleSortChange = (field) => {
    if (sortBy === field) {
      // Toggle direction if same field
      setSortDir(sortDir === 'desc' ? 'asc' : 'desc');
    } else {
      // New field, default to desc (except for name which defaults to asc)
      setSortBy(field);
      setSortDir(field === 'player_name' ? 'asc' : 'desc');
    }
  };

  const handlePlayerClick = (playerId) => {
    setSelectedPlayerId(playerId);
  };

  const handlePanelClose = () => {
    setSelectedPlayerId(null);
  };

  const handleSave = () => {
    // Refresh the player list after saving
    loadPlayers();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            ⚾ Baseball Players
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Player List */}
        <PlayerList
          players={players}
          loading={loading}
          error={error}
          selectedPlayerId={selectedPlayerId}
          onPlayerClick={handlePlayerClick}
          sortBy={sortBy}
          sortDir={sortDir}
          onSortChange={handleSortChange}
        />
      </main>

      {/* Side Panel */}
      {selectedPlayerId && (
        <SidePanel
          playerId={selectedPlayerId}
          onClose={handlePanelClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default App;

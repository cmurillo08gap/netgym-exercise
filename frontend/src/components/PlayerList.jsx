/**
 * PlayerList Component
 * 
 * Displays all players in a table format with sortable columns
 */

import PlayerRow from './PlayerRow';

// Sort indicator component
function SortIcon({ field, sortBy, sortDir }) {
  if (sortBy !== field) {
    // Inactive - show subtle sort icon
    return (
      <svg className="ml-1 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  return <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
}

// Sortable header component
function SortableHeader({ field, label, sortBy, sortDir, onSort, align = 'right', width }) {
  const isSortable = ['player_name', 'hits', 'home_run'].includes(field);
  
  if (!isSortable) {
    return (
      <th className={`${width} px-4 py-3 text-${align} text-xs font-semibold text-gray-600 uppercase tracking-wider`}>
        {label}
      </th>
    );
  }

  return (
    <th
      onClick={() => onSort(field)}
      className={`${width} px-4 py-3 text-${align} text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none ${
        sortBy === field ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
      }`}
    >
      <span className="inline-flex items-center justify-end">
        {label}
        <SortIcon field={field} sortBy={sortBy} sortDir={sortDir} />
      </span>
    </th>
  );
}

export default function PlayerList({ players, loading, error, selectedPlayerId, onPlayerClick, sortBy, sortDir, onSortChange }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading players...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
        <p className="font-medium">Error loading players</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!players || players.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No players found
      </div>
    );
  }

  const columns = [
    { field: 'player_name', label: 'Name', width: 'w-[12%]', align: 'left' },
    { field: 'position', label: 'Pos', width: 'w-[5%]', align: 'left' },
    { field: 'games', label: 'Games', width: 'w-[7%]', align: 'right' },
    { field: 'at_bat', label: 'AB', width: 'w-[7%]', align: 'right' },
    { field: 'runs', label: 'Runs', width: 'w-[7%]', align: 'right' },
    { field: 'hits', label: 'Hits', width: 'w-[7%]', align: 'right' },
    { field: 'double_2b', label: '2B', width: 'w-[6%]', align: 'right' },
    { field: 'home_run', label: 'HR', width: 'w-[6%]', align: 'right' },
    { field: 'run_batted_in', label: 'RBI', width: 'w-[7%]', align: 'right' },
    { field: 'strikeouts', label: 'SO', width: 'w-[6%]', align: 'right' },
    { field: 'a_walk', label: 'BB', width: 'w-[6%]', align: 'right' },
    { field: 'stolen_base', label: 'SB', width: 'w-[6%]', align: 'right' },
    { field: 'avg', label: 'AVG', width: 'w-[6%]', align: 'right' },
  ];

  return (
    <div className="rounded-lg border border-gray-200 flex flex-col max-h-[calc(100vh-180px)] overflow-hidden">
      {/* Scrollable container for both header and body */}
      <div className="overflow-x-auto flex-1 overflow-y-auto">
        <table className="w-full table-fixed min-w-[900px]">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <SortableHeader
                  key={col.field}
                  field={col.field}
                  label={col.label}
                  sortBy={sortBy}
                  sortDir={sortDir}
                  onSort={onSortChange}
                  align={col.align}
                  width={col.width}
                />
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map((player) => (
              <PlayerRow
                key={player.id}
                player={player}
                onClick={onPlayerClick}
                isSelected={player.id === selectedPlayerId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

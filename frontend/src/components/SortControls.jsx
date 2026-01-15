/**
 * SortControls Component
 * 
 * Renders sort buttons for switching between Hits and Home Runs sorting
 */

export default function SortControls({ sortBy, onSortChange }) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onSortChange('hits')}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          sortBy === 'hits'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Sort by Hits
      </button>
      <button
        onClick={() => onSortChange('home_run')}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          sortBy === 'home_run'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Sort by Home Runs
      </button>
    </div>
  );
}

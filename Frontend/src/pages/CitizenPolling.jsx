import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart2, CheckCircle } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CitizenPolling = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Dummy polling data
  const poll = {
    id: 1,
    question: t('whichProjectPrioritize'),
    options: [
      { id: 'projectA', text: t('urbanGreeningProject'), votes: 120 },
      { id: 'projectB', text: t('wasteManagementSystem'), votes: 90 },
      { id: 'projectC', text: t('digitalLiteracyProgram'), votes: 75 },
    ],
  };

  const handleVote = (optionId) => {
    if (!hasVoted) {
      setSelectedOption(optionId);
      // In a real application, this would send the vote to the backend
      // and update the poll results from there.
      setHasVoted(true);
    }
  };

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  const chartData = {
    labels: poll.options.map(option => t(option.text)),
    datasets: [
      {
        label: t('votes'),
        data: poll.options.map(option => option.votes),
        backgroundColor: ['#4A90E2', '#50C878', '#F5A623'], // Use theme colors
        borderColor: ['#4A90E2', '#50C878', '#F5A623'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'top', 
        labels: { color: '#F8FAFC' } // Text color for chart legend
      },
      title: { 
        display: true, 
        text: t('votingResults'),
        color: '#F8FAFC' // Text color for chart title
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: '#CBD5E1' }, // Text color for X-axis labels
        grid: { color: '#334155' } // Grid line color
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#CBD5E1' }, // Text color for Y-axis labels
        grid: { color: '#334155' } // Grid line color
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-6">{t('citizenPolling')}</h1>

        <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-text mb-4">{poll.question}</h2>

          <div className="space-y-4 mb-8">
            {poll.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleVote(option.id)}
                disabled={hasVoted}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center justify-between ${selectedOption === option.id
                  ? 'bg-primary/20 border-primary text-primary shadow-lg'
                  : 'bg-gray-700 border-gray-600 text-lightText hover:bg-gray-700/80 hover:border-gray-500'}
                  ${hasVoted && 'cursor-not-allowed opacity-70'}`}
              >
                <span className="font-medium text-lg">{t(option.text)}</span>
                {hasVoted && <span className="text-lightText">{option.votes} {t('votes')}</span>}
                {selectedOption === option.id && <CheckCircle className="w-5 h-5 text-primary ml-4" />}
              </button>
            ))}
          </div>

          {hasVoted && ( // Show results after voting
            <div className="mt-8 bg-background p-4 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-text mb-4">{t('votingResults')}</h3>
              <div className="w-full">
                <Bar data={chartData} options={chartOptions} />
              </div>
              <p className="text-center text-sm text-lightText mt-4">{t('totalVotes')}: {totalVotes}</p>
            </div>
          )}

          {!hasVoted && (
            <p className="text-center text-sm text-lightText mt-4">{t('voteToSeeResults')}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default CitizenPolling;

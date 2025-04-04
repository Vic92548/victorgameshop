// components/StarGitHubButton.jsx
'use client';
import { useState, useEffect } from 'react';

export default function StarGitHubButton({
                                             repo = "Vic92548/victorgameshop",
                                             className = "bg-[#333] text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-[#444] transition-colors flex items-center gap-2"
                                         }) {
    const [stars, setStars] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchRepoData() {
            try {
                setLoading(true);
                const response = await fetch(`https://api.github.com/repos/${repo}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch repository data');
                }

                const data = await response.json();
                setStars(data.stargazers_count);
                setError(false);
            } catch (err) {
                console.error('Error fetching GitHub stars:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchRepoData();
    }, [repo]);

    return (
        <a
            href={`https://github.com/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            <span>Star us on GitHub</span>
            {loading ? (
                <span className="inline-block w-5 h-5 animate-pulse">⭐</span>
            ) : error ? (
                <span>⭐</span>
            ) : (
                <span className="flex items-center">
          <span className="mr-1">⭐</span>
          <span className="bg-[#222] px-1.5 py-0.5 rounded-md text-sm ml-1">
            {stars?.toLocaleString() || 0}
          </span>
        </span>
            )}
        </a>
    );
}

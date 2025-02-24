import React from 'react';

// Basic styles (optional, can be replaced with CSS modules, Tailwind, etc.)
const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    cardTitle: {
        fontSize: '18px',
        marginBottom: '10px',
    },
};

// Sample Analytics Dashboard component
export default function AnalyticsDashboard() {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Analytics Dashboard</h1>
            <div style={styles.grid}>
                {/* Sample Card 1: Visitors */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Total Visitors</h2>
                    <p>1,234</p>
                    <small>Last 30 days</small>
                </div>

                {/* Sample Card 2: Revenue */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Revenue</h2>
                    <p>$5,678</p>
                    <small>This month</small>
                </div>

                {/* Sample Card 3: Bounce Rate */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Bounce Rate</h2>
                    <p>42%</p>
                    <small>Average</small>
                </div>
            </div>
        </div>
    );
}


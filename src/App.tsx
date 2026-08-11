import { useState, useEffect } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import SessionSection from './components/SessionSection';
import HistorySection from './components/HistorySection';
import ClearHistoryModal from './components/ClearHistoryModal';
import Footer from './components/Footer';
import type { HistoryLog, Session, SessionType } from './types';
import { formatTime } from './utils/format';
import { loadHistory, saveHistory } from './utils/storage';
import { logAnalyticsEvent } from './lib/firebase';
import styles from './styles/App.module.css';

export default function App() {
  const [now, setNow] = useState<Date>(new Date());
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [historyLogs, setHistoryLogs] = useState<HistoryLog[]>(loadHistory);
  const [showClearModal, setShowClearModal] = useState<boolean>(false);

  // Track app load / session start
  useEffect(() => {
    logAnalyticsEvent('app_open', {
      initial_history_count: historyLogs.length,
    });
  }, [historyLogs.length]);

  // Update real-time clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Start a new session ('作業' or '休憩')
  const handleStartSession = (type: SessionType): void => {
    const startTime = Date.now();
    const startDate = new Date(startTime);
    const timeString = formatTime(startDate);

    logAnalyticsEvent('start_session', {
      session_type: type === '作業' ? 'work' : 'break',
      start_time_string: timeString,
    });

    setCurrentSession({
      type: type,
      startTime: startTime,
    });

    const newLog: HistoryLog = {
      id: startTime,
      timeString: timeString,
      type: type,
      timestamp: startTime,
    };

    const updatedLogs = [...historyLogs, newLog];
    setHistoryLogs(updatedLogs);
    saveHistory(updatedLogs);
  };

  // Stop current session
  const handleStopSession = (): void => {
    if (currentSession) {
      const elapsedSeconds = Math.max(
        0,
        Math.floor((Date.now() - currentSession.startTime) / 1000),
      );
      logAnalyticsEvent('stop_session', {
        session_type: currentSession.type === '作業' ? 'work' : 'break',
        duration_seconds: elapsedSeconds,
      });
    }
    setCurrentSession(null);
  };

  // Clear all history
  const handleConfirmClearHistory = (): void => {
    logAnalyticsEvent('clear_history', {
      cleared_logs_count: historyLogs.length,
    });
    setHistoryLogs([]);
    saveHistory([]);
    setShowClearModal(false);
  };

  return (
    <div className={styles.app}>
      <Background />

      {/* Main Container */}
      <div className={styles.container}>
        <Header now={now} />

        <SessionSection
          now={now}
          currentSession={currentSession}
          onStartSession={handleStartSession}
          onStopSession={handleStopSession}
        />

        <HistorySection
          historyLogs={historyLogs}
          onRequestClear={() => {
            logAnalyticsEvent('open_clear_history_modal');
            setShowClearModal(true);
          }}
        />

        {showClearModal && (
          <ClearHistoryModal
            onCancel={() => {
              logAnalyticsEvent('cancel_clear_history');
              setShowClearModal(false);
            }}
            onConfirm={handleConfirmClearHistory}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}

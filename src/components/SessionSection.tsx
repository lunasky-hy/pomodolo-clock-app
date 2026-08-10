import { Play, Coffee, Square } from "lucide-react";
import type { Session, SessionType } from "../types";
import { formatTime, pad } from "../utils/format";
import styles from "../styles/SessionSection.module.css";

interface SessionSectionProps {
  now: Date;
  currentSession: Session | null;
  onStartSession: (type: SessionType) => void;
  onStopSession: () => void;
}

// Calculate elapsed time from current session start
const getElapsedSeconds = (now: Date, session: Session | null): number => {
  if (!session || !session.startTime) return 0;
  return Math.max(0, Math.floor((now.getTime() - session.startTime) / 1000));
};

export default function SessionSection({
  now,
  currentSession,
  onStartSession,
  onStopSession,
}: SessionSectionProps) {
  const elapsedTotalSeconds = getElapsedSeconds(now, currentSession);
  const elapsedMinutes = Math.floor(elapsedTotalSeconds / 60);
  const elapsedSeconds = elapsedTotalSeconds % 60;

  // Clock takes on the running session's color; stays white while idle
  const clockToneClass =
    currentSession?.type === "作業"
      ? styles.clockWork
      : currentSession?.type === "休憩"
        ? styles.clockBreak
        : "";

  return (
    <main className={styles.main}>
      {/* Current Time Display (Wall Clock) */}
      <div className={styles.clock}>
        <p className={styles.clockLabel}>現在時刻</p>
        <div className={`${styles.clockTime} ${clockToneClass}`}>
          {formatTime(now)}
        </div>
      </div>

      {/* Session Status & Elapsed Time Banner */}
      <div className={styles.banner}>
        <div className={styles.statusRow}>
          {currentSession?.type === "作業" && (
            <span className={`${styles.badge} ${styles.badgeWork}`}>
              <span className={`${styles.dot} ${styles.dotWork}`}></span>
              <span>作業中</span>
            </span>
          )}
          {currentSession?.type === "休憩" && (
            <span className={`${styles.badge} ${styles.badgeBreak}`}>
              <span className={`${styles.dot} ${styles.dotBreak}`}></span>
              <span>休憩中</span>
            </span>
          )}
          {!currentSession && (
            <span className={`${styles.badge} ${styles.badgeIdle}`}>
              未開始
            </span>
          )}

          <span className={styles.statusText}>
            {currentSession?.type === "作業" && "作業セッション進行中"}
            {currentSession?.type === "休憩" && "休憩セッション進行中"}
            {!currentSession && "セッション待機中"}
          </span>
        </div>

        <div className={styles.elapsed}>
          {currentSession ? (
            <span>
              開始から
              <span className={styles.elapsedMinutes}>{elapsedMinutes}</span>分{" "}
              <span className={styles.elapsedSeconds}>
                ({pad(elapsedSeconds)}秒)
              </span>{" "}
              経過
            </span>
          ) : (
            <span className={styles.elapsedHint}>
              「作業開始」または「休憩開始」を押してください
            </span>
          )}
        </div>
      </div>

      {/* Session Control Buttons */}
      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => onStartSession("作業")}
          className={`${styles.button} ${styles.buttonStart} ${styles.work}`}
        >
          <Play size={16} fill="currentColor" />
          <span>作業開始</span>
        </button>

        <button
          type="button"
          onClick={() => onStartSession("休憩")}
          className={`${styles.button} ${styles.buttonStart} ${styles.break}`}
        >
          <Coffee size={16} />
          <span>休憩開始</span>
        </button>

        <button
          type="button"
          onClick={onStopSession}
          disabled={!currentSession}
          className={`${styles.button} ${styles.stop}`}
        >
          <Square size={16} />
          <span>停止</span>
        </button>
      </div>
    </main>
  );
}

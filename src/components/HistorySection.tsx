import { Trash2, History } from "lucide-react";
import type { HistoryLog } from "../types";
import styles from "../styles/HistorySection.module.css";

interface HistorySectionProps {
  historyLogs: HistoryLog[];
  onRequestClear: () => void;
}

export default function HistorySection({
  historyLogs,
  onRequestClear,
}: HistorySectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>
          <History size={16} className={styles.headingIcon} />
          <span>記録履歴（時刻順）</span>
        </h2>
        {historyLogs.length > 0 && (
          <button
            type="button"
            onClick={onRequestClear}
            className={styles.clearButton}
          >
            <Trash2 size={14} />
            <span>履歴消去</span>
          </button>
        )}
      </div>

      <div className={styles.list}>
        {historyLogs.length === 0 ? (
          <div className={styles.empty}>
            まだ履歴はありません。上のボタンを押すと記録が追加されます。
          </div>
        ) : (
          // Chronological display (oldest to newest)
          historyLogs
            .slice()
            .sort((a, b) => a.timestamp - b.timestamp)
            .map((log, index) => {
              const isWork = log.type === "作業";
              return (
                <div key={log.id} className={styles.item}>
                  <div className={styles.itemMain}>
                    <span className={styles.time}>{log.timeString}</span>
                    <span
                      className={`${styles.tag} ${
                        isWork ? styles.tagWork : styles.tagBreak
                      }`}
                    >
                      {isWork ? "作業開始" : "休憩開始"}
                    </span>
                  </div>
                  <span className={styles.index}>#{index + 1}</span>
                </div>
              );
            })
        )}
      </div>
    </section>
  );
}

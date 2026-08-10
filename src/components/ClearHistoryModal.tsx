import { AlertCircle } from "lucide-react";
import styles from "../styles/ClearHistoryModal.module.css";

interface ClearHistoryModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

// Custom Confirmation Modal (No browser alert/confirm used)
export default function ClearHistoryModal({
  onCancel,
  onConfirm,
}: ClearHistoryModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog} role="dialog" aria-modal="true">
        <div className={styles.icon}>
          <AlertCircle size={20} />
        </div>
        <h3 className={styles.title}>履歴を消去しますか？</h3>
        <p className={styles.description}>
          記録されたすべてのタイムスタンプが削除されます。
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={`${styles.button} ${styles.cancel}`}
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`${styles.button} ${styles.confirm}`}
          >
            消去する
          </button>
        </div>
      </div>
    </div>
  );
}

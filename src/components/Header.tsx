import { Clock, Calendar } from "lucide-react";
import { formatDate } from "../utils/format";
import styles from "../styles/Header.module.css";

interface HeaderProps {
  now: Date;
}

export default function Header({ now }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Clock size={20} className={styles.brandIcon} />
        <h1 className={styles.title}>Pomodolock - Pomodoro Focus Clock</h1>
      </div>
      <div className={styles.date}>
        <Calendar size={14} />
        <span>{formatDate(now)}</span>
      </div>
    </header>
  );
}

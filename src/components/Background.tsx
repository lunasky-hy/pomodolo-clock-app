import styles from "../styles/Background.module.css";

const PRIMARY_IMAGE =
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80";

// Background Image with dark dimming layer
export default function Background() {
  return (
    <div className={styles.backdrop}>
      <img
        src={PRIMARY_IMAGE}
        alt=""
        className={styles.image}
        onError={(e) => {
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
      />
      <div className={styles.dim}></div>
    </div>
  );
}

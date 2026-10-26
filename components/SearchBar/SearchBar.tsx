"use client";

import Image from "next/image";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const showClearButton = value.trim().length >= 3;

  return (
    <section className={styles.searchSection}>
      <form
        className={styles.searchBar}
        onSubmit={(event) => event.preventDefault()}
        role="search"
      >
        <input
          id="recipe-search"
          type="search"
          className={styles.input}
          placeholder="Rechercher une recette, un ingrédient..."
          aria-label="Rechercher une recette"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />

        <div className={styles.searchActions}>
          {showClearButton && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => onChange("")}
              aria-label="Effacer la recherche"
            >
              ×
            </button>
          )}

          <button
            type="submit"
            className={styles.button}
            aria-label="Rechercher"
          >
            <Image src="/images/Loop.png" alt="" width={42} height={42} />
          </button>
        </div>
      </form>
    </section>
  );
}

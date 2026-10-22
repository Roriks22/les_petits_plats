"use client";

import styles from "./SearchBar.module.css";
import Image from "next/image";

export default function SearchBar() {
  return (
    <section className={styles.searchSection}>
      <form
        className={styles.searchBar}
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          id="recipe-search"
          type="search"
          className={styles.input}
          placeholder="Rechercher une recette, un ingrédient..."
        />
        <button type="submit" className={styles.button}>
          <Image
            src="/images/Loop.png"
            alt="Loop de recherche"
            width={100}
            height={50}
          />
        </button>
      </form>
    </section>
  );
}

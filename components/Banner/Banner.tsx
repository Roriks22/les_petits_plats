import Link from "next/link";
import styles from "./Banner.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Image from "next/image";

export default function Banner() {
  return (
    <header className={styles.banner}>
      <Link href="/" className={styles.logo}>
        Les petits plats
        <Image
          src="/images/circle.png"
          alt="cercle titre"
          width={1200}
          height={500}
        />
      </Link>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          Découvrez nos recettes <br />
          du quotidien, simples et délicieuses
        </h1>
        <SearchBar />
      </div>
    </header>
  );
}

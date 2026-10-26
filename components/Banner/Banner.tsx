import Link from "next/link";
import styles from "./Banner.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Image from "next/image";

type BannerProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export default function Banner({ searchValue, onSearchChange }: BannerProps) {
  return (
    <header className={styles.banner}>
      <Link href="/" className={styles.logo}>
        Les petits plats
        <Image
          src="/images/circle.png"
          alt="Cercle décoratif"
          width={100}
          height={50}
        />
      </Link>

      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          Découvrez nos recettes <br />
          du quotidien, simples et délicieuses
        </h1>

        <SearchBar value={searchValue} onChange={onSearchChange} />
      </div>
    </header>
  );
}

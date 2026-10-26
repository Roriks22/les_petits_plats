import Link from "next/link";
import Image from "next/image";
import styles from "./not-found.module.css";
import Footer from "@/components/Footer/Footer";

export default function RecipeNotFound() {
  return (
    <>
      <main className={styles.container}>
        <Link href="/" className={styles.logo}>
          Les petits plats
          <Image
            src="/images/circle.png"
            alt="cercle titre"
            width={1200}
            height={500}
          />
        </Link>

        <p className={styles.code}>404 :(</p>
        <p className={styles.title}>
          La page que vous demandez est introuvable.
        </p>
      </main>
      <Footer />
    </>
  );
}

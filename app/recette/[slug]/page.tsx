import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import recipesData from "@/data/recipes.json";
import styles from "./page.module.css";
import Footer from "@/components/Footer/Footer";

type RecipePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;

  const recipe = recipesData.find((item) => item.slug === slug);

  if (!recipe) {
    notFound();
  }

  const imageSrc = recipe.image.startsWith("/")
    ? recipe.image
    : `/images/${recipe.image}`;

  return (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            Les petits plats
            <Image
              src="/images/circle.png"
              alt="cercle titre"
              width={1200}
              height={500}
            />
          </Link>
        </header>

        <article className={styles.recipe}>
          <div className={styles.imageContainer}>
            <Image
              src={imageSrc}
              alt={recipe.name}
              width={800}
              height={600}
              className={styles.image}
              priority
            />
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>{recipe.name}</h1>
            <h2 className={styles.title2}>Temps de préparation</h2>
            <div className={styles.informationItem}>
              <strong>{recipe.time} min</strong>
            </div>

            <section className={styles.section}>
              <h2 className={styles.title2}>Ingrédients</h2>
              <ul className={styles.ingredients}>
                {recipe.ingredients.map((item, index) => (
                  <li
                    key={`${item.ingredient}-${index}`}
                    className={styles.ingredient}
                  >
                    <span>{item.ingredient}</span>

                    {item.quantity !== undefined &&
                      item.quantity !== null &&
                      item.quantity !== "" && (
                        <span className={styles.quantity}>
                          {item.quantity}
                          {item.unit ? ` ${item.unit}` : ""}
                        </span>
                      )}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.title2}>Ustensiles</h2>

              <ul className={styles.ustensils}>
                {recipe.ustensils.map((ustensil) => (
                  <li key={ustensil}>{ustensil}</li>
                ))}
              </ul>
            </section>
            <section className={styles.section}>
              <h2 className={styles.title2}>Appareils nécessaires</h2>

              <ul className={styles.appliance}>
                <li>{recipe.appliance}</li>
              </ul>
            </section>
            <section className={styles.section}>
              <h2 className={styles.title2}>Recette</h2>

              <ul className={styles.description}>
                <li>{recipe.description}</li>
              </ul>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

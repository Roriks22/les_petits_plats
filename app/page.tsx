import Banner from "@/components/Banner/Banner";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import recipesData from "@/data/recipes.json";
import TagFilters from "@/components/TagFilters/TagFilters";
import styles from "./page.module.css";

export default function Home() {
  const recipes = recipesData;
  return (
    <>
      <Banner />

      <main className={styles.main}>
        <TagFilters />

        <section className={styles.recipes}>
          <h1 className={styles.title}>{recipes.length} recettes</h1>

          <div className={styles.grid}>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

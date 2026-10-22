import styles from "./RecipeCard.module.css";
import Image from "next/image";

export type Ingredient = {
  ingredient: string;
  quantity?: number | string | null;
  unit?: string;
  unite?: string;
};

export type Recipe = {
  id: number;
  name: string;
  image: string;
  time: number;
  description: string;
  ingredients: Ingredient[];
};

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const imageSrc = recipe.image.startsWith("/")
    ? recipe.image
    : `/images/${recipe.image}`;
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={recipe.name}
          className={styles.image}
          width={500}
          height={300}
        />
        <span className={styles.time}>{recipe.time} min</span>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{recipe.name}</h2>
        <h3 className={styles.subtitle}>Recette</h3>
        <p className={styles.description}>{recipe.description}</p>
        <h3 className={styles.subtitle}>Ingrédients</h3>
        <ul className={styles.ingredients}>
          {recipe.ingredients.map((item, index) => (
            <li key={`${recipe.id}-${item.ingredient}-${index}`}>
              <strong>{item.ingredient}</strong>
              {item.quantity !== undefined &&
                item.quantity !== null &&
                item.quantity !== "" && (
                  <span>
                    {item.quantity}
                    {(item.unit ?? item.unite)
                      ? ` ${item.unit ?? item.unite}`
                      : ""}
                  </span>
                )}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

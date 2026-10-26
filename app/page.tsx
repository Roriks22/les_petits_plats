"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/Banner/Banner";
import TagFilters, {
  type SelectedTag,
} from "@/components/TagFilters/TagFilters";
import RecipeCard, { type Recipe } from "@/components/RecipeCard/RecipeCard";
import recipesData from "@/data/recipes.json";
import styles from "./page.module.css";

const recipes: Recipe[] = recipesData;

function normalizeText(text: string): string {
  return text
    .toLocaleLowerCase("fr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Recherche principale : titre, description et ingrédients.
function recipeMatchesSearch(recipe: Recipe, search: string): boolean {
  const searchableText = [
    recipe.name,
    recipe.description,
    ...recipe.ingredients.map((item) => item.ingredient),
  ].join(" ");

  return normalizeText(searchableText).includes(search);
}

// Vérifie si une recette correspond à un tag sélectionné.
function recipeHasTag(recipe: Recipe, tag: SelectedTag): boolean {
  switch (tag.category) {
    case "Ingrédients":
      return recipe.ingredients.some(
        (item) => normalizeText(item.ingredient) === normalizeText(tag.value),
      );

    case "Appareils":
      return normalizeText(recipe.appliance) === normalizeText(tag.value);

    case "Ustensiles":
      return recipe.ustensils.some(
        (ustensil) => normalizeText(ustensil) === normalizeText(tag.value),
      );
  }
}

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>([]);

  // Actualise la recherche après une courte pause de frappe.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const normalizedSearch = normalizeText(debouncedSearch);

  // La recherche textuelle commence à partir de 3 caractères.
  const activeSearch = normalizedSearch.length >= 3 ? normalizedSearch : "";

  // Intersection de la recherche textuelle et de tous les tags.
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesText =
      !activeSearch || recipeMatchesSearch(recipe, activeSearch);

    const matchesTags = selectedTags.every((tag) => recipeHasTag(recipe, tag));

    return matchesText && matchesTags;
  });

  function handleSelectTag(tag: SelectedTag) {
    setSelectedTags((currentTags) => {
      const alreadySelected = currentTags.some(
        (currentTag) =>
          currentTag.category === tag.category &&
          normalizeText(currentTag.value) === normalizeText(tag.value),
      );

      if (alreadySelected) {
        return currentTags;
      }

      return [...currentTags, tag];
    });
  }

  function handleRemoveTag(tagToRemove: SelectedTag) {
    setSelectedTags((currentTags) =>
      currentTags.filter(
        (tag) =>
          !(
            tag.category === tagToRemove.category &&
            normalizeText(tag.value) === normalizeText(tagToRemove.value)
          ),
      ),
    );
  }

  const noResultsMessage =
    activeSearch && selectedTags.length === 0
      ? `Aucune recette ne contient « ${debouncedSearch.trim()} ». Vous pouvez essayer « tarte aux pommes », « poisson », etc.`
      : "Aucune recette ne correspond à votre recherche. Essayez d’autres mots ou retirez des filtres.";

  return (
    <>
      <Banner searchValue={searchInput} onSearchChange={setSearchInput} />

      <main className={styles.main}>
        <div className={styles.div}>
          <TagFilters
            recipes={filteredRecipes}
            selectedTags={selectedTags}
            onSelectTag={handleSelectTag}
            onRemoveTag={handleRemoveTag}
          />

          <h1 className={styles.title}>
            {filteredRecipes.length}{" "}
            {filteredRecipes.length > 1 ? "recettes" : "recette"}
          </h1>
        </div>

        <section
          className={styles.recipes}
          aria-label="Résultats des recettes"
          aria-live="polite"
        >
          {filteredRecipes.length > 0 ? (
            <div className={styles.grid}>
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <p className={styles.noResults} role="status">
              {noResultsMessage}
            </p>
          )}
        </section>
      </main>
    </>
  );
}

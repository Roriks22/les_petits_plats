"use client";

import { useState } from "react";
import type { Recipe } from "@/components/RecipeCard/RecipeCard";
import styles from "./TagFilters.module.css";

export type TagCategory = "Ingrédients" | "Appareils" | "Ustensiles";

export type SelectedTag = {
  category: TagCategory;
  value: string;
};

type TagFiltersProps = {
  recipes: Recipe[];
  selectedTags: SelectedTag[];
  onSelectTag: (tag: SelectedTag) => void;
  onRemoveTag: (tag: SelectedTag) => void;
};

const categories: TagCategory[] = ["Ingrédients", "Appareils", "Ustensiles"];

const categoryIds: Record<TagCategory, string> = {
  Ingrédients: "ingredients",
  Appareils: "appareils",
  Ustensiles: "ustensiles",
};

function normalizeText(text: string): string {
  return text
    .toLocaleLowerCase("fr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getTagValues(recipes: Recipe[], category: TagCategory): string[] {
  const values = recipes.flatMap((recipe) => {
    switch (category) {
      case "Ingrédients":
        return recipe.ingredients.map((item) => item.ingredient);

      case "Appareils":
        return [recipe.appliance];

      case "Ustensiles":
        return recipe.ustensils;
    }
  });

  return [...new Set(values.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "fr", { sensitivity: "base" }),
  );
}

export default function TagFilters({
  recipes,
  selectedTags,
  onSelectTag,
  onRemoveTag,
}: TagFiltersProps) {
  const [searches, setSearches] = useState<Record<TagCategory, string>>({
    Ingrédients: "",
    Appareils: "",
    Ustensiles: "",
  });

  const [openCategories, setOpenCategories] = useState<
    Record<TagCategory, boolean>
  >({
    Ingrédients: false,
    Appareils: false,
    Ustensiles: false,
  });

  function toggleCategory(category: TagCategory) {
    setOpenCategories((current) => ({
      ...current,
      [category]: !current[category],
    }));
  }

  function clearSearch(category: TagCategory) {
    setSearches((current) => ({
      ...current,
      [category]: "",
    }));
  }

  return (
    <section
      className={styles.filters}
      aria-label="Filtres de recettes par mots-clés"
    >
      <div className={styles.groups}>
        {categories.map((category) => {
          const categoryId = categoryIds[category];
          const isOpen = openCategories[category];
          const search = normalizeText(searches[category]);

          const categorySelectedTags = selectedTags.filter(
            (tag) => tag.category === category,
          );

          const availableTags = getTagValues(recipes, category).filter(
            (value) => {
              const alreadySelected = selectedTags.some(
                (tag) =>
                  tag.category === category &&
                  normalizeText(tag.value) === normalizeText(value),
              );

              return !alreadySelected && normalizeText(value).includes(search);
            },
          );

          return (
            <div className={styles.categoryContainer} key={category}>
              <div className={styles.group}>
                <button
                  type="button"
                  className={styles.groupHeader}
                  onClick={() => toggleCategory(category)}
                  aria-expanded={isOpen}
                  aria-controls={`options-${categoryId}`}
                >
                  <span>{category}</span>

                  <span
                    className={`${styles.arrow} ${
                      isOpen ? styles.arrowOpen : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    className={styles.dropdownContent}
                    id={`options-${categoryId}`}
                  >
                    <div className={styles.searchWrapper}>
                      <input
                        id={`search-${categoryId}`}
                        type="search"
                        className={styles.searchInput}
                        aria-label={`Rechercher parmi les ${category.toLowerCase()}`}
                        value={searches[category]}
                        onChange={(event) =>
                          setSearches((current) => ({
                            ...current,
                            [category]: event.target.value,
                          }))
                        }
                      />

                      {searches[category] && (
                        <button
                          type="button"
                          className={styles.clearButton}
                          onClick={() => clearSearch(category)}
                          aria-label={`Effacer la recherche ${category.toLowerCase()}`}
                        >
                          ×
                        </button>
                      )}

                      <span className={styles.searchIcon} aria-hidden="true" />
                    </div>

                    <div className={styles.options}>
                      {availableTags.length > 0 ? (
                        availableTags.map((value) => (
                          <button
                            key={`${category}-${value}`}
                            type="button"
                            className={styles.option}
                            onClick={() => {
                              onSelectTag({ category, value });
                              clearSearch(category);
                            }}
                          >
                            {value}
                          </button>
                        ))
                      ) : (
                        <p className={styles.empty}>
                          Aucun mot-clé disponible.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {categorySelectedTags.length > 0 && (
                <div
                  className={styles.selectedTags}
                  aria-label={`Mots-clés sélectionnés : ${category}`}
                >
                  {categorySelectedTags.map((tag) => (
                    <button
                      key={`${tag.category}-${tag.value}`}
                      type="button"
                      className={styles.selectedTag}
                      onClick={() => onRemoveTag(tag)}
                      aria-label={`Retirer le tag ${tag.value}`}
                    >
                      <span>{tag.value}</span>

                      <span
                        aria-hidden="true"
                        className={styles.selectedTagCross}
                      >
                        ×
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

import styles from "./TagFilters.module.css";

type FilterGroup = {
  name: string;
  options: string[];
};

const filters: FilterGroup[] = [
  {
    name: "Ingrédients",
    options: ["Poulet", "Saumon", "Riz"],
  },
  {
    name: "Appareils",
    options: ["Four", "Poêle", "Casserole"],
  },
  {
    name: "Ustensiles",
    options: ["Couteau", "Fouet", "Cuillère"],
  },
];

export default function TagFilters() {
  return (
    <section className={styles.filters} aria-label="Filtres de recettes">
      {filters.map((filter) => (
        <div className={styles.group} key={filter.name}>
          <select
            id={`filter-${filter.name}`}
            className={styles.select}
            defaultValue=""
          >
            <option value="" disabled>
              {filter.name}
            </option>
            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </section>
  );
}

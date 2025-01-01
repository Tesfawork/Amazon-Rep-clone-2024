/** @format */

import { categoryInfos } from "./CategoryFullInfos";
import style from "./Category.module.css";
import CategoryCard from "./CategoryCard";

function Category() {
  return (
    <section className={style.category_container}>
      {categoryInfos.map((infos) => (
        // Return each `CategoryCard` inside the map function
        <CategoryCard data={infos} key={infos.name} />
      ))}
    </section>
  );
}

export default Category;

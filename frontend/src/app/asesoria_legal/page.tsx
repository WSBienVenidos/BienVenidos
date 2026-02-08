import CategoryTemplate from "../_shared/category_components/CategoryTemplate";
import { CATEGORY_MAP, RESOURCES_BY_CATEGORY } from "../_shared/category_data";

export default function CategoryPage() {
  const category = CATEGORY_MAP["asesoria_legal"];
  const resources = RESOURCES_BY_CATEGORY["asesoria_legal"] ?? [];

  return <CategoryTemplate category={category} resources={resources} />;
}

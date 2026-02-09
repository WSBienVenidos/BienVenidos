import CategoryTemplate from "../_shared/category_components/CategoryTemplate";
import { CATEGORY_MAP, RESOURCES_BY_CATEGORY } from "../_shared/category_data";

export default function CategoryPage() {
  const category = CATEGORY_MAP["vivienda"];
  const resources = RESOURCES_BY_CATEGORY["vivienda"] ?? [];

  return <CategoryTemplate category={category} resources={resources} />;
}

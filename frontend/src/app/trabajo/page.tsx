import CategoryTemplate from "../_shared/category_components/CategoryTemplate";
import { CATEGORY_MAP, RESOURCES_BY_CATEGORY } from "../_shared/category_data";

export default function CategoryPage() {
  const category = CATEGORY_MAP["trabajo"];
  const resources = RESOURCES_BY_CATEGORY["trabajo"] ?? [];

  return <CategoryTemplate category={category} resources={resources} />;
}

import CategoryTemplate from "../_shared/category_components/CategoryTemplate";
import { CATEGORY_MAP, RESOURCES_BY_CATEGORY } from "../_shared/category_data";

export default function CategoryPage() {
  const category = CATEGORY_MAP["iglesia"];
  const resources = RESOURCES_BY_CATEGORY["iglesia"] ?? [];

  return <CategoryTemplate category={category} resources={resources} />;
}

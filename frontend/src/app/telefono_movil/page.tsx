import CategoryTemplate from "../_shared/category_components/CategoryTemplate";
import { CATEGORY_MAP, RESOURCES_BY_CATEGORY } from "../_shared/category_data";

export default function CategoryPage() {
  const category = CATEGORY_MAP["telefono_movil"];
  const resources = RESOURCES_BY_CATEGORY["telefono_movil"] ?? [];

  return <CategoryTemplate category={category} resources={resources} />;
}

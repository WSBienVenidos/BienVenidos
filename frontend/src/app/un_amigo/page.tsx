import CategoryTemplate from "../_shared/category_components/CategoryTemplate";
import { CATEGORY_MAP, RESOURCES_BY_CATEGORY } from "../_shared/category_data";

export default function CategoryPage() {
  const category = CATEGORY_MAP["un_amigo"];
  const resources = RESOURCES_BY_CATEGORY["un_amigo"] ?? [];

  return <CategoryTemplate category={category} resources={resources} />;
}

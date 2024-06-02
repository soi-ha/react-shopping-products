import { FILTER_CATEGORIES, SORT_PRICE } from "@constants/rules";
import * as PLH from "./ProductListHeader.style";

interface ProductListHeaderProps {
  handleCategory: (category: Category) => void;
  handleSort: (sort: Sort) => void;
}

const ProductListHeader = ({
  handleCategory,
  handleSort,
}: ProductListHeaderProps) => {
  return (
    <PLH.Header>
      <PLH.Title>bpple 상품 목록</PLH.Title>
      <PLH.SelectBoxGroup>
        <PLH.SelectBox
          name=""
          id=""
          onChange={(e) => handleCategory(e.target.value as Category)}
        >
          {Object.entries(FILTER_CATEGORIES).map(([key, value]) => (
            <option value={key} key={key}>
              {value}
            </option>
          ))}
        </PLH.SelectBox>
        <PLH.SelectBox
          name=""
          id=""
          onChange={(e) => handleSort(e.target.value as Sort)}
        >
          {Object.entries(SORT_PRICE).map(([key, value]) => (
            <option value={key} key={key}>
              {value}
            </option>
          ))}
        </PLH.SelectBox>
      </PLH.SelectBoxGroup>
    </PLH.Header>
  );
};

export default ProductListHeader;

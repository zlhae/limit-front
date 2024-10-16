// 부모 컴포넌트에서
import React, { useState } from 'react';
import SideFilter from './SideFilter';
import ProductListWrap from './ProductListWrap';

const ParentComponent = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <div>
      <SideFilter setSelectedCategories={setSelectedCategories} />
      <ProductListWrap category={selectedCategories} />
    </div>
  );
};

export default ParentComponent;

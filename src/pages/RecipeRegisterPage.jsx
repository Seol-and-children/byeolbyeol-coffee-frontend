import React, { useState } from "react";

import PhotoUpload from "../components/common/PhotoUpload";
import TextInput from "../components/common/TextInput";
import Dropdown from "../components/common/Dropdown";
import TextArea from "../components/common/TextArea";
import RadioButtons from "../components/common/RadioButtons";
import CheckBoxes from "../components/common/CheckBoxes";
import FormButton from "../components/common/FormButton";

function RecipeRegisterPage() {
  const [photo, setPhoto] = useState(null);

  const [selectedCafe, setSelectedCafe] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // 카페 선택 드롭다운 핸들러
  const handleCafeChange = (event) => {
    setSelectedCafe(event.target.value);
  };

  // 사이즈 선택 드롭다운 핸들러
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <PhotoUpload onPhotoSelect={setPhoto} />
      <TextInput placeholder="Menu Name" />
      <select value={selectedCafe} onChange={handleCafeChange}>
        <option value="">카페 선택</option>
        <option value="스타벅스">스타벅스</option>
        <option value="투썸플레이스">투썸플레이스</option>
        <option value="이디야">이디야</option>
        <option value="할리스">할리스</option>
        <option value="커피빈">커피빈</option>
        <option value="빽다방">빽다방</option>
        <option value="탐앤탐스">탐앤탐스</option>
      </select>
      <TextArea placeholder="Menu Description" />
      {/* 베이스 음료 사이즈 선택 드롭다운 */}
      <select value={selectedSize} onChange={handleSizeChange}>
        <option value="">사이즈 선택</option>
        <option value="스몰">스몰</option>
        <option value="미디엄">미디엄</option>
        <option value="라지">라지</option>
        <option value="엑스트라 라지">엑스트라 라지</option>
        {/* 필요에 따라 추가 사이즈 옵션 추가 */}
      </select>
      <RadioButtons options={["Hot", "Ice"]} /* ... */ />
      <FormButton label="Cancel" /* ... */ />
      <FormButton label="Submit" type="submit" />
    </form>
  );
}

export default RecipeRegisterPage;

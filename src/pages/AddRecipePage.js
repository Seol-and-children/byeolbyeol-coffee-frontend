import React, { useState } from "react";
import axios from "axios";
import "./AddRecipePage.css";

function AddRecipePage() {
  // 상태 관리
  const [recipeName, setRecipeName] = useState("");
  const [franchiseCafe, setFranchiseCafe] = useState("");
  const [description, setDescription] = useState("");
  const [baseBeverage, setBaseBeverage] = useState("");
  const [beverageSize, setBeverageSize] = useState("");
  const [beverageTemperature, setBeverageTemperature] = useState("");
  const [customOptions, setCustomOptions] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);

  const handleImageChange = (e) => {
    setRecipeImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeDto = {
      recipeName,
      description,
      franchiseId: franchiseCafe,
      baseBeverageVO: {
        name: baseBeverage,
        size: beverageSize,
        temperature: beverageTemperature,
      },
      customOptionId: customOptions,
      authorId: "082a2e9c-8779-11ee-ae8d-201a06c67abc", // 예시 ID, 실제 애플리케이션에서는 동적으로 설정 필요
    };

    const formData = new FormData();
    formData.append("recipeImage", recipeImage);
    formData.append(
      "recipeDto",
      new Blob([JSON.stringify(recipeDto)], { type: "application/json" })
    );

    try {
      const response = await axios.post(
        "http://localhost:8080/recipes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // 여기서 후속 처리 (예: 페이지 리디렉션)
    } catch (error) {
      console.error("레시피 등록 실패", error);
    }
  };

  return (
    <div className="add-recipe-page">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="레시피 이름"
        />
        <input
          type="text"
          value={franchiseCafe}
          onChange={(e) => setFranchiseCafe(e.target.value)}
          placeholder="프랜차이즈 카페"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="메뉴 설명"
        />
        <input
          type="text"
          value={baseBeverage}
          onChange={(e) => setBaseBeverage(e.target.value)}
          placeholder="베이스 음료 이름"
        />
        <input
          type="text"
          value={beverageSize}
          onChange={(e) => setBeverageSize(e.target.value)}
          placeholder="베이스 음료 사이즈"
        />
        <select
          value={beverageTemperature}
          onChange={(e) => setBeverageTemperature(e.target.value)}
        >
          <option value="HOT">HOT</option>
          <option value="ICE">ICE</option>
        </select>
        <input
          type="text"
          value={customOptions}
          onChange={(e) => setCustomOptions(e.target.value)}
          placeholder="커스텀 옵션"
        />
        <button type="submit">등록하기</button>
        <button
          type="button"
          onClick={() => {
            /* 여기서 취소 로직 처리 */
          }}
        >
          취소하기
        </button>
      </form>
    </div>
  );
}

export default AddRecipePage;

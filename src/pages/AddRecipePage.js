import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./AddRecipePage.css";
import { useSelector } from "react-redux";
import ImgAddIcon from "../assets/ImgAdd.svg";
import DeleteIcon from "../assets/DeleteIcon.svg";
import CustomAddIcon from "../assets/CustomAddIcon.png";

function AddRecipePage() {
  // 상태 관리
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [baseBeverage, setBaseBeverage] = useState("");
  const [beverageSize, setBeverageSize] = useState("");
  const [beverageTemperature, setBeverageTemperature] = useState("HOT");
  const [recipeImage, setRecipeImage] = useState(null);
  const [franchiseCafeList, setfranchiseCafeList] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [customOptions, setCustomOptions] = useState([
    { customOptionName: "", quantity: "" },
  ]);
  const [ingredientList, setIngredientList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef();
  const user = useSelector((state) => state.user.userData);

  const navigate = useNavigate();

  useEffect(() => {
    // 프랜차이즈 정보를 가져오는 함수
    const fetchfranchiseCafeList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/option/franchises"
        );
        const activeFranchises = response.data.filter(
          (franchise) => franchise.processing // 활성화 되어있는 프랜차이즈만 가져오기
        );
        setfranchiseCafeList(activeFranchises);
      } catch (error) {
        console.error("프랜차이즈 정보를 가져오는데 실패했습니다:", error);
      }
    };

    // 기본 제공 재료 정보 가져오는 함수
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/option/ingredients"
        );
        const activeIngredients = response.data.filter(
          (ingredient) => ingredient.processing
        );
        setIngredientList(activeIngredients);
      } catch (error) {
        console.error("기본 제공 재료 정보를 가져오는데 실패했습니다:", error);
      }
    };

    console.log("Beverage Temperature Changed:", beverageTemperature);

    fetchfranchiseCafeList();
    fetchIngredients();
  }, [beverageTemperature]);

  // 커스텀 옵션 추가 처리 함수
  const addCustomOption = () => {
    setCustomOptions([
      ...customOptions,
      { customOptionName: "", quantity: "" },
    ]);
  };

  // 커스텀 옵션 제거 처리 함수
  const removeCustomOption = (index) => {
    const newCustomOptions = customOptions.filter((_, i) => i !== index);
    setCustomOptions(newCustomOptions);
  };

  // 커스텀 옵션 변경 처리 함수
  const handleCustomOptionChange = (index, field, value) => {
    const newCustomOptions = customOptions.map((option, i) => {
      if (i === index) {
        return { ...option, [field]: value };
      }
      return option;
    });
    setCustomOptions(newCustomOptions);
  };

  const handleIngredientSelect = (index, selectedIngredient) => {
    const ingredient = ingredientList.find(
      (ing) => ing.ingredientName === selectedIngredient.value
    );
    const newCustomOptions = customOptions.map((option, i) => {
      if (i === index) {
        return {
          ...option,
          customOptionName: ingredient.ingredientName, // 이름을 기본값으로 설정
          quantity: ingredient.ingredientUnit, // 단위를 기본값으로 설정
        };
      }
      return option;
    });
    setCustomOptions(newCustomOptions);
  };

  const handleFranchiseChange = (selectedOption) => {
    setSelectedFranchise(selectedOption);
  };

  const handleImageChange = (e) => {
    setRecipeImage(e.target.files[0]);

    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const cancelImageUpload = () => {
    setRecipeImage(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      width: "490px",
      height: "42px",
      backgroundColor: "#f9f9f9",
      borderColor: "#a0a0a0",
      fontSize: "1rem",
      fontWeight: "500",
      borderRadius: "2px",
      cursor: "pointer",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "40px",
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
    }),
    menu: (styles) => ({
      ...styles,
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = user ? user.userId : null;
    const recipeDto = {
      recipeName,
      description,
      franchiseId: selectedFranchise ? selectedFranchise.value : null,
      baseBeverageVO: {
        name: baseBeverage,
        size: beverageSize,
        temperature: beverageTemperature,
      },
      authorId: userId,
      customOptions: customOptions,
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
      alert("레시피가 등록되었습니다!");
      navigate("/recipes");
    } catch (error) {
      console.error("레시피 등록 실패", error);
      alert("레시피 등록에 실패하였습니다.");
      navigate("/recipes");
    }
  };

  const handleCancel = () => {
    navigate("/recipes");
  };

  const handleTemperatureChange = (temp) => {
    setBeverageTemperature(temp);
  };

  // 커스텀 옵션 입력 필드 렌더링
  const customOptionInputs = customOptions.map((option, index) => (
    <div key={index} className="custom-option-container">
      <Select
        className="custom-option-select-container"
        value={option.customOptionName}
        onChange={(selectedOption) =>
          handleIngredientSelect(index, selectedOption)
        }
        options={ingredientList.map((ingredient) => ({
          value: ingredient.ingredientName,
          label: ingredient.ingredientName,
        }))}
        placeholder="옵션 선택"
        isClearable
        isSearchable
      />
      <div className="custom-option-inputs-container">
        <input
          className="custom-option-name-input"
          type="text"
          value={option.customOptionName}
          onChange={(e) =>
            handleCustomOptionChange(index, "customOptionName", e.target.value)
          }
          placeholder="옵션 이름"
        />
        <input
          className="custom-option-quantity-input"
          type="text"
          value={option.quantity}
          onChange={(e) =>
            handleCustomOptionChange(index, "quantity", e.target.value)
          }
          placeholder="수량"
        />
        <button
          className="custom-option-delete"
          type="button"
          onClick={() => removeCustomOption(index)}
        >
          <img src={DeleteIcon} alt="삭제"></img>
        </button>
      </div>
    </div>
  ));

  return (
    <div className="add-recipe-page">
      <div className="recipe-add-header">레시피 등록</div>
      <form onSubmit={handleSubmit}>
        <div className="recipe-info-section">
          <input
            ref={fileInputRef}
            className="img-add-area"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          <div
            className="image-upload-box"
            onClick={previewImage ? null : triggerFileInput}
          >
            {previewImage ? (
              <>
                <img
                  src={previewImage}
                  alt="이미지"
                  className="image-preview"
                />
                <button
                  type="button"
                  onClick={cancelImageUpload}
                  className="cancel-upload-btn"
                >
                  <img src={DeleteIcon} alt="삭제"></img>
                </button>
              </>
            ) : (
              <img src={ImgAddIcon} alt="사진 업로드" />
            )}
          </div>
          <div className="contents-add-area">
            <input
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="메뉴 이름"
            />
            <Select
              value={selectedFranchise}
              onChange={handleFranchiseChange}
              options={franchiseCafeList.map((franchise) => ({
                value: franchise.franchiseId,
                label: franchise.franchiseName,
              }))}
              styles={customStyles}
              classNamePrefix="react-select"
              placeholder="카페 선택"
              isClearable
              isSearchable
            />
            <textarea
              className="contents-add-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="메뉴 설명"
            />
          </div>
        </div>
        <div className="base-beverage-section">
          <div className="recipe-add-header">베이스 음료</div>
          <div className="base-beverage-input">
            <input
              className="base-name"
              type="text"
              value={baseBeverage}
              onChange={(e) => setBaseBeverage(e.target.value)}
              placeholder="베이스 음료 이름"
            />
            <input
              className="base-size"
              type="text"
              value={beverageSize}
              onChange={(e) => setBeverageSize(e.target.value)}
              placeholder="베이스 음료 사이즈"
            />
          </div>
          <div className="base-temperature-toggle">
            <button
              type="button"
              className={`temperature-btn hot ${
                beverageTemperature === "HOT" ? "selected" : ""
              }`}
              onClick={() => handleTemperatureChange("HOT")}
            >
              HOT
            </button>
            <button
              type="button"
              className={`temperature-btn ice ${
                beverageTemperature === "ICE" ? "selected" : ""
              }`}
              onClick={() => handleTemperatureChange("ICE")}
            >
              ICE
            </button>
          </div>
        </div>
        <div className="custom-option-section">
          <div className="recipe-add-header">커스텀 옵션</div>
          {customOptionInputs}
          <div className="custom-add-button-container">
            <button
              className="custom-add-button"
              type="button"
              onClick={addCustomOption}
            >
              <img src={CustomAddIcon} alt="추가"></img> 추가
            </button>
          </div>
        </div>
        <div className="add-recipe-buttons">
          <button
            className="add-recipe-cancel"
            type="button"
            onClick={handleCancel}
          >
            취소하기
          </button>
          <button className="add-recipe-submit" type="submit">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipePage;

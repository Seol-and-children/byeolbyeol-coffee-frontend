import React, { useState } from "react";
import axios from "axios";

function UserProfile() {
  const [bio, setBio] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/user/bio", { bio });
      console.log(response.data);
      alert("자기소개가 업데이트되었습니다.");
    } catch (error) {
      console.error("자기소개 업데이트 실패", error);
      alert("자기소개를 업데이트하는 데 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="자기소개를 작성해주세요"
      />
      <button type="submit">저장</button>
    </form>
  );
}

export default UserProfile;

async function searchDomain() {
  const input = document.getElementById("domainSearchInput");
  const domain = input.value.trim();
  const resultElem = document.getElementById("searchResult");

  console.log("📦 전송할 도메인:", domain);

  if (!domain) {
    resultElem.textContent = "도메인을 입력해주세요!";
    return;
  }

  resultElem.textContent = "검색 중...";

  try {
    const res = await fetch("https://aiarena.zone/namingzone/check.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: domain }) // 명시적으로 넣기!
    });

    const text = await res.text();
    console.log("📨 응답 내용:", text);

    const data = JSON.parse(text);

    if (data.status === "SUCCESS" && data.available) {
      resultElem.innerHTML = `<strong>${domain}</strong> <span style="color:green;">사용 가능! ✅</span>`;
    } else if (data.status === "SUCCESS" && data.available === false) {
      resultElem.innerHTML = `<strong>${domain}</strong> <span style="color:red;">이미 등록됨 ❌</span>`;
    } else {
      resultElem.innerHTML = "⚠️ 응답 실패: " + (data.message || "알 수 없는 오류");
    }
  } catch (err) {
    resultElem.textContent = "❌ 요청 중 오류 발생!";
    console.error("도메인 검색 에러:", err);
  }
}

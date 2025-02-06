async function readData() {
    try {
        const response = await fetch("/database"); // 서버에서 데이터 가져오기
        if (!response.ok) {
            throw new Error("데이터 로드 실패");
        }

        const data = await response.json(); // JSON 파싱
        console.log(data);

        const target = document.querySelector("#orderItems");
        target.innerHTML = `
      <p><strong>이름:</strong> ${data.name}</p>
      <p><strong>수량:</strong> ${data.quantity}</p>
    `;
    } catch (error) {
        // 에러 처리: 오류 메시지를 콘솔에 출력하거나 UI에 표시
        console.error("오류 발생:", error);
        const target = document.querySelector("#orderItems");
        target.innerHTML = `<p>데이터를 불러오는 중 오류가 발생했습니다.</p>`;
    }
}

readData();

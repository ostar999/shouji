document
  .getElementById("surveyForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // 防止表单默认提交行为

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const feedback = document.getElementById("feedback").value.trim();

    // 基本表单验证
    if (!name || !email || !feedback) {
      alert("请填写所有字段！");
      return;
    }

    try {
      // 发送请求
      const response = await fetch(
        "http://8.134.154.214:3000/api/submit-survey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // 发送 JSON 数据
          },
          body: JSON.stringify({ name, email, feedback }), // 将表单数据转换成 JSON 格式
        }
      );

      // 处理响应
      if (!response.ok) {
        throw new Error("网络错误，无法提交表单。");
      }

      const result = await response.json();
      if (result.message) {
        alert(result.message); // 显示后台返回的消息
      } else {
        alert("提交成功！");
      }
    } catch (error) {
      console.error("错误:", error);
      alert("提交失败，请重试。");
    }
  });

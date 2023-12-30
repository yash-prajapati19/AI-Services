export const fetchResponse = async (chat) => {
  try {
    const state = JSON.parse(localStorage.getItem("state")) || {};
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: chat.map((message) => message.message).join("\n"),
        state: state,
      }),
    });

    const data = await response.json();

    localStorage.setItem("state", JSON.stringify(data.state));

    if (data.state.city) {
      localStorage.setItem("city", data.state.city);
    }

    // window.addEventListener("beforeunload", function (e) {
    //   localStorage.clear();
    // });

    return data;
  } catch (error) {
    console.log(error);
  }
};

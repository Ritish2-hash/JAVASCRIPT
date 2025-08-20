console.log("Axios loaded ");

let todoForm = document.querySelector("#todoForm");
let todoInput = document.querySelector("#todoInput");

todoForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let todoValue = todoInput.value;

    try {
        let response = await axios.post("/todo", { todo: todoValue });
        console.log("Server response:", response.data);

        alert(response.data.message); // show success message
        todoInput.value = ""; // clear input
    } catch (err) {
        console.error("Error:", err);
        alert("Failed to send todo ❌");
    }
});

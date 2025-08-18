let todoform = document.querySelector("#todoform");

todoform.addEventListener("submit", async function (ev) {
    ev.preventDefault();

    let todoValue = document.querySelector("#todo").value;

    let data = {
        todo: todoValue
    };

// ---------------------------------------------- Reusable block of code---------------------------
        // const response = await fetch("/todos", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        // });



        // const serverData = await response.json();
// ----------------------------------------------------------------------------------------------------
        let serverData = await sendRequest("/todo" , data);
if(serverData.success)
        {
            alert(serverData.message)
        }
        else{
            alert("Something went wrong");
        }
        console.log(serverData);

        todoform.reset();

});


async function sendRequest(endPoint , data)
{
            const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });



        const serverData = await response.json();

}
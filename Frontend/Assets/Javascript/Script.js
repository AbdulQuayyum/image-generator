function onSubmit(e) {
    e.preventDefault();

    document.querySelector(".error-message").textContent = "";
    document.querySelector("#image").src = "";

    const prompt = document.querySelector("#prompt").value;
    const size = document.querySelector("#size").value;

    if (prompt === "") {
        alert("Input field should not be empty.");
        return;
    }

    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
    try {
        addSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt,
              size,
            }),
          });

        if (!response.ok) {
            removeSpinner()
            throw new Error("Sorry, That image could not be generated.");
        }

        const data = await response.json();
        // console.log(data)

        const imageUrl = data.data;

        document.querySelector("#image").src = imageUrl;
        
        removeSpinner();
    } catch (error) {
        document.querySelector(".error-message").textContent = error
    }
}

function addSpinner() {
    document.querySelector(".spinner").classList.add("show")
}

function removeSpinner() {
    document.querySelector(".spinner").classList.remove("show")
}

document.querySelector("#img-form").addEventListener("submit", onSubmit)
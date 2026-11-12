const navToggle = document.querySelector("#navToggle");
const nav = document.querySelector("nav");

navToggle.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
});

const yearSpan = document.querySelector("#year");
yearSpan.textContent = new Date().getFullYear();

const skillsCard = document.querySelectorAll(".skill-card");
skillsCard.forEach((card) => {
    card.addEventListener("click", () =>{
        card.classList.toggle("selected");
    });
});

document.addEventListener("click", (e) => {
    const clickedInsideNav = nav.contains(e.target);
    const clickedToggle = navToggle.contains(e.target);

    if(!clickedInsideNav && !clickedToggle && nav.classList.contains("nav-open")){
        nav.classList.remove("nav-open")
    }
});

async function loadProjects(){
    const container = document.querySelector("#projectsContainer");
    try {
        const response = await fetch ("https:/api.github.com/users/lukajohn70/repos");
        const repos = await response.json();

        container.innerHTML = "";

        repos.forEach((repo) => {
            const card = document.createElement("div");
            card.className = "project-card";

            const title = document.createElement("h3");
            title.textContent = repo.name;

            const description = document.createElement("p");
            description.textContent = repo.description ||"No Description provided";

            const link = document.createElement("a");
            link.href = repo.html_url;
            link.textContent = "View on GitHub";
            link.target = "_blank";

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(link);
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = "<p>Couldn't load projects right now. Please, try again later.</p>";
        console.error(error);
    }
}

loadProjects();
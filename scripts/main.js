const allCardContainer = document.getElementById("all-card");
const issueCount = document.getElementById("issue-count");

const allTab = document.getElementById("allTab");
const openTab = document.getElementById("openTab");
const closedTab = document.getElementById("closedTab");

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

let allIssues = [];

// fetch all issues
async function loadIssues() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();

  allIssues = data.data || data;
  renderIssues(allIssues);
}

// search issues
async function searchIssues(text) {

  if (!text) {
    renderIssues(allIssues);
    return;
  }

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
  );

  const data = await res.json();

  const results = data.data || data;

  renderIssues(results);
}

function renderIssues(issues) {
  allCardContainer.innerHTML = "";

  issueCount.textContent = issues.length;

  issues.forEach((issue) => {
    const status = issue.status?.toLowerCase();
    const priority = issue.priority?.toLowerCase();

    let borderColor = "#00A96E";
    let statusIcon = "./assets/Open-Status.png";

    if (status === "closed") {
      borderColor = "#A855F7";
      statusIcon = "./assets/Closed-Status.png";
    }

    let priorityBg = "#FEECEC";
    let priorityText = "#EF4444";

    if (priority === "medium") {
      priorityBg = "#FFF6D1";
      priorityText = "#F59E0B";
    }

    if (priority === "low") {
      priorityBg = "#EEEFF2";
      priorityText = "#9CA3AF";
    }

    const labels = issue.labels || [];

    const label1 = labels[0] || "";
    const label2 = labels[1] || "";

    const card = document.createElement("div");

    card.className =
      "shadow-md p-3 rounded-lg space-y-4 border-t-4 hover:shadow-lg transition";

    card.style.borderTopColor = borderColor;

    card.innerHTML = `
        <div class="flex justify-between items-center">
          <img class="h-7" src="${statusIcon}">
          <p class="font-bold px-4 rounded-full py-1" 
          style="background:${priorityBg}; color:${priorityText}">
          ${priority.toUpperCase()}
          </p>
        </div>

        <h2 class="font-bold text-gray-700">${issue.title}</h2>

        <p class="text-xs font-medium text-gray-500 line-clamp-2">
        ${issue.description || ""}
        </p>

        <div class="flex justify-between items-center">

          ${
            label1
              ? `<p class="text-[10px] font-medium flex items-center gap-1 bg-[#FEECEC] px-2 rounded-full py-1 text-[#EF4444]">
              <img src="./assets/BugDroid.png">
              ${label1.toUpperCase()}
              </p>`
              : ""
          }

          ${
            label2
              ? `<p class="text-[10px] font-medium flex items-center gap-1 bg-[#FDE68A] px-2 rounded-full py-1 text-[#D97706]">
              <i class="fa-solid fa-life-ring"></i>
              ${label2.toUpperCase()}
              </p>`
              : ""
          }

        </div>

        <hr>

        <div class="text-sm font-medium text-gray-500">
          <p>#${issue.id || ""} by ${issue.author || "unknown"}</p>
          <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>
    `;

    allCardContainer.appendChild(card);
  });
}

// tab active style
function setActiveTab(activeBtn) {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("bg-[#4A00FF]", "text-white");
    btn.classList.add("border", "border-gray-300");
  });

  activeBtn.classList.add("bg-[#4A00FF]", "text-white");
}

// tab events
allTab.addEventListener("click", () => {
  setActiveTab(allTab);
  renderIssues(allIssues);
});

openTab.addEventListener("click", () => {
  setActiveTab(openTab);

  const openIssues = allIssues.filter(
    (issue) => issue.status.toLowerCase() === "open"
  );

  renderIssues(openIssues);
});

closedTab.addEventListener("click", () => {
  setActiveTab(closedTab);

  const closedIssues = allIssues.filter(
    (issue) => issue.status.toLowerCase() === "closed"
  );

  renderIssues(closedIssues);
});

// search button click
searchButton.addEventListener("click", () => {
  const text = searchInput.value.trim();
  searchIssues(text);
});

// search enter press
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const text = searchInput.value.trim();
    searchIssues(text);
  }
});

// load issues
loadIssues();
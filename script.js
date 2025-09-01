const form = document.getElementById("test");
const btn = document.getElementById("calculate-score");
const box = document.getElementById("score-display");
const scoreEl = document.getElementById("score");

async function loadQuestions() {
	const res = await fetch("questions.txt");
	const text = await res.text();
	const questions = text
		.split("\n")
		.map((q) => q.trim())
		.filter(Boolean);

	questions.forEach((q, i) => {
		const label = document.createElement("label");
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = `q${i + 1}`;

		label.appendChild(checkbox);
		label.append(` ${q}`);
		form.appendChild(label);
		form.appendChild(document.createElement("br"));
	});
}

function calculateScore() {
	const total = form.querySelectorAll("input[type=checkbox]").length;
	const checked = form.querySelectorAll("input[type=checkbox]:checked").length;
	return Math.round(100 - checked * (100 / total));
}

btn.addEventListener("click", () => {
	if (box.classList.contains("hidden")) {
		box.classList.remove("hidden"); // reveal on first press
	}
	scoreEl.textContent = calculateScore();
});

loadQuestions();

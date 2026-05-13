async function loadCandidates() {

  const res = await fetch("/api/candidates");
  const data = await res.json();

  const container =
    document.getElementById("candidates");

  data.forEach(c => {

    container.innerHTML += `
      <div class="card">
        <h3>${c.name}</h3>

        <button onclick="vote(${c.id})">
          Pilih
        </button>
      </div>
    `;
  });
}

async function vote(id) {

  const token =
    document.getElementById("token").value;

  const res = await fetch("/api/vote", {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      token,
      candidate:id
    })
  });

  const data = await res.json();

  alert(data.message);
}

loadCandidates();

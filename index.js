document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("user-form");
  let userEntries = retrieveEntries();

  function retrieveEntries() {
    let entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
  }

  function displayEntries() {
    const entries = retrieveEntries();
    const tableEntries = entries
      .map((entry) => {
        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const acceptTermsCell = `<td class="border px-4 py-2">${entry.acceptTerms}</td>`;
        return `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
      })
      .join("\n");

    const table = `
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Password</th>
              <th class="px-4 py-2">DOB</th>
              <th class="px-4 py-2">Accepted Terms?</th>
            </tr>
          </thead>
          <tbody>
            ${tableEntries}
          </tbody>
        </table>
      `;

    document.getElementById("user-entries").innerHTML = table;
  }

  function isValidAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 18 && age <= 55;
  }

  function saveUserForm(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    const dobWarning = document.getElementById("dob-warning");
    if (!isValidAge(dob)) {
      dobWarning.classList.remove("hidden");
      return;
    } else {
      dobWarning.classList.add("hidden");
    }

    const entry = { name, email, password, dob, acceptTerms };
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
    userForm.reset();
  }

  userForm.addEventListener("submit", saveUserForm);
  displayEntries();
});

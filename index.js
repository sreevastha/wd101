document.addEventListener("DOMContentLoaded", () => {
  let userform = document.getElementById("user-form");
  let userentries = [];

  const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
      entries = JSON.parse(entries);
    } else {
      entries = [];
    }
    return entries;
  };

  let userEntries = retrieveEntries();

  const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries
      .map((entry) => {
        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const acceptTermsCell = `<td class="border px-4 py-2">${entry.acceptTerms}</td>`;
        const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
        return row;
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

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
  };

  const isValidAge = (dob) => {
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
  };

  const saveUserForm = (event) => {
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

    const entry = {
      name,
      email,
      password,
      dob,
      acceptTerms,
    };
    userentries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userentries));
    displayEntries();
  };

  userform.addEventListener("submit", saveUserForm);
  displayEntries();
});

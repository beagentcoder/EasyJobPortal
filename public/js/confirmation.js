function deleteJobFunc(id) {
  const result = confirm("Are you sure");
  if (result) {
    fetch("/delete/" + id, {
      method: "POST",
    }).then((res) => {
      if (res.status === 403) {
        handleUnauthorizedAccess();
      }
    });
  }
}

function updateJobFunc(id) {
  fetch("/job/update/" + id, {
    method: "GET",
  }).then((res) => {
    if (res.status === 403) {
      handleUnauthorizedAccess();
    }
  });
}
function handleUnauthorizedAccess() {
  var unauthorizedModal = new bootstrap.Modal(
    document.getElementById("unauthorizedModal")
  );
  unauthorizedModal.show();
}

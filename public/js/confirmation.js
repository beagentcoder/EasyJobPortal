function deleteJobFunc(id) {
    const result = confirm("Are you sure?");
    if (result) {
      fetch("/delete/" + id, {
        method: "POST",
      })
        .then((res) => {
          if (res.status === 403) {
            handleUnauthorizedAccess();
          } else if (res.status === 200) {
            window.location.href = "/jobs";
          } else {
            console.error("Unexpected response status:", res.status);
          }
        })
        .catch((error) => {
          console.error("Error during fetch operation:", error);
        });
    }
  }

  function checkAuthorization(id) {
      
    fetch(`/check-auth/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.authorized) {
        window.location.href = `/job/update/${id}`;
      } else {
        var myModal = new bootstrap.Modal(document.getElementById('unauthorizedModal'));
        myModal.show();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

function handleUnauthorizedAccess() {
    var unauthorizedModal = new bootstrap.Modal(
      document.getElementById("unauthorizedModal")
    );
    unauthorizedModal.show();
  }
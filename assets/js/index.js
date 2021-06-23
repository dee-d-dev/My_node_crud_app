// const { eventNames } = require("process")

$("#add_user").submit(function (event) {
  alert("user added");
});

$("#update_user").submit(function (event) {
  event.preventDefault();

  let form_info = $("#update_user").serializeArray();
  console.log(form_info);
  let data = {};
  $.map(form_info, (n, i) => {
    data[n["name"]] = n["value"];
  });

  let request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done((res) => {
    alert("Data updated successfully");
  });
});

//delete
if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("do yo really want to delete this record")) {
      $.ajax(request).done(() => {
        alert("Data deleted successfully");
        location.reload();
      });
    }
  });
}

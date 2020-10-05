// POST form data to pipedream on submit
$("#contact-form").submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: "https://4c63265ef6c7304d0a996b34da610160.m.pipedream.net",
      type: "post",
      data: $("#contact-form").serialize(),
      success: function() {
        // Redirect to another success page
        window.location = "https://google.com";
      }
    });
  });
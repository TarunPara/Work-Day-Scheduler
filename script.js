  // Set locale settings for dayjs.
  var localeSettings = {};
  dayjs.locale(localeSettings);

  // Execute when the document is ready.
  $(function () {
    // Get the current hour using dayjs.
    var currentHour = dayjs().format('H');
    
    // Change color of time blocks based on the current time.
    function hourlyColor() {
      $('.time-block').each(function() {
        var blockHour = parseInt(this.id);
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }

    // Save textarea input to localStorage on save button click.
    function textEntry() {
      $('.saveBtn').on('click', function() {
        var key = $(this).parent().attr('id');
        var value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }
    
    // Update color of time blocks to show past, present, or future.
    function refreshColor() {
      $('.time-block').each(function() {
        var blockHour = parseInt(this.id);
        if (blockHour == currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }

    // Load saved data from localStorage into textareas.
    $('.time-block').each(function() {
      var key = $(this).attr('id');
      var value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
  
    // Update the current date and time display in the header.
    function updateTime() {
      var dateElement = $('#date');
      var timeElement = $('#time');
      var currentDate = dayjs().format('dddd, MMMM D, YYYY');
      var currentTime = dayjs().format('hh:mm:ss A');
      dateElement.text(currentDate);
      timeElement.text(currentTime);
    }

    // Run the initial setup functions.
    hourlyColor();
    textEntry();
    refreshColor();

    // Keep the time updated every second.
    setInterval(updateTime, 1000);
  });

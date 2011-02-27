(function($){
  
  var Precis = {};
  
  Precis.addControls = function(section) {
    section = $(section);
    
    var tagName = section[0].tagName.toLowerCase();
    
    if ( tagName === 'section' ) {
      section.data({
        title : $('h2', section).html(),
        text : $('p', section).html()
      });
    } else if ( tagName === 'header' ) {
      section.data({
        title : $('h1', section).html()
      });
    } else if ( tagName === 'footer' ) {
      section.data({
        text : $('footer', section).html()
      });
    } else {
      return; // can only edit sections, header or footer
    }
    
    section.data('panel', $('<div>'));
        
    var publishButton = $('<span>Publish</span>').click(function(e){
      e.stopPropagation();
      Precis.publish(section);
    });
    var cancelButton = $('<span>Cancel</span>').click(function(e){
      e.stopPropagation();
      Precis.cancel(section);
    });
    var deleteButton = $('<span>Delete</span>').click(function(e){
      e.stopPropagation();
      if (confirm('Are you sure, moron?')) {
        Precis.ditch(section);
      }
    });
    section.data('panel')
      .append(publishButton)
      .append(cancelButton);
    
    if ( tagName === 'section' ) {
      section.data('panel').append(deleteButton); 
    }

    section.append(section.data('panel'));
    section.data('hasControls',true);
  };
  
  Precis.removeControls = function(section) {
    section.data('panel').remove();
    section.data('hasControls',false);
    $('h1, h2, p', section).removeAttr('contenteditable');
  };
  
  Precis.publish = function (section) {
    if (section) {
      Precis.removeControls(section);
    }
    var header = $('header').html();
    var content = (function(){
      var output = '';
      $('#content section').each(function(){
        output += '<section>';
        output += '<h2>' + $('h2', this).html() + '</h2>';
        output += '<p>' + $('p', this).html() + '</p>';
        output += '</section>';
      });
      return output;
    }());
    var footer = $('footer').html();
    
    $.ajax({
      url: '/website',
      type: 'PUT',
      data: {
        website : {
          header : header,
          content : content,
          footer : footer
        }
      }
    });
  };

  Precis.cancel = function (section) {
    Precis.removeControls(section);
    $('h1, h2', section).html(section.data('title'));
    $('p', section).html(section.data('text'));
  };
  
  Precis.ditch = function (section) {
    Precis.removeControls(section);
    section.remove();
    Precis.publish();
  };
  
  Precis.editable = function(section) {
    section = $(section);
    section.click(function(e) {
      $('h1, h2, p', this).attr('contenteditable','true');
      if (!(section.data('hasControls'))) {
        Precis.addControls(section);
      }
    });
  };
  
  Precis.Section = function(content) {
    
    content = content || {};
    content = {
      attrs : content.attrs || '',
      title : content.title || 'Section Title',
      text : content.text || 'Click to edit the content of your new section.'
    };
    
    var html = '<section {attrs}><h2>{title}</h2><p>{text}</p></section>';
    html = html.replace('{attrs}', content.attrs);
    html = html.replace('{title}', content.title);
    html = html.replace('{text}', content.text);
    
    var elem = $(html);
    
    Precis.editable(elem);
    
    return elem;
    
  };
  
  Precis.OpeningHours = function() {
    return Precis.Section({
      title : 'Opening Hours',
      text : 'Monday - Saturday,<br> noon to midnight.'
    });
  };

  Precis.Address = function() {
    return Precis.Section({
      title : 'Address',
      text : '123 Main Street, King City'
    });
  };

  Precis.Reservations = function() {
    return Precis.Section({
      title : 'Reservations',
      text : '+49 30 98765432<br>reservations@example.com'
    });
  };

  Precis.Rearrange = (function() {
    var on = false;
    return function() {
      console.log('turn on draggable');
      if (on) {
        $('#content').sortable({
          placeholder: "ui-state-highlight"
        }); // disable
        on = false;
      } else {
        $('#content').sortable({
          placeholder: "ui-state-highlight",
          stop: function(e) {
            e.stopPropagation();
          }
        }); // enable
        on = true;
      }
    };
  }());

  //Precis.Rearrange = function() {
  //  
  //};
  
  var menuHTML  = '';
      menuHTML += ' <div id="precis">';
      menuHTML += '   <h1>Add</h1>';
      menuHTML += '   <ul>';
      menuHTML += '     <li><span class="control" id="Section">Section</span></li>';
      menuHTML += '     <li><span class="control" id="Address">Address</span></li>';
      menuHTML += '     <li><span class="control" id="OpeningHours">Hours</span></li>';
      menuHTML += '     <li><span class="control" id="Reservations">Reservations</span></li>';
      menuHTML += '   </ul>';
      menuHTML += '   <h1>Other</h1>';
      menuHTML += '   <ul>';
      menuHTML += '     <li><span class="control" id="Rearrange">Arrange Sections</span></li>';
      menuHTML += '     <li><span class="control">Edit Description</span></li>';
      menuHTML += '   </ul>';
      menuHTML += '   <h1>Manage Account</h1>';
      menuHTML += '   <ul>';
      menuHTML += '     <li><span class="control">Change Email Address</span></li>';
      menuHTML += '     <li><span class="control">Change Password</span></li>';
      menuHTML += '   </ul>';
      menuHTML += ' </div>';
  
  $('body').prepend(menuHTML);
  
  $('#precis span.control').click(function(e){
    var type = $(e.target).attr('id');
    console.log(type);
    if ( Precis[type] && typeof Precis[type] === 'function' ) {
      $('#content').append(Precis[type]());
    }
  });
  
  $('#content section, header').each(function(){
    Precis.editable(this);
  });
  
}(jQuery));
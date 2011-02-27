(function($){
  
  var Precis = {};
  
  Precis.addControls = function(section) {
    section = $(section);
    section.data('panel', $('<div>'));
    section.data( {
      title : $('h2', section).html(),
      text : $('p', section).html()
    });
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
    section.data('panel').append(publishButton);
    section.data('panel').append(cancelButton);
    section.data('panel').append(deleteButton);
    section.append(section.data('panel'));
    section.data('hasControls',true);
  };
  
  Precis.removeControls = function(section) {
    section.data('panel').remove();
    section.data('hasControls',false);
  };
  
  Precis.publish = function (section) {
    Precis.removeControls(section);
  };

  Precis.cancel = function (section) {
    Precis.removeControls(section);
    $('h2', section).html(section.data('title'));
    $('p', section).html(section.data('text'));
  };
  
  Precis.ditch = function (section) {
    section.remove();
  };
  
  Precis.editable = function(section) {
    section = $(section);
    section.click(function(e) {
      $('h2, p', this).attr('contenteditable','true');
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
  
  $('#precis span.control').click(function(e){
    var type = $(e.target).attr('id');
    $('#main').append(Precis[type]());
  });
  
  $('#main section').each(function(){
    Precis.editable(this);
  });
  
}(jQuery));
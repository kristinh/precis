class WebsitesController < ApplicationController
  before_filter :authenticate_user!, :find_website

  def favicon
    send_file(
      File.join(Rails.root, 'app', 'views', 'templates', 'prototype', 'favicon.ico'),
      :type => 'image/x-icon',
    )
  end

  def stylesheet
    send_file(
      File.join(Rails.root, 'app', 'views', 'templates', 'prototype', 'stylesheet.css'),
      :type => 'text/css',
    )
  end

  def javascript
    send_file(
      File.join(Rails.root, 'app', 'views', 'templates', 'prototype', 'javascript.js'),
      :type => 'text/javascript',
    )
  end

  def edit
    render :template => 'templates/prototype/structure', :layout =>  false,
  end

  def update
    if @website.update_attributes(params[:website])
      flash[:notice] = 'Updated the website'
      redirect_to edit_website_path
    else
      flash[:error] = 'Error updating'
      render :action => :edit
    end
  end

  private

  def find_website
    @website = current_user.website
  end
end

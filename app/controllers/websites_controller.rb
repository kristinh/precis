class WebsitesController < ApplicationController
  before_filter :authenticate_user!, :find_website

  def favicon
    send_file @website.favicon_file, :type => 'image/x-icon'
  end

  def stylesheet
    send_file @website.stylesheet_file, :type => 'text/css'
  end

  def javascript
    send_file @website.javascript_file, :type => 'text/javascript'
  end

  def edit
    render :template => 'templates/prototype/structure', :layout =>  false
  end

  def update
    if @website.update_attributes(params[:website])
      if !request.xhr?
        flash[:notice] = 'Updated the website'
        redirect_to edit_website_path
      else
        head :ok
      end
    else
      if !request.xhr?
        flash[:error] = 'Error updating'
        render :action => :edit
      else
        head :unprocessable_entity
      end
    end
  end

  private

  def find_website
    @website = current_user.website
  end
end

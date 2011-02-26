class WebsitesController < ApplicationController
  before_filter :authenticate_user!, :find_website

  def edit
    # only renders the template
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
